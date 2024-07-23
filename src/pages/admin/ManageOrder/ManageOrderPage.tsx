import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faSearch);

const ManageOrderPage: React.FC = () => {
    const [orders, setOrders] = useState([
        // Sample order data
        {
            id: 1,
            customer: 'John Doe',
            address: '123 Main St, Anytown USA',
            orderDate: '2023-05-01',
            discount: 0.1,
            totalAmount: 99.99,
            paymentMethod: 'Credit Card',
            paymentStatus: 'Paid',
            type: 'Order',
            status: 'Waiting',
            voucher: null,
            userPoints: 100,
            pointsSaved: 10,
        },
        // Add more sample orders here
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    const filteredOrders = orders.filter(
        (order) =>
            (filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase()) &&
            (order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.address.toLowerCase().includes(searchTerm.toLowerCase())),
    );

    return (
        <div className="container mx-auto px-4 pb-8">
            <h1 className="mb-6 text-3xl font-bold">Manage Orders</h1>
            <div className="mb-4 flex justify-between">
                <div className="flex">
                    <div className="relative mr-4">
                        <input
                            type="text"
                            placeholder="Search orders..."
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
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="rounded-md border border-gray-300 px-4 py-2"
                        >
                            <option value="all">All</option>
                            <option value="waiting">Waiting</option>
                            <option value="repair">Repair</option>
                            <option value="repaired">Repaired</option>
                            <option value="delivering">Delivering</option>
                            <option value="delivery failed">Delivery Failed</option>
                            <option value="delivery success">Delivery Success</option>
                            <option value="received">Received</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">No.</th>
                            <th className="px-4 py-2">Customer</th>
                            <th className="px-4 py-2">Address</th>
                            <th className="px-4 py-2">Order Date</th>
                            <th className="px-4 py-2">Discount</th>
                            <th className="px-4 py-2">Total Amount</th>
                            <th className="px-4 py-2">Payment Method</th>
                            <th className="px-4 py-2">Payment Status</th>
                            <th className="px-4 py-2">Type</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Voucher</th>
                            <th className="px-4 py-2">User Points</th>
                            <th className="px-4 py-2">Points Saved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.customer}</td>
                                <td>{order.address}</td>
                                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>{(order.discount * 100).toFixed(0)}%</td>
                                <td>${order.totalAmount.toFixed(2)}</td>
                                <td>{order.paymentMethod}</td>
                                <td>{order.paymentStatus}</td>
                                <td>{order.type}</td>
                                <td>{order.status}</td>
                                <td>{order.voucher ? order.voucher : '-'}</td>
                                <td>{order.userPoints}</td>
                                <td>{order.pointsSaved}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrderPage;
