import React from 'react';
import Banner from '../../../layouts/client/Components/Banner/Banner';
import Sidebar from '../../../layouts/client/Components/Sidebar/Sidebar';
import { Typography, Row, Col, Card } from 'antd';
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
            <Title level={2}>Blog Title Here</Title>
            <Paragraph>
              This is the detail view of your blog post. Here you can display the full content of your blog post.
              Add images, text, and other elements as needed to fully express your ideas.
            </Paragraph>
            {/* Add more content here as needed */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BlogPageDetail;