import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPen, faTrash, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Link } from 'react-router-dom';

library.add(faEye, faPen, faTrash, faSearch, faPlus);

interface Account {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: 'Active' | 'Inactive' | 'Blocked';
    createdAt: Date;
    updatedAt: Date;
    gender: 'Male' | 'Female' | 'Other';
}

const ManageAccountPage: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'Active' | 'Inactive' | 'Blocked' | 'All'>(
        'All',
    );

    useEffect(() => {
        // Fetch accounts from an API or data source
        const fetchedAccounts: Account[] = [
            {
                id: 1,
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '1234567890',
                status: 'Active',
                createdAt: new Date('2022-01-01'),
                updatedAt: new Date('2022-01-01'),
                gender: 'Male',
            },
            {
                id: 2,
                firstName: 'John Doe',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '1234567890',
                status: 'Inactive',
                createdAt: new Date('2022-01-01'),
                updatedAt: new Date('2022-01-01'),
                gender: 'Female',
            },
            {
                id: 3,
                firstName: 'John Downe',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                phone: '1234567890',
                status: 'Blocked',
                createdAt: new Date('2022-01-01'),
                updatedAt: new Date('2022-01-01'),
                gender: 'Other',
            },
        ];
        setAccounts(fetchedAccounts);
    }, []);

    const filteredAccounts = accounts.filter((account) => {
        const matchesSearch =
            `${account.firstName} ${account.lastName} ${account.email} ${account.phone}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || account.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">Manage Accounts</h1>
            <div className="mb-4 flex justify-between">
                <div className="flex">
                    <div className="relative mr-4">
                        <input
                            type="text"
                            placeholder="Search accounts..."
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
                            onChange={(e) => setFilterStatus(e.target.value as 'Active' | 'Inactive' | 'Blocked' | 'All')}
                            className="rounded-md border border-gray-300 px-4 py-2"
                        >
                            <option value="All">All</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Blocked">Blocked</option>
                        </select>
                    </div>
                </div>

                <div>
                    <Link
                        to="/admin/accounts/create"
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
                        <tr className="bg-pink-200">
                        <th className="px-4 py-2">No.</th>
                            <th className="px-4 py-2">First Name</th>
                            <th className="px-4 py-2">Last Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Phone</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Created At</th>
                            <th className="px-4 py-2">Updated At</th>
                            <th className="px-4 py-2">Gender</th>
                            <th className="px-4 py-2">Update</th>
                            <th className="px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAccounts.map((account, index) => (
                            <tr key={account.id} className="border-b">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{account.firstName}</td>
                                <td className="px-4 py-2">{account.lastName}</td>
                                <td className="px-4 py-2">{account.email}</td>
                                <td className="px-4 py-2">{account.phone}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`rounded-full px-2 py-1 font-semibold ${
                                            account.status === 'Active'
                                                ? 'bg-green-200 text-green-800'
                                                : account.status === 'Inactive'
                                                  ? 'bg-yellow-200 text-yellow-800'
                                                  : 'bg-red-200 text-red-800'
                                        }`}
                                    >
                                        {account.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">{account.createdAt.toLocaleString()}</td>
                                <td className="px-4 py-2">{account.updatedAt.toLocaleString()}</td>
                                <td className="px-4 py-2">{account.gender}</td>
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

export default ManageAccountPage;
