import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { EditOutlined, RestOutlined, BackwardOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import Pagination from 'antd/es/pagination';
import axios from 'axios';
import { message } from 'antd';
import { jwtDecode } from 'jwt-decode';

library.add(faEye, faPen, faTrash, faSearch, faPlus);

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

const ManageProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<boolean | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
    const [statusProduct, setStatusProduct] = useState<Product | null>(null);

    useEffect(() => {
        fetch('https://localhost:44329/api/Product/GetAllProducts')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const fetchedProducts = data.data.filter((product: Product) => product.isDeleted);
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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleDeleteClick = (productId: string) => {
        setSelectedProductId(productId);
        setIsModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedProductId) {
            
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('Access token not found.');
            }
            const decodedToken: any = jwtDecode(accessToken);
            const DeletedBy = decodedToken.id;

            const deleteData = new FormData();
            deleteData.append('Id', selectedProductId);
            deleteData.append('UpdatedBy', DeletedBy);

            const response = await axios.post(`https://localhost:44329/api/Product/RestoreProduct`, deleteData,{
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`,
                },
            })
            if (response.data.success) {
                message.success('Khôi phục sản phẩm thành công');
                // Sau khi xóa, đóng popup và xóa sản phẩm khỏi state
                setProducts(products.filter(product => product.id !== selectedProductId));
                setIsModalVisible(false);
                setSelectedProductId(null);
            } else {
                message.error('Khôi phục sản phẩm thất bại');
            }
            
        }
    };

    const handleCancelDelete = () => {
        setIsModalVisible(false);
        setSelectedProductId(null);
    };

    const filteredProducts = products.filter((product) => {
        const searchTermLower = searchTerm.toLowerCase();
        return (
            (filterStatus === null || product.active === filterStatus) &&
            (product.name.toLowerCase().includes(searchTermLower) ||
                product.description.toLowerCase().includes(searchTermLower))
        );
    });

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    const handleStatusClick = (product: Product) => {
    setStatusProduct(product);
    setIsStatusModalVisible(true);
};

const handleConfirmStatusChange = async () => {
    if (statusProduct) {
        const updatedStatus = !statusProduct.active;
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token not found.');
        }
        const decodedToken: any = jwtDecode(accessToken);
        const UpdatedBy = decodedToken.id;

        const updateData = new FormData();
        updateData.append('Id', statusProduct.id);
        updateData.append('UpdatedBy', UpdatedBy);

        const response = await axios.post(`https://localhost:44329/api/Product/UpdateStatusProduct`, updateData, {
            headers: {
                'accept': '*/*',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.data.success) {
            message.success('Cập nhật trạng thái thành công');
            setProducts(products.map(product => 
                product.id === statusProduct.id ? { ...product, active: updatedStatus } : product
            ));
            setIsStatusModalVisible(false);
            setStatusProduct(null);
        } else {
            message.error('Cập nhật trạng thái thất bại');
        }
    }
};

const handleCancelStatusChange = () => {
    setIsStatusModalVisible(false);
    setStatusProduct(null);
};

    return (
        <div className="container mx-auto px-4 pb-8">
            <h1 className="mb-6 text-3xl font-bold">Quản lý sản phẩm</h1>
            <div className="mb-4 flex justify-between">
                <div className="flex">
                    <div className="relative mr-4">
                        <input
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                        />
                    </div>
                    <div>
                        <select
                            id="status-filter"
                            value={filterStatus === null ? 'All' : String(filterStatus)}
                            onChange={(e) =>
                                setFilterStatus(
                                    e.target.value === 'true'
                                        ? true
                                        : e.target.value === 'false'
                                            ? false
                                            : null,
                                )
                            }
                            className="rounded-md border border-gray-300 px-4 py-2"
                        >
                            <option value="All">Tất cả</option>
                            <option value="true">Đang bán</option>
                            <option value="false">Ngừng bán</option>
                        </select>
                    </div>
                </div>

                <div>
                    <Link
                        to="/admin/products"
                        className="inline-flex items-center rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-700 hover:text-white"
                    >
                        <BackwardOutlined className="mr-2" />
                        Trở về
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">STT.</th>
                            <th className="px-4 py-2">Tên sản phẩm</th>
                            <th className="px-4 py-2">Ảnh bìa</th>
                            <th className="px-4 py-2">SKU</th>
                            <th className="px-4 py-2">Giá gốc</th>
                            <th className="px-4 py-2">Giá giảm</th>
                            <th className="px-4 py-2">Số lượng</th>
                            <th className="px-4 py-2">Phân loại</th>
                            <th className="px-4 py-2">Thương hiệu</th>
                            <th className="px-4 py-2">Độ tuổi</th>
                            <th className="px-4 py-2">Trạng thái</th>
                            <th className="px-4 py-2">Cập nhật</th>
                            <th className="px-4 py-2">Khôi phục</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product, index) => {
                            const rowNumber = (currentPage - 1) * productsPerPage + index + 1;
                            return (
                                <tr key={product.id} className="border-b bg-white">
                                    <td className="px-4 py-2 font-bold">{rowNumber}</td>
                                    <Link to={`/admin/products/details/${product.id}/restore`}>
                                        <td className="mx-auto px-4 py-2 font-bold">
                                            {product.name}
                                        </td>
                                    </Link>
                                    <td>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-16 w-16 object-cover"
                                        />
                                    </td>
                                    <td>{product.sku}</td>
                                    <td>
                                        {new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(product.price)}
                                    </td>
                                    <td>{new Intl.NumberFormat('vi-VN', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(product.discount)}
                                    </td>
                                    <td>{product.quantity}</td>
                                    <td>{product.type.name}</td>
                                    <td>{product.brand.name}</td>
                                    <td>{product.ageRange.name}</td>
                                    <td className={`${product.active ? 'text-green-500' : 'text-red-500'} font-bold cursor-pointer`} onClick={() => handleStatusClick(product)}>
                                        {product.active ? 'Đang bán' : 'Ngừng bán'}
                                    </td>
                                    <td className="px-4 py-2">
                                        <Link to={`/admin/products/update/${product.id}/restore`}>
                                            <Button type="primary" icon={<EditOutlined />}>
                                            </Button>
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2">
                                        <Button 
                                            type="primary" 
                                            icon={<RestOutlined />} 
                                            danger 
                                            onClick={() => handleDeleteClick(product.id)} 
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <Pagination
                current={currentPage}
                pageSize={productsPerPage}
                total={filteredProducts.length}
                onChange={handlePageChange}
            />
            <Modal
                title="Xác nhận khôi phục"
                visible={isModalVisible}
                onOk={handleConfirmDelete}
                onCancel={handleCancelDelete}
                okText="Khôi phục"
                cancelText="Hủy"
                centered
            >
                <p>Bạn có chắc chắn muốn khôi phục sản phẩm này không?</p>
            </Modal>
            <Modal
                title="Xác nhận thay đổi trạng thái"
                visible={isStatusModalVisible}
                onOk={handleConfirmStatusChange}
                onCancel={handleCancelStatusChange}
                okText="Cập nhật"
                cancelText="Hủy"
                centered
            >
                <p>Bạn có chắc chắn muốn thay đổi trạng thái của sản phẩm này không?</p>
            </Modal>
        </div>
    );
};

export default ManageProductPage;
