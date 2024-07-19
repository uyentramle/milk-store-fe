import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';
import Pagination from 'antd/es/pagination';

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

// interface Image {
//     id: number;
//     imageUrl: string;
//     thumbnailUrl: string;
//     createdAt: string;
//     createdBy: string;
//     updatedAt: string;
//     updatedBy: string;
//     deletedAt: string;
//     deletedBy: string;
//     isDeleted: boolean;
//     type: string;
// }

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

    useEffect(() => {
        fetch('https://localhost:7251/api/Product/GetAllProducts')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    const fetchedProducts = data.data;
                    const productImagesPromises = fetchedProducts.map((product: Product) =>
                        fetch(`https://localhost:7251/api/ProductImage/GetProductImagesById?productImageId=${product.id}`)
                            .then((response) => response.json())
                            .then((imageData) => {
                                if (imageData.success && imageData.data.length > 0) {
                                    product.image = imageData.data[0].image.imageUrl;
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

    return (
        <div className="container mx-auto px-4 pb-8">
            <h1 className="mb-6 text-3xl font-bold">Manage Milk Products</h1>
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
                        to="/admin/products/create"
                        className="inline-flex items-center rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-700 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        Thêm mới
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">STT.</th>
                            <th className="px-4 py-2">Tên sản phẩm</th>
                            <th className="px-4 py-2">Hình ảnh</th>
                            <th className="px-4 py-2">SKU</th>
                            <th className="px-4 py-2">Giá góc</th>
                            <th className="px-4 py-2">Giá giảm</th>
                            <th className="px-4 py-2">Số lượng</th>
                            <th className="px-4 py-2">Phân loại</th>
                            <th className="px-4 py-2">Thương hiệu</th>
                            <th className="px-4 py-2">Độ tuổi</th>
                            <th className="px-4 py-2">Trạng thái</th>
                            <th className="px-4 py-2">Cập nhật</th>
                            <th className="px-4 py-2">Xóa</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentProducts.map((product, index) => {
                            const rowNumber = (currentPage - 1) * productsPerPage + index + 1;
                            return (
                                <tr key={product.id} className="border-b bg-white">
                                    <td className="px-4 py-2 font-bold">{rowNumber}</td>
                                    <Link to={`/admin/products/details/${product.id}`}>
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
                                    <td className={`${product.active ? 'text-green-500' : 'text-red-500'} font-bold`}>
                                        {product.active ? 'Đang bán' : 'Ngừng bán'}
                                    </td>
                                    <td className="px-4 py-2">
                                        <Link to={`/admin/products/update/${product.id}`}>
                                            <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                                                <FontAwesomeIcon icon={faPen} />
                                            </button>
                                        </Link>
                                    </td>
                                    
                                    <td className="px-4 py-2">
                                        <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
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
        </div>
    );
};

export default ManageProductPage;
