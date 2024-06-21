import React from 'react';
import Banner from '../../../layouts/client/Components/Banner/Banner';
import Sidebar from '../../../layouts/client/Components/Sidebar/Sidebar';
import { Input, Typography, Row, Col, Card, Button, } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, } from '@ant-design/icons';
const { Title, Paragraph } = Typography;

const ProductDetail = () => {
  return (
    <div>
    <Banner />
    <Row gutter={16}>
      <Col span={6}>
        <Sidebar />
      </Col>
      <Col span={18}>
        <Card  className="flex flex-row">
        <div className="w-24 mb-5">
          <img
            alt="example"
            src="https://cdn1.concung.com/2022/05/57282-88158-large_mobile/vinamilk-optimum-gold-2-800g.png"/>
          </div>
          <div className="basis-1/4">
            <Title level={2}>Product Name</Title>
            <Paragraph>
              This is the product description. Here you can add more details about the product.
            </Paragraph>
            <Paragraph strong>Price: $99.99</Paragraph>
            <Input
              addonBefore={<SearchOutlined />}
              defaultValue="1"
              type="number"
              min="1"
              className="w-24 mb-5"
            />
            <Button  type="primary" icon={<ShoppingCartOutlined />}>
              Add to Cart
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  </div>
  );
};

export default ProductDetail;