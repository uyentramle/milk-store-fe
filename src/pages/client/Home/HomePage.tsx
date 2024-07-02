import React from 'react';
import Banner from '../../../layouts/client/Components/Banner/Banner';
import Sidebar from '../../../layouts/client/Components/Sidebar/Sidebar';
import { Input, Typography, Row, Col, Card, Rate, Badge, Button, } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, EyeTwoTone, } from '@ant-design/icons';
import { Link } from 'react-router-dom';

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

    const bestSellingProduct = [
        {
            id: 1,
            title: "Combo 2 Sữa Vinamilk ColosGold số 3 800g (2-6 tuổi)",
            image: "https://cdn1.concung.com/2022/01/54559-79245-large_mobile/sua-vinamilk-colosgold-so-3-800g-2-6-tuoi.png",
            price: 678300,
            discount: 15,
            rating: 5,
            sold: "20K+"
        },
        {
            id: 2,
            title: "Combo 2 Sữa Vinamilk ColosGold số 3 800g (2-6 tuổi)",
            image: "https://cdn1.concung.com/combo/2023/08/600x600-468-2023-03-56616-trans.png",
            price: 678300,
            discount: 15,
            rating: 5,
            sold: "20K+"
        },
        {
            id: 3,
            title: "Combo 2 Sữa Vinamilk ColosGold số 3 800g (2-6 tuổi)",
            image: "https://cdn1.concung.com/combo/2023/08/600x600-468-2023-03-56616-trans.png",
            price: 678300,
            discount: 15,
            rating: 5,
            sold: "20K+"
        },
        {
            id: 4,
            title: "Combo 2 Sữa Vinamilk ColosGold số 3 800g (2-6 tuổi)",
            image: "https://cdn1.concung.com/combo/2023/08/600x600-468-2023-03-56616-trans.png",
            price: 678300,
            discount: 15,
            rating: 5,
            sold: "20K+"
        },
        {
            id: 5,
            title: "Combo 2 Sữa Vinamilk ColosGold số 3 800g (2-6 tuổi)",
            image: "https://cdn1.concung.com/combo/2023/08/600x600-468-2023-03-56616-trans.png",
            price: 678300,
            discount: 15,
            rating: 5,
            sold: "20K+"
        },
        {
            id: 6,
            title: "Combo 2 Sữa Vinamilk ColosGold số 3 800g (2-6 tuổi)",
            image: "https://cdn1.concung.com/2022/01/54559-79245-large_mobile/sua-vinamilk-colosgold-so-3-800g-2-6-tuoi.png",
            price: 678300,
            discount: 15,
            rating: 5,
            sold: "20K+"
        },
        {
            id: 7,
            title: "Combo 2 Sữa Vinamilk ColosGold số 3 800g (2-6 tuổi)",
            image: "https://cdn1.concung.com/2022/01/54559-79245-large_mobile/sua-vinamilk-colosgold-so-3-800g-2-6-tuoi.png",
            price: 678300,
            discount: 15,
            rating: 5,
            sold: "20K+"
        },
        {
            id: 8,
            title: "Combo 2 Sữa Vinamilk ColosGold số 3 800g (2-6 tuổi)",
            image: "https://cdn1.concung.com/2022/01/54559-79245-large_mobile/sua-vinamilk-colosgold-so-3-800g-2-6-tuoi.png",
            price: 678300,
            discount: 15,
            rating: 5,
            sold: "20K+"
        },
        {
            id: 9,
            title: "Combo 2 Sữa Vinamilk ColosGold số 3 800g (2-6 tuổi)",
            image: "https://cdn1.concung.com/combo/2023/08/600x600-468-2023-03-56616-trans.png",
            price: 678300,
            discount: 15,
            rating: 5,
            sold: "20K+"
        },
        {
            id: 10,
            title: "Combo 2 Sữa Vinamilk ColosGold số 3 800g (2-6 tuổi)",
            image: "https://cdn1.concung.com/combo/2023/08/600x600-468-2023-03-56616-trans.png",
            price: 678300,
            discount: 15,
            rating: 5,
            sold: "20K+"
        },
    ];

    const recentBlog = [
        {
            id: 1,
            image: "https://cdn1.concung.com/img/news/2021/1053-1633086650-cover.webp",
            title: "5 lý do mẹ nên tin chọn sữa Vinamilk Organic Gold cho bé yêu",
            date: "11/6/2024",
            rating: 5,
            view: "4.4k",
        },
        {
            id: 2,
            image: "https://cdn1.concung.com/img/news/2023/2430-1692244686-cover.webp",
            title: "Back to school: Bé đi học mẫu giáo, ba mẹ cần chuẩn bị đồ dùng gì?",
            date: "11/6/2024",
            rating: 5,
            view: "4.4k",
        },
        {
            id: 3,
            image: "https://cdn1.concung.com/img/news/2023/2437-1692950600-cover.webp",
            title: "Sữa tươi và sữa bột pha sẵn: Nên chọn loại nào cho bé?",
            date: "11/6/2024",
            rating: 5,
            view: "4.4k",
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
                    <section className="container mx-auto my-4">
                        <Row gutter={[16, 16]}>
                            {products.map((product) => (
                                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                                    <Link to={`/product-detail/`} className="block hover:opacity-75">
                                        <Card
                                            hoverable
                                            cover={
                                                <div className="flex justify-center items-center">
                                                    <img alt={product.name} src={product.image} className="pt-2 px-2 object-cover object-center" style={{ maxWidth: '150px', maxHeight: '170px', width: 'auto', height: 'auto' }} />
                                                </div>
                                            }
                                            actions={[
                                                <Link to={`/addtocart/${product.id}`} className="block">
                                                    <ShoppingCartOutlined style={{ fontSize: '25px' }} />
                                                </Link>,
                                            ]}
                                        >
                                            <Card.Meta
                                                title=""
                                                description={
                                                    <div>
                                                        <h3 className="text-gray-900 hover:text-pink-700 text-lg ">{product.name}</h3>
                                                        <p className="text-sm text-pink-500 mb-2">{product.price}</p>
                                                        <Rate disabled defaultValue={4} />
                                                    </div>
                                                }
                                            />
                                        </Card>
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </section>

                    <Typography.Title level={3} className="my-4">Bài viết gần đây</Typography.Title>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3">
                        {recentBlog.map((blog) => (
                            <div key={blog.id}>
                                <Link to={`/blog-detail`} className="block hover:opacity-75">
                                    <Card
                                        hoverable
                                        cover={<img alt={blog.title} src={blog.image} />}
                                    >
                                        <div className="">
                                            <h3 className="text-lg hover:text-pink-500">{blog.title}</h3>
                                            <p className="text-xs text-gray-500 mt-2">{blog.date}</p>
                                            <div className="flex items-center justify-between mt-2">
                                                <p className="text-xs text-gray-500"><EyeTwoTone twoToneColor="#9b9b9b" /> {blog.view}</p>
                                                <Rate disabled defaultValue={blog.rating} />
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <Typography.Title level={3} className="my-4">Sản phẩm bán chạy</Typography.Title>
                    <div className="grid grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                        {bestSellingProduct.map((p) => (
                            <Link to={`/product-detail`} className="block hover:opacity-75">
                                <Card className="w-full">
                                    <div className="flex justify-center">
                                        <img src={p.image} alt={p.title} className="h-40 object-cover rounded-md mb-4" />
                                    </div>
                                    <h3 className="font-medium hover:text-pink-500 ">{p.title}</h3>
                                    <Rate disabled defaultValue={p.rating} />
                                    <div className="flex items-center justify-between my-2">
                                        <span className="text-lg font-semibold">{p.price.toLocaleString()}₫</span>
                                        <Badge.Ribbon text={`-${p.discount}%`} color="red">
                                        </Badge.Ribbon>
                                    </div>
                                    <p className="text-gray-500">Đã bán {p.sold}</p>
                                    <Button className="mt-2 w-full" type="primary" icon={<ShoppingCartOutlined />}>Thêm vào giỏ</Button>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </main>
            </div >
        </div >
    );
};

export default HomePage;
