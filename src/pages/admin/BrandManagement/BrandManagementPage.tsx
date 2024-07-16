import React, { useState, useEffect } from 'react';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Table, Image } from 'antd';
import { Link } from 'react-router-dom';

interface Brand {
    id: number;
    name: string;
    origin: string;
    description: string;
    image: string;
    active: boolean;
}

const BrandManagementPage: React.FC = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'Active' | 'Inactive' | 'All'>('All');

    useEffect(() => {
        const fetchedBrands: Brand[] = [
            {
                id: 1,
                name: 'Vinamilk',
                origin: 'Việt Nam',
                description: 'Fresh organic whole milk from local farms.',
                image: 'https://cdn1.concung.com/img/m/2023/07/266_logo_vuong1689324985.png',
                active: true,
            },
            {
                id: 2,
                name: 'TH True Milk',
                origin: 'Việt Nam',
                description: 'Fresh organic whole milk from local farms.',
                image: 'https://cdn1.concung.com/img/m/2023/07/266_logo_vuong1689324985.png',
                active: true,
            },
        ];
        setBrands(fetchedBrands);
    }, []);

    const filteredBrands = brands.filter((brand) => {
        const matchesSearch = `${brand.name} ${brand.origin} ${brand.description}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus =
            filterStatus === 'All' || (filterStatus === 'Active' && brand.active) || (filterStatus === 'Inactive' && !brand.active);
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
            title: 'Tên',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <span className="font-semibold text-pink-500">{text}</span>,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text: string) => <Image src={text} alt="brand" width={64} height={64} />,
        },
        {
            title: 'Nguồn gốc',
            dataIndex: 'origin',
            key: 'origin',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'active',
            key: 'active',
            render: (text: boolean) => (text ? 'Active' : 'Inactive'),
        },
        {
            title: 'Cập nhật',
            key: 'update',
            render: (_text: any, _record: any) => (
                <Button type="primary" icon={<EditOutlined />} className="bg-blue-500">
                    Edit
                </Button>
            ),
        },
        {
            title: 'Xóa',
            key: 'delete',
            render: (_text: any, _record: any) => (
                <Button type="primary" danger icon={<DeleteOutlined />} className="bg-red-500">
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">Quản lý thương hiệu</h1>
            <div className="mb-4 flex justify-between">
                <div className="flex">
                    <div className="relative mr-4">
                        <Input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            suffix={<SearchOutlined />}
                            className="rounded-md border px-4 py-2"
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
                            <option value="All">Tất cả</option>
                            <option value="Active">Hoạt động</option>
                            <option value="Inactive">Không hoạt động</option>
                        </select>
                    </div>
                </div>
                <div>
                    <Link
                        to="/admin/brands/create"
                        className="inline-flex items-center rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-700 hover:text-white"
                    >
                        <PlusOutlined className="mr-2" />
                        New
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table columns={columns} dataSource={filteredBrands} rowKey="id" />
            </div>
        </div>
    );
};

export default BrandManagementPage;
