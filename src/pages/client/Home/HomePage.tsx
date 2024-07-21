import React, { useState, useEffect, } from 'react';
import Banner from '../../../layouts/client/Components/Banner/Banner';
import Sidebar from '../../../layouts/client/Components/Sidebar/Sidebar';
import { Input, Typography, Row, Col, Card, Rate, Badge, Button, } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, EyeTwoTone, } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface Brand {
    id: number;
    name: string;
    brandOrigin: string;
    description: string;
    active: boolean;
    imageUrl: string | null;
    totalFollow: number;
    createdAt: string;
    createdBy: string;
    updatedAt: string | null;
    updatedBy: string | null;
    deletedAt: string | null;
    deletedBy: string | null;
    isDeleted: boolean;
}

interface Type {
    id: number;
    name: string;
    description: string;
    active: boolean;
}

interface AgeRange {
    id: number;
    name: string;
    description: string;
    active: boolean;
}

interface Product {
    id: string;
    name: string;
    image: string;
    sku: string;
    description: string;
    price: number;
    weight: number;
    discount: number;
    quantity: number;
    typeId: number;
    ageId: number;
    brandId: number;
    active: boolean;
    createdAt: string;
    createdBy: string;
    updatedAt: string | null;
    updatedBy: string | null;
    deletedAt: string | null;
    deletedBy: string | null;
    isDeleted: boolean;
    brand: Brand;
    type: Type;
    ageRange: AgeRange;
}

const HomePage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const randomizedProducts = [...products].sort(() => 0.5 - Math.random());

    useEffect(() => {
        fetch('https://localhost:44329/api/Product/GetAllProducts')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const fetchedProducts = data.data.filter((product: Product) => !product.isDeleted);
                    const productImagesPromises = fetchedProducts.map((product: Product) =>
                        fetch(`https://localhost:44329/api/ProductImage/GetProductImagesById?productImageId=${product.id}`)
                            .then((response) => response.json())
                            .then((imageData) => {
                                if (imageData.success && imageData.data.length > 0) {
                                    product.image = imageData.data[0].image.thumbnailUrl;
                                }
                                return product;
                            })
                    );

                    Promise.all(productImagesPromises).then((updatedProducts) => {
                        setProducts(updatedProducts);
                    });
                } else {
                    console.error('Failed to fetch products:', data.message);
                }
            })
            .catch((error) => {
                console.error('Error fetching products:', error);
            });
    }, []);

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
                            className="rounded-full"
                            style={{ height: '70px' }} 
                            placeholder="Ba mẹ muốn tìm mua gì hôm nay ?"
                            prefix={<SearchOutlined />}
                        />
                    </div>

                    <Typography.Title level={3} className="my-4">Sản phẩm nổi bật</Typography.Title>
                    <section className="container mx-auto my-4">
                        <Row gutter={[16, 16]}>
                            {randomizedProducts.map((product) => (
                                <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                                    <Link to={`/product-detail/${product.id}`} className="block hover:opacity-75">
                                        <Card
                                            hoverable
                                            cover={
                                                <div className="flex justify-center items-center">
                                                    <img alt={product.name} src={product.image} className="pt-2 px-2 object-cover object-center" style={{ maxHeight: '170px', width: 'auto', height: 'auto' }} />
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
                                                        <p className="text-sm text-pink-500 my-2">
                                                            {new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(product.price)}
                                                        </p>
                                                        <Rate disabled defaultValue={5} />
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
                        {products.map((p) => (
                            <Link to={`/product-detail`} className="block hover:opacity-75">
                                <Card className="w-full">
                                    <div className="flex justify-center">
                                        <img src={p.image} alt={p.name} className="h-40 object-cover rounded-md mb-4" />
                                    </div>
                                    <h3 className="font-medium hover:text-pink-500 ">{p.name}</h3>
                                    <Rate disabled defaultValue={5} />
                                    <div className="flex items-center justify-between my-2">
                                        <span className="text-lg font-semibold">{p.price.toLocaleString()}₫</span>
                                        <Badge.Ribbon text={`-${p.discount}%`} color="red">
                                        </Badge.Ribbon>
                                    </div>
                                    <p className="text-gray-500">Đã bán 99</p>
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
