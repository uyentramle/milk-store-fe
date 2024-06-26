import React from 'react';
import Banner from '../../../layouts/client/Components/Banner/Banner';
import Sidebar from '../../../layouts/client/Components/Sidebar/Sidebar';
import { Input, Typography, Row, Col, Card, Button, Popover, } from 'antd';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SearchOutlined, ShoppingCartOutlined, } from '@ant-design/icons';
import './ProductDetail.css';
import Slider from 'react-slick';

import { Flex, Rate } from 'antd';
const { Title, Paragraph } = Typography;


const ProductDetail = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Hiển thị 3 sản phẩm cùng một lúc
    slidesToScroll: 4, // Di chuyển 1 sản phẩm mỗi lần
  };
  const products = [
    {
      id: 1,
      image: "https://cdn1.concung.com/2022/05/57282-88158-large_mobile/vinamilk-optimum-gold-2-800g.png",
      name: "1 Vinamilk Optimum Gold 2, 800g (6 - 12 tháng)",
      price: "365.000₫",
    },
    {
      id: 2,
      image: "https://cdn1.concung.com/2022/05/57286-88164-large_mobile/vinamilk-optimum-gold-3-850g-1-2-tuoi.png",
      name: "2 Vinamilk Optimum Gold 3, 850g, 1-2 tuổi",
      price: "369.000₫",
    },
    {
      id: 3,
      image: "https://cdn1.concung.com/2024/04/44603-1714120962-trans.png",
      name: "3 Sữa Vinamilk Yoko Gold 1 850g (0-1 tuổi)",
      price: "449.000₫",
    },
    {
      id: 4,
      image: "https://cdn1.concung.com/2022/05/57283-88154-large_mobile/vinamilk-optimum-gold-1-800g.png",
      name: "4 Vinamilk Optimum Gold 1, 800g (0 - 6 tháng)",
      price: "395.000₫",
    },
    {
      id: 5,
      image: "https://cdn1.concung.com/2022/03/44602-84158-large_mobile/vinamilk-yoko-gold-2-1-2-tuoi-850g.png",
      name: "5 Sữa Vinamilk Yoko Gold 2 850g (1-2 tuổi)",
      price: "435.000₫",
    },
    {
      id: 6,
      image: "https://cdn1.concung.com/2022/05/57282-88158-large_mobile/vinamilk-optimum-gold-2-800g.png",
      name: "6 Vinamilk Optimum Gold 2, 800g (6 - 12 tháng)",
      price: "365.000₫",
    },
    {
      id: 7,
      image: "https://cdn1.concung.com/2022/05/57286-88164-large_mobile/vinamilk-optimum-gold-3-850g-1-2-tuoi.png",
      name: "7 Vinamilk Optimum Gold 3, 850g, 1-2 tuổi",
      price: "369.000₫",
    },
    {
      id: 8,
      image: "https://cdn1.concung.com/2024/04/44603-1714120962-trans.png",
      name: "8Sữa Vinamilk Yoko Gold 1 850g (0-1 tuổi)",
      price: "449.000₫",
    },
    {
      id: 9,
      image: "https://cdn1.concung.com/2022/03/44602-84158-large_mobile/vinamilk-yoko-gold-2-1-2-tuoi-850g.png",
      name: "5 Sữa Vinamilk Yoko Gold 2 850g (1-2 tuổi)",
      price: "435.000₫",
    },
    {
      id: 10,
      image: "https://cdn1.concung.com/2022/05/57282-88158-large_mobile/vinamilk-optimum-gold-2-800g.png",
      name: "6 Vinamilk Optimum Gold 2, 800g (6 - 12 tháng)",
      price: "365.000₫",
    },
    {
      id: 11,
      image: "https://cdn1.concung.com/2022/05/57286-88164-large_mobile/vinamilk-optimum-gold-3-850g-1-2-tuoi.png",
      name: "11 Vinamilk Optimum Gold 3, 850g, 1-2 tuổi",
      price: "369.000₫",
    },
    {
      id: 12,
      image: "https://cdn1.concung.com/2024/04/44603-1714120962-trans.png",
      name: "12 Sữa Vinamilk Yoko Gold 1 850g (0-1 tuổi)",
      price: "449.000₫",
    },

  ];
  const [currentValue, defaultValue] = useState(2)
  return (

    <div>
      <Banner />
      <Row gutter={16}>
        <Col span={6}>
          <Sidebar />
        </Col>
        <Col span={18}>
          <Card className="flex flex-row" style={{ marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'start' }}>
              <div className="w-24 mb-5">


                <img
                  alt="example"
                  src="https://cdn1.concung.com/2022/05/57282-88158-large_mobile/vinamilk-optimum-gold-2-800g.png"
                  style={{ maxWidth: '200%', height: 'auto' }} />

              </div>
              <Card hoverable type="inner" style={{ marginLeft: '120px' }}>
                <div className="basis-5/7 ml-4">
                  <Title level={3} style={{ fontSize: '20px' }}>Thương hiệu: TH </Title>

                  <Title level={4} style={{ fontSize: '10px' }}>Loại sản phẩm: Sữa công thức</Title>

                  <div style={{ display: 'flex' }}>
                    <h4>Đánh giá: </h4>
                    <Rate onChange={(value) => {
                      defaultValue(value)
                    }} value={currentValue} /> <br />

                  </div>



                  <Title level={1}>Tên sản phẩm</Title>
                  <Paragraph>
                    'Mô tả sản phẩm'.
                  </Paragraph>
                  <Card>
                    <Paragraph className="object-cover line-through" style={{ fontSize: '20px' }}>Giá: 200.000d</Paragraph>

                    <Paragraph className="object-cover text-rose-600 font-semibold" style={{ fontSize: '20px' }}>Mua ngay với: 150.000d</Paragraph>
                    <Paragraph className="object-cover text-rose-300	font-semibold" style={{ fontSize: '10px' }}>còn 19 ngày 20 giờ</Paragraph>

                  </Card>
                  <div className="mt-4">
                    <Input
                      addonBefore={<SearchOutlined />}
                      defaultValue="1"
                      type="number"
                      min="1"
                      style={{ width: '100px' }}
                    />
                    <div style={{ display: 'flex' }}>
                      <Button style={{ marginTop: '10px' }} type="primary" icon={<ShoppingCartOutlined />}>
                        Thêm vào giỏ hàng
                      </Button>
                      <Button style={{ marginTop: '10px', marginLeft: '10px' }} type="primary" icon={<ShoppingCartOutlined />}>
                        Mua ngay
                      </Button>

                    </div>
                  </div>
                </div>
              </Card>
              <div style={{ display: 'block' }} >
                <Card style={{ marginLeft: '10px' }} cover={<div style={{ overflow: "hidden", height: "100px" }}>
                  <img
                    alt="example"
                    style={{ height: "fit" }}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk8fFLTRZVbZdcVd87wwkINBEfJhfVZEdOuw&s"
                  />
                </div>}>
                  <div className="basis-5/7 ml-4">
                    <div className="flex items-left gap-4">
                      <img className="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk8fFLTRZVbZdcVd87wwkINBEfJhfVZEdOuw&sttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG02ZvQT0Wk3y8ve9h_zt2ZGGQ4p4eDdHQ0w&s" alt="" />
                      <div className="font-medium dark:text-black">
                        <div>TH True Milk</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Xem cửa hàng</div>
                      </div>
                    </div>
                  </div >
                </Card>

              </div>

            </div>
          </Card>
          <Card style={{ marginTop: '10px' }}>
            <Title level={3}>Các sản phẩm khác</Title>
            <Paragraph>
              <section className="bg relative">
                <div className="mx-auto">
                  <div className="flex flex-wrap">
                    <div className="w-full">
                      <Slider {...settings}>
                        {products.map((product) => (
                          <div key={product.id} className="product-slide">
                            <Card
                              hoverable
                              cover={<img alt={product.name} src={product.image} className='p-4' style={{ display: 'flex', width: '150px', margin: '0 auto' }} />}
                              actions={[
                                <a href="#">
                                  <ShoppingCartOutlined className="hover:text-pink-500" style={{ fontSize: '25px' }} />
                                </a>,
                              ]}
                            >
                              <Card.Meta
                                title={<a href="#" className="hover:text-pink-500">{product.name}</a>}
                                description={<span className="text-sm text-pink-500">{product.price}</span>}
                              />
                            </Card>
                          </div>
                        ))}
                      </Slider>
                    </div>
                  </div>
                </div>

              </section>
            </Paragraph>
          </Card>

          <Card style={{ marginTop: '10px' }} >
            <table>
              <caption>Thông tin chi tiết</caption>
              <tr>
                <th>Tên sản phẩm</th>
                <td>Sản phẩm dinh dưỡng Enfagrow Enspire 3 cho trẻ 2-6 tuổi 850g
                </td>
              </tr>
              <tr>
                <th>Thương hiệu</th>
                <td>Mead Johnson</td>
              </tr>
              <tr>
                <th>Sản xuất tại</th>
                <td>Thái Lan</td>
              </tr>
              <tr>
                <th>Trọng lượng sản phẩm</th>
                <td>850g</td>
              </tr>
              <tr>
                <th>Nhà cung cấp</th>
                <td>TH True Milk</td>
              </tr>
              <tr>
                <th>Hướng dẫn sử dụng</th>
                <td> Rửa tay sạch với xà phòng và nước trước khi pha.
                  . Đun các dụng cụ, cốc và nắp, trong nước sôi (đun sôi trong 1 phút).</td>
              </tr>

            </table>

          </Card>
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
        </Col>
      </Row>

    </div>

  );
};

export default ProductDetail;