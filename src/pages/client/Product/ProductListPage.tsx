import React, { useState, useEffect, } from 'react';
import Sidebar from '../../../layouts/client/Components/Sidebar/Sidebar';
import { Input, Typography, Row, Col, Card, Rate, Badge, Button, Empty, } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

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
    type: Type;
}

interface Type {
    id: number;
    name: string;
    description: string;
    active: boolean;
}

const getProductsByType = async (typeId: string): Promise<Product[]> => {
    try {
        const response = await axios.get('https://localhost:44329/api/Product/GetAllProducts');
        const fetchedProducts = response.data.data.filter((product: Product) => !product.isDeleted && product.typeId === parseInt(typeId));

        const productImagesPromises = fetchedProducts.map(async (product: Product) => {
            const imageResponse = await axios.get(`https://localhost:44329/api/ProductImage/GetProductImagesById?productImageId=${product.id}`);
            if (imageResponse.data.success && imageResponse.data.data.length > 0) {
                product.image = imageResponse.data.data[0].image.thumbnailUrl;
            }
            return product;
        });

        return Promise.all(productImagesPromises);
    } catch (error) {
        console.error('Lỗi tìm nạp sản phẩm:', error);
        throw error;
    }
};

const getPromotionProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get('https://localhost:44329/api/Product/GetAllProducts');
        const fetchedProducts = response.data.data.filter((promotionProduct: Product) => promotionProduct.active && promotionProduct.discount > 0);

        const promotionProductImagesPromises = fetchedProducts.map(async (promotionProduct: Product) => {
            const imageResponse = await axios.get(`https://localhost:44329/api/ProductImage/GetProductImagesById?productImageId=${promotionProduct.id}`);
            if (imageResponse.data.success && imageResponse.data.data.length > 0) {
                promotionProduct.image = imageResponse.data.data[0].image.thumbnailUrl;
            }
            return promotionProduct;
        });

        return Promise.all(promotionProductImagesPromises);
    } catch (error) {
        console.error('Lỗi tìm nạp sản phẩm:', error);
        throw error;
    }
};

const ProductListPage: React.FC = () => {
    const { typeId } = useParams<{ typeId: string }>();
    const [products, setProducts] = useState<Product[]>([]);
    const [promotionProduct, setPromotionProducts] = useState<Product[]>([]);
    const [sortType, setSortType] = useState<string>('default');

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (typeId) {
                    const products = await getProductsByType(typeId);
                    setProducts(products);
                }
            } catch (error) {
                console.error('Lỗi tìm nạp sản phẩm:', error);
            }
        };

        fetchData()
    }, [typeId]);

    useEffect(() => {
        getPromotionProducts()
            .then((promotionProducts) => {
                setPromotionProducts(promotionProducts);
            })
            .catch((error) => {
                console.error('Lỗi tìm nạp sản phẩm khuyến mãi:', error);
            });
    }, []);

    useEffect(() => {
        let sortedProducts = [...products];
        if (sortType === 'lowToHigh') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortType === 'highToLow') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        setPromotionProducts(sortedProducts);
    }, [sortType]);

    const handleSort = (type: string) => {
        setSortType(type);
    };

    if (!products || products.length === 0) {
        return (
            <div className="min-h-screen flex flex-col">
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 p-4 m-4">
                        <div className="flex items-center">
                            <Input
                                className="rounded-full"
                                style={{ height: '70px' }}
                                placeholder="Ba mẹ muốn tìm mua gì hôm nay?"
                                prefix={<SearchOutlined />}
                            />
                        </div>
                        <div className="flex items-center justify-between my-4">
                            <div className="text-lg text-pink-500" style={{ margin: '30px' }}>
                                <Empty /> Chúng tôi chưa có sản phẩm cho loại sản phẩm này!
                            </div>
                        </div>
                        <Typography.Title level={3} className="my-4">Những sản phẩm khuyến mãi khác</Typography.Title>
                        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                            {promotionProduct.map((p) => (
                                <Link to={`/product-detail/${p.id}`} className="block hover:opacity-75">
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
    }

    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4 m-4">
                    <div className="flex items-center my-5">
                        <Input
                            className="rounded-full"
                            style={{ height: '70px' }}
                            placeholder="Ba mẹ muốn tìm mua gì hôm nay?"
                            prefix={<SearchOutlined />}
                        />
                    </div>
                    <div className="flex items-center justify-between my-4">
                        <div className="flex space-x-2 ">
                            <Button type={sortType === 'default' ? "primary" : "default"} onClick={() => handleSort('default')}>Phù hợp</Button>
                            <Button type={sortType === 'lowToHigh' ? "primary" : "default"} onClick={() => handleSort('lowToHigh')}>Giá Thấp - Cao</Button>
                            <Button type={sortType === 'highToLow' ? "primary" : "default"} onClick={() => handleSort('highToLow')}>Giá Cao - Thấp</Button>
                        </div>
                    </div>

                    <Typography.Title level={3} className="my-4 text-center">Sản phẩm theo danh mục</Typography.Title>
                    <section className="container mx-auto my-4">
                        <Row gutter={[16, 16]}>
                            {products.map((product) => (
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

                    <div className='mt-4 pt-4'>
                        <Typography.Title level={3} className="my-4 text-center">Sản phẩm khuyến mãi</Typography.Title>
                        <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {promotionProduct.map((p) => (
                                <Link to={`/product-detail/${p.id}`} className="block hover:opacity-75">
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
                    </div>
                </main>
            </div >
        </div >
    );
};

export default ProductListPage;
