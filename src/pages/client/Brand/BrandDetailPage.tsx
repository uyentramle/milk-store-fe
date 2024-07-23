import React, { useState, useEffect } from "react";
import { Button, Pagination, Card, Badge, Rate, Spin, Empty, } from 'antd';
import { EyeTwoTone, CheckOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
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
}

interface Blog {
    id: number;
    title: string;
    description: string;
    blogImg: string;
    status: boolean;
    createdAt: string;
    createdBy: string;
    updatedAt: string | null;
    updatedBy: string | null;
    deletedAt: string | null;
    deletedBy: string | null;
    isDeleted: boolean;
}

const getBrandDetail = async (brandId: string): Promise<any> => {
    try {
        const response = await axios.get(`https://localhost:7251/api/Brand/ViewBrandDetail/${brandId}`, {
            headers: {
                'accept': '*/*'
            }
        });

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

const getProductsByBrand = async (brandId: string): Promise<Product[]> => {
    try {
        const response = await axios.get('https://localhost:44329/api/Product/GetAllProducts');
        const fetchedProducts = response.data.data.filter((product: Product) => !product.isDeleted && product.brandId === parseInt(brandId));

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

// const checkUserFollowStatus = async (accountId: string, brandId: string): Promise<boolean> => {
//     try {
//         const response = await axios.get(`https://localhost:44329/api/FollowBrand/CheckUserFollowsBrand?accountId=${accountId}&brandId=${brandId}`);
//         return response.data.data.isFollowing;
//     } catch (error) {
//         console.error('Lỗi kiểm tra trạng thái theo dõi:', error);
//         throw error;
//     }
// };

const BrandDetailPage: React.FC = () => {
    const { brandId } = useParams<{ brandId: string }>();
    const [brandData, setBrandData] = useState<any>(null);
    const [productData, setProductData] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize] = useState<number>(10);
    const [sortType, setSortType] = useState<string>('default');
    const [recentBlog, setBlogs] = useState<Blog[]>([]);

    // const accountId = "4e03d7e3-c366-4266-858c-625c3da51bb3"; // thay the khi co authen
    // const [isFollowing, setIsFollowing] = useState<boolean>(false);

    const defaultImageUrl = 'https://via.placeholder.com/64';

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (brandId) {
                    const brandDetailData = await getBrandDetail(brandId);
                    setBrandData(brandDetailData);

                    const products = await getProductsByBrand(brandId);
                    setProductData(products);

                    // const followStatus = await checkUserFollowStatus(accountId, brandId);
                    // setIsFollowing(followStatus);
                }
                setLoading(false);
            } catch (error) {
                console.error('Lỗi tìm nạp thông tin thương hiệu hoặc sản phẩm:', error);
                setError('Không thể tìm nạp thông tin thương hiệu hoặc sản phẩm.');
                setLoading(false);
            }
        };

        fetchData();
    }, [brandId]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('https://localhost:44329/api/Blog/GetAllBlogs?pageIndex=0&pageSize=10');
                if (response.data.success) {
                    const filteredBlogs = response.data.data.items.filter((blog: Blog) => blog.status);
                    setBlogs(filteredBlogs);
                } else {
                    console.error('Failed to fetch blogs:', response.data.message);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    useEffect(() => {
        let sortedProducts = [...productData];
        if (sortType === 'lowToHigh') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortType === 'highToLow') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        setProductData(sortedProducts);
    }, [sortType]);

    const handleSort = (type: string) => {
        setSortType(type);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    // const handleFollowToggle = async () => {
    //     try {
    //         if (isFollowing) {
    //             // Gọi API để bỏ theo dõi
    //             await axios.put('https://localhost:44329/api/FollowBrand/UserUnfollowsBrand', {
    //                 followedAt: new Date().toISOString(),
    //                 accountId: accountId,
    //                 brandId: brandId
    //             });
    //         } else {
    //             // Gọi API để theo dõi
    //             await axios.post('https://localhost:44329/api/FollowBrand/UserFollowsBrand', {
    //                 followedAt: new Date().toISOString(),
    //                 accountId: accountId,
    //                 brandId: brandId
    //             });
    //         }
    //         setIsFollowing(!isFollowing);
    //     } catch (error) {
    //         console.error('Lỗi khi thay đổi trạng thái theo dõi:', error);
    //         setError('Không thể thay đổi trạng thái theo dõi.');
    //     }
    // };

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><Spin size="large" /></div>;
    }

    if (error) {
        return <div className="text-center text-red-500" style={{ margin: '70px' }}>{error}</div>;
    }

    if (!brandData) {
        return (
            <div className="text-center" style={{ margin: '70px' }}>
                <Empty />
                Không có thông tin thương hiệu này.
            </div>
        );
    }

    // const startIndex = (currentPage - 1) * pageSize;
    // const endIndex = startIndex + pageSize;
    // const paginatedProducts = productData.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen flex flex-wrap w-full">
            <div className="p-4">
                <div className="bg-white shadow rounded-lg p-4 flex items-center space-x-4">
                    <img
                        src={brandData.imageUrl || defaultImageUrl}
                        alt={brandData.name}
                        className="h-20 w-20 rounded-full shadow border-2 object-cover"
                    />
                    <div className="pr-4">
                        <h2 className="font-bold text-xl pb-2">
                            {brandData.name}
                            <img src="https://cdn1.concung.com/themes/desktop4.1/image/v40/icon/trustbrand.png" alt="Trust Brand" className="h-3 inline-block mx-2" />
                        </h2>
                        <button className="bg-pink-500 text-white px-4 py-2 rounded mr-2">Theo Dõi</button>
                        {/* <Button
                            className="bg-pink-500 text-white px-4 py-2 rounded mr-2"
                            onClick={handleFollowToggle}
                        >
                            {isFollowing ? "Bỏ Theo Dõi" : "Theo Dõi"}
                        </Button> */}
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
                    {recentBlog.map((blog) => (
                        <div
                            key={blog.id}
                            className="w-1/4 bg-white shadow rounded-lg p-4"
                        >
                            <Link to={`/blog-detail/${blog.id}`} className="block hover:opacity-75">
                                <img
                                    src={blog.blogImg}
                                    alt={blog.title} className="h-45 w-full object-cover rounded-lg"
                                />
                                <p className="mt-2">{blog.title}</p>
                                <p className="text-xs text-gray-500 mt-2"><EyeTwoTone twoToneColor="#9b9b9b" /> 20k</p>
                            </Link>
                        </div>
                    ))}
                    {/* <div className="w-1/4 bg-white shadow rounded-lg p-4">
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
                    </div> */}
                </div>

                <div className="p-6">
                    <h2 className="text-lg font-bold text-pink-500 mb-2">Sản Phẩm</h2>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex space-x-2 ">
                            <Button type={sortType === 'default' ? "primary" : "default"} onClick={() => handleSort('default')}>Phù Hợp</Button>
                            <Button type={sortType === 'lowToHigh' ? "primary" : "default"} onClick={() => handleSort('lowToHigh')}>Giá Thấp - Cao</Button>
                            <Button type={sortType === 'highToLow' ? "primary" : "default"} onClick={() => handleSort('highToLow')}>Giá Cao - Thấp</Button>
                        </div>
                        <Pagination
                            current={currentPage}
                            total={productData.length}
                            pageSize={pageSize}
                            onChange={handlePageChange}
                        />
                    </div>

                    <div className="grid grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                        {productData.length > 0 ? (
                            productData.map((product) => (
                                <Card className="w-full" key={product.id}>
                                    <Link to={`/product-detail/${product.id}`} className="block hover:opacity-75">
                                        <div className="flex justify-center">
                                            <img src={product.image} alt={product.name} className="h-40 object-cover rounded-md mb-4" />
                                        </div>
                                        <h3 className="text-lg font-medium">{product.name}</h3>
                                        <Rate disabled defaultValue={5} />
                                        <div className="flex items-center justify-between my-2">
                                            <span className="text-xl font-semibold">{product.price.toLocaleString()}₫</span>
                                            <Badge.Ribbon text={`-${product.discount}%`} color="red">
                                            </Badge.Ribbon>
                                        </div>
                                        <p className="text-gray-500">Đã bán 99</p>
                                        <Button className="mt-2 w-full" type="primary" icon={<ShoppingCartOutlined />}>Thêm vào giỏ</Button>
                                    </Link>
                                </Card>
                            ))
                        ) : (
                            <div className="col-span-2 text-center text-gray-500">Chúng tôi hiện không có sản phẩm nào cho thương hiệu này.</div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BrandDetailPage;