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
    <Card className="flex flex-row" style={{marginTop: '10px'}}>
      <div style={{ display: 'flex', alignItems: 'start' }}>
        <div className="w-24 mb-5">
          

          <img
            alt="example"
            src="https://cdn1.concung.com/2022/05/57282-88158-large_mobile/vinamilk-optimum-gold-2-800g.png"
            style={{ maxWidth: '200%', height: 'auto' }} />
          
        </div>
        <Card style={{marginLeft: '120px'}}>
        <div className="basis-5/7 ml-4">
        <Title level={4} style={{fontSize: '20px'}}>Thương hiệu: Apple </Title>
        <Title level={5} style={{fontSize: '10px'}}>Loại sản phẩm: Sữa công thức</Title>
          <Title level={1}>Tên sản phẩm</Title>
          <Paragraph>
            'Mô tả sản phẩm'.
          </Paragraph>
          <Card>
          <Paragraph className="object-cover line-through" style={{fontSize:'20px'}}>Giá: 200.000d</Paragraph>
          
          <Paragraph className="object-cover text-rose-600 font-semibold" style={{fontSize:'20px'}}>Mua ngay với: 150.000d</Paragraph>
          <Paragraph className="object-cover text-rose-300	font-semibold" style={{fontSize:'10px'}}>còn 19 ngày 20 giờ</Paragraph>
          
          </Card>
          <div className="mt-4">
            <Input
              addonBefore={<SearchOutlined />}
              defaultValue="1"
              type="number"
              min="1"
              style={{ width: '100px' }}
            />
            <div style={{display:'flex'}}>
            <Button style={{marginTop:'10px'}} type="primary" icon={<ShoppingCartOutlined />}>
              Thêm vào giỏ hàng
            </Button>
            <Button style={{marginTop:'10px', marginLeft:'10px'}} type="primary" icon={<ShoppingCartOutlined />}>
              Mua ngay
            </Button>
           
            </div>
          </div>
        </div>
        </Card>
        <Card style={{marginLeft: '50px'}}>
          <Title level={3}>Thông tin chi tiết sản phẩm</Title>
          <table className="table-auto">
 
  <tbody>
    <tr>
      <td>Tên</td>
      <td>Sữa 1</td>
    </tr>
    <tr>
      <td>Xuất xứ:</td>
      <td>Việt Nam</td>
    </tr>
    <tr>
      <td>Đơn vị sản xuất:</td>
      <td>Vinamilk</td>
    </tr>
    <tr>
      <td>Tuổi của bé:</td>
      <td>1-4</td>
    </tr>
  </tbody>
</table>
          </Card>
      </div>
    </Card>
  </Col>
</Row>
  </div>
  );
};

export default ProductDetail;