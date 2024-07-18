import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';

library.add(faEye, faPen, faTrash, faSearch, faPlus);

interface Product {
    id: number;
    name: string;
    image: string;
    sku: string;
    description: string;
    price: number;
    weight: number;
    discount: number;
    quantity: number;
    type: string;
    brand: string;
    age: string;
    createdAt: string;
    createdBy: string;
    updatedAt: string;
    updatedBy: string;
    status: 'Active' | 'Inactive';
}

const ManageProductPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'Active' | 'Inactive' | 'All'>('All');

    useEffect(() => {
        const fetchedProducts: Product[] = [
            {
                id: 1,
                name: 'Organic Whole Milk',
                image: 'https://oasisonline.com.au/cdn/shop/products/DSC_8544_786x.jpg?v=1613482476',
                sku: 'ORG-WHL-MLK',
                description: 'Fresh organic whole milk from local farms.',
                price: 3.99,
                weight: 1,
                discount: 0.2,
                quantity: 100,
                type: 'Whole Milk',
                brand: 'Dairy Delight',
                age: '2-5 years',
                createdAt: '2023-04-01T10:00:00Z',
                createdBy: 'John Doe',
                updatedAt: '2023-04-05T14:30:00Z',
                updatedBy: 'Jane Smith',
                status: 'Active',
            },
            {
                id: 2,
                name: 'Low-Fat Milk',
                image: 'https://www.danoneawayfromhome.com/wp-content/uploads/2018/03/ho-up-milk-6-64oz-whole-organic-ca.png',
                sku: 'LF-MLK',
                description: 'Low-fat milk with reduced fat content.',
                price: 2.99,
                weight: 1,
                discount: 0.1,
                quantity: 75,
                type: 'Low-Fat Milk',
                brand: 'Dairy Delight',
                age: '6-12 years',
                createdAt: '2023-03-15T08:30:00Z',
                createdBy: 'Jane Smith',
                updatedAt: '2023-04-10T16:45:00Z',
                updatedBy: 'John Doe',
                status: 'Inactive',
            },
        ];
        setProducts(fetchedProducts);
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesSearch = `${product.name} ${product.sku} ${product.description}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || product.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="container mx-auto px-4 pb-8">
            <h1 className="mb-6 text-3xl font-bold">Manage Milk Products</h1>
            <div className="mb-4 flex justify-between">
                <div className="flex">
                    <div className="relative mr-4">
                        <input
                            type="text"
                            placeholder="Search products..."
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
                            value={filterStatus}
                            onChange={(e) =>
                                setFilterStatus(e.target.value as 'Active' | 'Inactive' | 'All')
                            }
                            className="rounded-md border border-gray-300 px-4 py-2"
                        >
                            <option value="All">All</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                </div>

                <div>
                    <Link
                        to="/admin/products/create"
                        className="inline-flex items-center rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-700 hover:text-white"
                    >
                        <FontAwesomeIcon icon={faPlus} className="mr-2" />
                        New
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">No.</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Image</th>
                            <th className="px-4 py-2">SKU</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Weight</th>
                            <th className="px-4 py-2">Discount</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Brand</th>
                            <th className="px-4 py-2">Age</th>
                            <th className="px-4 py-2">Created Date</th>
                            <th className="px-4 py-2">Created By</th>
                            <th className="px-4 py-2">Updated Date</th>
                            <th className="px-4 py-2">Updated By</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Update</th>
                            <th className="px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-16 w-16 object-cover"
                                    />
                                </td>
                                <td>{product.sku}</td>
                                <td>{product.description}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.weight} L</td>
                                <td>{(product.discount * 100).toFixed(0)}%</td>
                                <td>{product.quantity}</td>
                                <td>{product.type}</td>
                                <td>{product.brand}</td>
                                <td>{product.age}</td>
                                <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                                <td>{product.createdBy}</td>
                                <td>{new Date(product.updatedAt).toLocaleDateString()}</td>
                                <td>{product.updatedBy}</td>
                                <td>{product.status}</td>
                                <td className="px-4 py-2">
                                    <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                </td>
                                <td className="px-4 py-2">
                                    <button className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProductPage;
