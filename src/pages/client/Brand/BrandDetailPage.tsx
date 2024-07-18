import React, { useState, useEffect } from "react";
import { Button, Pagination, Card, Badge, Rate, Spin, } from 'antd';
import { EyeTwoTone, CheckOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const products = [
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
];

const getBrandDetail = async (brandId: string): Promise<any> => {
    // const accessToken = localStorage.getItem('accessToken');

    // if (!accessToken) {
    //     throw new Error('Access token not found.');
    // }

    try {
        const response = await axios.get(`https://localhost:7251/api/Brand/ViewBrandDetail/${brandId}`, {
            headers: {
                'accept': '*/*'
            }
        });

        // const { id, name, brandOrigin, description, active, imageUrl, totalFollow, createdAt, createdBy, updatedAt, updatedBy, deletedAt, deletedBy, isDeleted } = response.data.data;
        // return { id, name, brandOrigin, description, active, imageUrl, totalFollow, createdAt, createdBy, updatedAt, updatedBy, deletedAt, deletedBy, isDeleted };
        return response.data.data;
    } catch (error) {
        console.error('Lỗi tìm nạp từ port 7251:', error);
        try {
            const response = await axios.get(`https://localhost:44329/api/Brand/ViewBrandDetail/${brandId}`, {
                headers: {
                    'accept': '*/*'
                }
            });
            return response.data.data;

        } catch (fallbackError) {
            console.error('Lỗi tìm nạp từ port 44329:', fallbackError);
            throw fallbackError;
        }
    }
};

const BrandDetailPage: React.FC = () => {
    const { brandId } = useParams<{ brandId: string }>();
    const [brandData, setBrandData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const defaultImageUrl = 'https://via.placeholder.com/64';

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (brandId) {
                    const brandDetailData = await getBrandDetail(brandId);
                    setBrandData(brandDetailData);
                }
                setLoading(false);
            } catch (error) {
                console.error('Lỗi tìm nạp thông tin thương hiệu:', error);
                setError('Không thể tìm nạp thông tin thương hiệu.');
                setLoading(false);
            }
        };

        fetchData();
    }, [brandId]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><Spin size="large" /></div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (!brandData) {
        return <div className="text-center">No brand data found.</div>;
    }

    return (
        <div className="min-h-screen flex flex-wrap w-full">
            {/* <div className="bg-white">
                <img src="https://cdn1.concung.com/img/adds/2024/06/1719288912-CATE-Vinamilk.png" alt="Vinamilk" className="w-full object-cover rounded-lg" />
            </div> */}
            <div className="p-4">
                <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
                    <img src={brandData.imageUrl || defaultImageUrl} alt="{brandData.name}" className="h-20 w-20 rounded-full shadow border-2" />
                    <div className="pr-4">
                        <h2 className="font-bold text-xl pb-2">
                            {brandData.name}
                            <img src="https://cdn1.concung.com/themes/desktop4.1/image/v40/icon/trustbrand.png" alt="Trust Brand" className="h-3 inline-block mx-2" />
                        </h2>
                        <button className="bg-pink-500 text-white px-4 py-2 rounded mr-2">Theo Dõi</button>
                        {/* <button className="bg-gray-200 text-black px-4 py-2 rounded">Trao Đổi</button> */}
                    </div>
                    <div className="flex-1 flex justify-left text-lg">
                        <div className="mx-6">
                            <p>Theo dõi: </p>
                            <p>Hài lòng: </p>
                            <p>Đánh giá: </p>
                        </div>
                        <div className="mr-8 text-pink-500">
                            <p>2K</p>
                            <p>100%</p>
                            <p>5.0 / 5.0</p>
                        </div>
                        <div className="ml-8">
                            <p><CheckOutlined style={{ color: "#52c41a" }} /> 100% chất lượng</p>
                            <p><CheckOutlined style={{ color: "#52c41a" }} /> Phân phối chính hãng</p>
                            <p><CheckOutlined style={{ color: "#52c41a" }} /> Đổi trả dễ dàng</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6 mx-4">
                    <h2 className="text-lg font-bold text-pink-500">Thông Tin Bổ Ích</h2>
                    {/* <button className="text-pink-500">Xem tất cả</button> */}
                </div>

                <div className="flex space-x-4 mt-2">
                    <div className="w-1/4 bg-white shadow rounded-lg p-4">
                        <img src="https://cdn1.concung.com/img/news/2021/1053-1633086650-cover.webp" alt="Info 1" className="h-45 w-full object-cover rounded-lg" />
                        <p className="mt-2">5 lý do mẹ nên tin chọn sữa Vinamilk Organic Gold cho bé yêu</p>
                        <p className="text-xs text-gray-500 mt-2"><EyeTwoTone twoToneColor="#9b9b9b" /> 4.4k</p>
                    </div>
                    <div className="w-1/4 bg-white shadow rounded-lg p-4">
                        <img src="https://cdn1.concung.com/img/news/2023/2430-1692244686-cover.webp" alt="Info 2" className="h-45 w-full object-cover rounded-lg" />
                        <p className="mt-2">Back to school: Bé đi học mẫu giáo, ba mẹ cần chuẩn bị đồ dùng gì?</p>
                        <p className="text-xs text-gray-500 mt-2"><EyeTwoTone twoToneColor="#9b9b9b" /> 2.7k</p>
                    </div>
                    <div className="w-1/4 bg-white shadow rounded-lg p-4">
                        <img src="https://cdn1.concung.com/img/news/2023/2437-1692950600-cover.webp" alt="Info 3" className="h-45 w-full object-cover rounded-lg" />
                        <p className="mt-2">Sữa tươi và sữa bột pha sẵn: Nên chọn loại nào cho bé?</p>
                        <p className="text-xs text-pink-500 mt-2"><EyeTwoTone twoToneColor="#eb2f96" /> 23.2k</p>
                    </div>
                    <div className="w-1/4 bg-white shadow rounded-lg p-4">
                        <img src="https://cdn1.concung.com/img/news/2023/2563-1699929403-cover.webp" alt="Info 4" className="h-45 w-full object-cover rounded-lg" />
                        <p className="mt-2">Top 5 sữa cho trẻ biếng ăn, suy dinh dưỡng được ưa chuộng</p>
                        <p className="text-xs text-pink-500 mt-2"><EyeTwoTone twoToneColor="#eb2f96" /> 14k</p>
                    </div>
                </div>


                <div className="p-6">
                    <h2 className="text-lg font-bold text-pink-500 mb-2">Sản Phẩm</h2>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-2 ">
                            <Button type="primary">Phù Hợp</Button>
                            <Button>Bán Chạy</Button>
                            <Button>Hàng Mới</Button>
                            <Button>Giá Thấp - Cao</Button>
                            <Button>Giá Cao - Thấp</Button>
                        </div>
                        <Pagination defaultCurrent={1} total={50} />
                    </div>

                    <div className="grid grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                        {products.map((product) => (
                            <Card className="w-full">
                                <div className="flex justify-center">
                                    <img src={product.image} alt={product.title} className="h-40 object-cover rounded-md mb-4" />
                                </div>
                                <h3 className="text-lg font-medium">{product.title}</h3>
                                <Rate disabled defaultValue={product.rating} />
                                <div className="flex items-center justify-between my-2">
                                    <span className="text-xl font-semibold">{product.price.toLocaleString()}₫</span>
                                    <Badge.Ribbon text={`-${product.discount}%`} color="red">
                                    </Badge.Ribbon>
                                </div>
                                <p className="text-gray-500">Đã bán {product.sold}</p>
                                <Button className="mt-2 w-full" type="primary" icon={<ShoppingCartOutlined />}>Thêm vào giỏ</Button>
                            </Card>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BrandDetailPage;