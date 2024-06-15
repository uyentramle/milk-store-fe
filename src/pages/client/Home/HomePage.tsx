import React from 'react';
import Banner from '../../../layouts/client/Components/Banner/Banner';
import Sidebar from '../../../layouts/client/Components/Sidebar/Sidebar';
import { Input, Typography, Row, Col, Card, } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, } from '@ant-design/icons';


const HomePage: React.FC = () => {
    const products = [
        {
            id: 1,
            image: "https://cdn1.concung.com/2022/05/57282-88158-large_mobile/vinamilk-optimum-gold-2-800g.png",
            name: "Vinamilk Optimum Gold 2, 800g (6 - 12 tháng)",
            price: "365.000₫",
        },
        {
            id: 2,
            image: "https://cdn1.concung.com/2022/05/57286-88164-large_mobile/vinamilk-optimum-gold-3-850g-1-2-tuoi.png",
            name: "Vinamilk Optimum Gold 3, 850g, 1-2 tuổi",
            price: "369.000₫",
        },
        {
            id: 3,
            image: "https://cdn1.concung.com/2024/04/44603-1714120962-trans.png",
            name: "Sữa Vinamilk Yoko Gold 1 850g (0-1 tuổi)",
            price: "449.000₫",
        },
        {
            id: 4,
            image: "https://cdn1.concung.com/2022/05/57283-88154-large_mobile/vinamilk-optimum-gold-1-800g.png",
            name: "Vinamilk Optimum Gold 1, 800g (0 - 6 tháng)",
            price: "395.000₫",
        },
        {
            id: 5,
            image: "https://cdn1.concung.com/2022/03/44602-84158-large_mobile/vinamilk-yoko-gold-2-1-2-tuoi-850g.png",
            name: "Sữa Vinamilk Yoko Gold 2 850g (1-2 tuổi)",
            price: "435.000₫",
        },
        {
            id: 6,
            image: "https://cdn1.concung.com/2022/05/57282-88158-large_mobile/vinamilk-optimum-gold-2-800g.png",
            name: "Vinamilk Optimum Gold 2, 800g (6 - 12 tháng)",
            price: "365.000₫",
        },
        {
            id: 7,
            image: "https://cdn1.concung.com/2022/05/57286-88164-large_mobile/vinamilk-optimum-gold-3-850g-1-2-tuoi.png",
            name: "Vinamilk Optimum Gold 3, 850g, 1-2 tuổi",
            price: "369.000₫",
        },
        {
            id: 8,
            image: "https://cdn1.concung.com/2024/04/44603-1714120962-trans.png",
            name: "Sữa Vinamilk Yoko Gold 1 850g (0-1 tuổi)",
            price: "449.000₫",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Banner />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4 m-4">
                    <div className="flex items-center">
                        <Input
                            className="rounded-full border-pink-500"
                            placeholder="Ba mẹ muốn tìm mua gì hôm nay ?"
                            prefix={<SearchOutlined />}
                        />
                    </div>

                    <Typography.Title level={3} className="my-4">Sản phẩm nổi bật</Typography.Title>
                    <section className="container mx-auto m-4">
                        <Row gutter={[16, 16]} >
                            {products.map((product) => (
                                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                                    <Card
                                        hoverable cover={<img alt={product.name} src={product.image} className='p-4' style={{ width: '150px' }} />}
                                        actions={[
                                            <a href="#" >
                                                <ShoppingCartOutlined className="hover:text-pink-500" style={{ fontSize: '25px' }} />
                                            </a>,
                                        ]}
                                    >
                                        <Card.Meta
                                            title={<a href="#" className="hover:text-pink-500">{product.name}</a>}
                                            description={<span className="text-sm text-pink-500">{product.price}</span>}
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </section>

                </main>
            </div>
        </div>
    );
};

export default HomePage;
