import React, { useState, useEffect } from 'react';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Table, Select, } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;

interface Voucher {
    id: number;
    code: string;
    description: string;
    discount_type: "Percentage" | "FixedAmount";
    discount_value: number;
    start_date: Date;
    end_date: Date;
    usage_limit: number;
    used_count: number;
    minimum_order_value: number;
    status: "Active" | "Expired" | "Used";
}

const VoucherManagementPage: React.FC = () => {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'Active' | 'Expired' | 'Used' | 'All'>('All');

    useEffect(() => {
        const fetchedVouchers: Voucher[] = [
            {
                id: 1,
                code: 'Happy10DayVN',
                description: 'Giảm 10% cho đơn hàng từ 100.000đ với 100 khách hàng đầu tiên.',
                discount_type: 'Percentage',
                discount_value: 10,
                start_date: new Date(),
                end_date: new Date(),
                usage_limit: 100,
                used_count: 0,
                minimum_order_value: 100000,
                status: 'Active',
            },
            {
                id: 2,
                code: 'Happy20DayVN',
                description: 'Giảm 20.000đ cho đơn hàng từ 200.000đ với 100 khách hàng đầu tiên.',
                discount_type: 'FixedAmount',
                discount_value: 20000,
                start_date: new Date(),
                end_date: new Date(),
                usage_limit: 100,
                used_count: 0,
                minimum_order_value: 200000,
                status: 'Active',
            },
        ];
        setVouchers(fetchedVouchers);
    }, []);

    const filteredVouchers = vouchers.filter((v) => {
        const matchesSearch = `${v.code} ${v.description}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus =
            filterStatus === 'All' || filterStatus === v.status;
        return matchesSearch && matchesStatus;
    });

    const columns = [
        {
            title: 'No.',
            dataIndex: 'id',
            key: 'id',
            render: (_text: any, _record: any, index: number) => index + 1,
        },
        {
            title: 'Mã',
            dataIndex: 'code',
            key: 'code',
            render: (text: string) => <span className="font-semibold text-pink-500">{text}</span>,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => text,
        },
        {
            title: 'Cập nhật',
            key: 'update',
            render: (_text: any, _record: Voucher) => (
                <Button type="primary" icon={<EditOutlined />} className="bg-blue-500">
                    Edit
                </Button>
            ),
        },
        {
            title: 'Xóa',
            key: 'delete',
            render: (_text: any, _record: Voucher) => (
                <Button type="primary" danger icon={<DeleteOutlined />} className="bg-red-500">
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">Quản lý vouchers</h1>
            <div className="mb-4 flex justify-between">
                <div className="flex">
                    <div className="relative mr-4">
                        <Input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            suffix={<SearchOutlined />}
                        />
                    </div>
                    <div>
                        <Select
                            id="status-filter"
                            className='w-48'
                            value={filterStatus}
                            onChange={(value) =>
                                setFilterStatus(value as 'Active' | 'Expired' | 'Used' | 'All')
                            }
                        >
                            <Option value="All">Tất cả</Option>
                            <Option value="Active">Hoạt động</Option>
                            <Option value="Expired">Hết hạn</Option>
                            <Option value="Used">Đã sử dụng</Option>
                        </Select>
                    </div>
                </div>
                <div>
                    <Link
                        to="/admin/vouchers/create"
                        className="inline-flex items-center rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-700 hover:text-white"
                    >
                        <PlusOutlined className="mr-2" />
                        New
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table columns={columns} dataSource={filteredVouchers} rowKey="id" />
            </div>
        </div>
    );
};

export default VoucherManagementPage;
