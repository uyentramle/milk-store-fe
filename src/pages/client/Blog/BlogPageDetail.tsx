import axios from 'axios';
import { useParams } from 'react-router-dom';
import Banner from '../../../layouts/client/Components/Banner/Banner';
import Sidebar from '../../../layouts/client/Components/Sidebar/Sidebar';
import { Typography, Row, Col, Card, Input, Button } from 'antd';
import { FaComment, FaHeart, FaShareAlt } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode'; // Ensure jwtDecode is correctly imported
import React, { useState, useEffect } from 'react';

const { Title, Paragraph } = Typography;

const BlogPageDetail = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [author, setAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState('');
  const [likesCount, setLikesCount] = useState(0); // State to hold likes count
  const [isLiked, setIsLiked] = useState(false); // State to track if user liked the post

  const accessToken = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.userId;

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        // Fetch blog details
        const blogResponse = await axios.get(`https://localhost:44329/api/Blog/GetBlogByBlogId?blogId=${blogId}`);
        if (blogResponse.data.success) {
          setBlog(blogResponse.data.data);

          // Fetch author details
          const userResponse = await axios.get(`https://localhost:44329/api/Account/GetUserProfile?userId=${blogResponse.data.data.createBy}`, {
            headers: {
              'accept': '*/*',
              'authorization': `Bearer ${accessToken}`
            }
          });
          if (userResponse.data.success) {
            const { avatar, userName } = userResponse.data.data;
            setAuthor({ avatar, userName });
          }

          // Fetch comments
          const commentsResponse = await axios.get(`https://localhost:44329/api/CommentBlog/GetLCommentyBlogId?blogId=${blogId}&pageIndex=0&pageSize=10`);
          if (commentsResponse.data.success) {
            const commentsWithUserInfo = await Promise.all(commentsResponse.data.data.items.map(async (comment) => {
              const userResponse = await axios.get(`https://localhost:44329/api/Account/GetUserProfile?userId=${comment.accountId}`, {
                headers: {
                  'accept': '*/*',
                  'authorization': `Bearer ${accessToken}`
                }
              });
              if (userResponse.data.success) {
                return {
                  ...comment,
                  userName: userResponse.data.data.userName,
                  avatar: userResponse.data.data.avatar
                };
              } else {
                return {
                  ...comment,
                  userName: 'Unknown',
                  avatar: 'default-avatar-url'
                };
              }
            }));
            setComments(commentsWithUserInfo);
          } else {
            console.error('Error fetching comments:', commentsResponse.data.message);
          }

          // Fetch likes count and check if user liked the post
          const likesResponse = await axios.get(`https://localhost:44329/api/LikeBlog/GetLikeByBlogId?blogId=${blogId}&pageIndex=0&pageSize=10`);
          if (likesResponse.data.success) {
            const likes = likesResponse.data.data.items.filter(item => item.isLike);
            setLikesCount(likes.length);
            const userLiked = likesResponse.data.data.items.some(item => item.accountId === userId && item.isLike);
            setIsLiked(userLiked);
          } else {
            console.error('Error fetching likes:', likesResponse.data.message);
          }
        } else {
          console.error('Error fetching blog details:', blogResponse.data.message);
        }
      } catch (error) {
        console.error('Error fetching blog details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [blogId, accessToken]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    try {
      const createCommentResponse = await axios.post(
        'https://localhost:44329/api/CommentBlog/CreateComment',
        {
          commentText: newComment,
          active: true,
        },
        {
          params: {
            userId: userId,
            blogId: blogId
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      console.log('Comment created:', createCommentResponse.data);
      window.location.reload();
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const handleLikeClick = async () => {
    try {
      if (!isLiked) {
        // If not liked, send like request
        await createLike(true)
        // Pass true to indicate liking
      } else {
        // If already liked, send unlike request
        await createLike(false)
         // Pass false to indicate unliking
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };
  
  const createLike = async (isLike) => {
    try {
      const likeResponse = await axios.post(
        'https://localhost:44329/api/LikeBlog/CreateLike',
        {
          isLike: isLike,
          likeAt: new Date().toISOString()
        },
        {
          params: {
            userId: userId,
            blogId: blogId
          },
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      if (likeResponse.data.success) {
        setIsLiked(isLike);
        setLikesCount(isLike ? likesCount + 1 : likesCount - 1);
      // Reload the page to reflect updated like status
      } else {
        console.error('Error liking/unliking the blog:', likeResponse.data.message);
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Banner />
      <Row gutter={16} style={{ padding: '20px' }}>
        <Col span={6}>
          <Sidebar />
        </Col>
        <Col span={18}>
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Title level={2}>{blog?.title}</Title>
              <Title className="text-sky-400/0" style={{ fontSize: '10px' }} level={5}>
                Đăng ngày: {new Date(blog?.createAt).toLocaleDateString()}
              </Title>
            </div>

            <div style={{ marginTop: '20px', marginBottom: '20px' }} className="basis-5/7 ml-4">
              <div className="flex items-left gap-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={author.avatar || 'default-avatar-url'}
                  alt=""
                />
                <div className="font-medium dark:text-black">
                  <div>{author.userName}</div>
                </div>
              </div>
            </div>

            <Card>
              <img
                alt="example"
                src={blog?.blogImg || 'default-image-url'}
                style={{ width: '100%', height: 'auto' }}
              />
            </Card>

            <Paragraph style={{ marginTop: '10px' }}>
              {blog?.content}
            </Paragraph>

            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div
                style={{ marginRight: '20px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                onClick={handleLikeClick}
              >
                <FaHeart color={isLiked ? 'red' : 'gray'} />
                <span style={{ marginLeft: '5px' }}>{likesCount}</span> {/* Likes count */}
              </div>
              <div style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
                <FaShareAlt />
                <span style={{ marginLeft: '5px' }}>456</span> {/* Shares count */}
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FaComment />
                <span style={{ marginLeft: '5px' }}>{comments.length}</span> {/* Comments count */}
              </div>
            </div>

            <Title style={{ marginTop: '20px' }} level={4}>Bình luận</Title>
            <Card style={{ marginTop: '10px' }}>
              {comments.length > 0 ? comments.map((comment, index) => (
                <div key={index} className="comment">
                  <div className="avatar">
                    <img src={comment.avatar || 'default-avatar-url'} className="w-13 h-13 rounded-full" alt="Avatar" />
                  </div>
                  <div className="comment-text">
                    <p className="username">{comment.userName}</p>
                    <p>{comment.commentText}</p>
                  </div>
                </div>
              )) : <p>No comments available.</p>}
            </Card>

            <div style={{ marginTop: '20px' }}>
              <Title level={4}>Thêm bình luận mới</Title>
              <form onSubmit={handleSubmitComment}>
                <Input.TextArea
                  value={newComment}
                  onChange={handleCommentChange}
                  rows={4}
                  placeholder="Nhập bình luận của bạn..."
                />
                <Button type="primary" htmlType="submit" style={{ marginTop: '10px' }}>
                  Gửi
                </Button>
              </form>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BlogPageDetail;
