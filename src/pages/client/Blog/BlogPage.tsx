import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Banner from '../../../layouts/client/Components/Banner/Banner';
import Sidebar from '../../../layouts/client/Components/Sidebar/Sidebar';
import { Row, Col, Card, Modal, Input, Upload, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { FaHeart, FaShareAlt, FaComment } from 'react-icons/fa';
import { PlusOutlined } from '@ant-design/icons';

const BlogPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('https://localhost:44329/api/Blog/GetAllBlogs?pageIndex=0&pageSize=10');
                if (response.data.success) {
                    const blogsWithAuthors = await Promise.all(response.data.data.items.map(async (blog) => {
                        try {
                            const userResponse = await axios.get(`https://localhost:44329/api/Account/GetUserProfile?userId=${blog.createBy}`, {
                                headers: {
                                    'accept': '*/*',
                                    'authorization': `Bearer ${accessToken}`
                                }
                            });
                            if (userResponse.data.success) {
                                return {
                                    ...blog,
                                    authorName: userResponse.data.data.userName,
                                    authorAvatar: userResponse.data.data.avatar
                                };
                            }
                            return blog;
                        } catch (error) {
                            console.error('Error fetching user profile:', error);
                            return blog;
                        }
                    }));
                    setBlogs(blogsWithAuthors);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching blog data:', error);
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const handleImageUpload = async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        try {
            const response = await axios.post('https://localhost:44329/api/Firebase/UploadWebImage', formData);
            if (response.status === 200 && response.data && response.data.imageUrl) {
                return response.data.imageUrl;
            } else {
                throw new Error('Invalid response from server');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            message.error('Image upload failed!');
            throw error;
        }
    };

    const handleSave = async () => {
        try {
            const imageUrl = await handleImageUpload(image);
            const createBlogResponse = await axios.post('https://localhost:44329/api/Blog/CreateBlog', {
                title,
                content,
                img: imageUrl
            }, {
                headers: {
                    'accept': '*/*',
                    'authorization': `Bearer ${accessToken}`
                }
            });
            if (createBlogResponse.data.success) {
                setBlogs([...blogs, createBlogResponse.data.data]);
                setIsModalVisible(false);
                message.success('Blog created successfully!');
            } else {
                console.error('Error creating blog:', createBlogResponse.data.message);
                message.error('Blog creation failed!');
            }
        } catch (error) {
            console.error('Error saving blog:', error);
            message.error('Blog creation failed!');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Banner />
            <div className="flex flex-1">
                <Sidebar />
                <section className="container mx-auto m-4" style={{ marginTop: '10px' }}>
                    
                    <Row gutter={[16, 16]}>
                        {blogs.map((blog) => (
                            <Col key={blog.id} xs={24} sm={12} md={8} lg={6}>
                                <Link to={`/blog-detail/${blog.id}`}>
                                    <Card
                                        hoverable
                                        cover={
                                            <img
                                                alt={blog.title}
                                                src={blog.blogImg || 'default-image-url'} // Add a default image URL if blogImg is null
                                                className='p-4'
                                                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '23px' }}
                                            />
                                        }
                                    >
                                        <div style={{ display: 'flex' }}>
                                            <FaHeart style={{ marginRight: '10px' }} />
                                            <FaShareAlt style={{ marginRight: '10px', justifyContent: 'center' }} />
                                            <FaComment />
                                        </div>
                                        <Card.Meta
                                            title={<h1 className="hover:text-green-800">{blog.title}</h1>}
                                            description={
                                                <div>
                                                    <div className="flex items-center" style={{ display: 'flex', alignItems: 'center' }}>
                                                        <img
                                                            src={blog.authorAvatar || 'default-image-url'} // Use the author's avatar
                                                            alt="Author"
                                                            style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                                                        />
                                                        <div className="font-medium dark:text-black">
                                                            <span style={{ marginLeft: '10px', display: 'block', fontSize: '13px' }} className="text-sm text-gray-500 dark:text-black-400">{blog.authorName}</span>
                                                            <span style={{ marginLeft: '10px', display: 'block', fontSize: '10px' }} className="text-sm text-gray-500 dark:text-gray-400">{new Date(blog.createAt).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        />
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </section>
                <Modal
                    title="Tạo blog"
                    open={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={[
                        <Button key="back" onClick={() => setIsModalVisible(false)}>
                            Cancel
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleSave}>
                            Save
                        </Button>,
                    ]}
                >
                    <Input
                        placeholder="Nhập tiêu đề"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ marginBottom: '10px' }}
                    />
                    <Input.TextArea
                        placeholder="Nhập nội dung blog"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={4}
                        style={{ marginBottom: '10px' }}
                    />
                    <Upload
                        beforeUpload={(file) => {
                            setImage(file);
                            return false; // Prevent automatic upload
                        }}
                        multiple={false}
                        showUploadList={false}
                    >
                        <Button icon={<PlusOutlined />}>Chọn ảnh</Button>
                    </Upload>
                </Modal>
            </div>
        </div>
    );
};

export default BlogPage;