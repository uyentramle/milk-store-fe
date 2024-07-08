
import Banner from '../../../layouts/client/Components/Banner/Banner';
import Sidebar from '../../../layouts/client/Components/Sidebar/Sidebar';
import { Typography, Row, Col, Card } from 'antd';
import { FaComment, FaHeart, FaShareAlt } from 'react-icons/fa';
const { Title, Paragraph } = Typography;

const BlogPageDetail = () => {
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
              <Title level={2}>Những điều cần biết về sữa</Title>
              <Title className="text-sky-400/0" style={{ fontSize: '10px' }} level={5}>Đăng ngày: 10/9</Title>

            </div>

            <div style={{ marginTop: '20px', marginBottom: '20px' }} className="basis-5/7 ml-4">
              <div className="flex items-left gap-4">
                <img className="w-10 h-10 rounded-full"
                  src="https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg" alt="" />
                <div className="font-medium dark:text-black">
                  <div>Mèo cam</div>

                </div>
              </div>
            </div >
            <Card>
              <img
                alt="example"
                src="https://media.post.rvohealth.io/wp-content/uploads/2023/09/3154668-Clone-Market-Sep-T4-8-Of-The-Best-Baby-Formulas-1296x728-Header-e0edef.jpg"
                style={{ width: '100%', height: 'auto' }}
              />

            </Card>
            <Paragraph style={{ marginTop: '10px' }}>
              This is the detail view of your blog post. Here you can display the full content of your blog post.
              Add images, text, and other elements as needed to fully express your ideas.
            </Paragraph>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
              <FaHeart />
              <span style={{ marginLeft: '5px' }}>123</span> {/* Likes count */}
            </div>
            <div style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }}>
              <FaShareAlt />
              <span style={{ marginLeft: '5px' }}>456</span> {/* Shares count */}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaComment />
              <span style={{ marginLeft: '5px' }}>789</span> {/* Comments count */}
            </div>
            </div>
            <Title style={{marginTop: '20px'}} level={4}>Bình luận</Title>
            <Card style={{ marginTop: '10px' }}>
              <div className="comment">
                <div className="avatar"></div>
                <div className="comment-text">
                  <p className="username">Tên người dùng</p>
                  <p>Nội dung bình luận</p>
                </div>
              </div>

              <div className="comment">
                <div className="avatar"></div>
                <div className="comment-text">
                  <p className="username">Tên người dùng</p>
                  <p>Nội dung bình luận</p>
                </div>
              </div>
            </Card>
            {/* Add more content here as needed */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BlogPageDetail;