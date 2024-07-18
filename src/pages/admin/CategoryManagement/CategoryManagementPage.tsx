import React, { useState, useEffect } from 'react';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Table, Select, } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;

interface CategoryBlog {
    id: number;
    name: string;
    description: string;
    status: boolean;
}

const CategoryBlogManagementPage: React.FC = () => {
    const [categoryBlogs, setCategoryBlogs] = useState<CategoryBlog[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'Active' | 'Inactive' | 'All'>('All');

    useEffect(() => {
        const fetchedCategoryBlogs: CategoryBlog[] = [
            {
                id: 1,
                name: 'Sữa Việt',
                description: 'Sữa tươi từ các trang trại địa phương.',
                status: true,
            },
            {
                id: 2,
                name: 'Vitamin',
                description: 'Vitamin tự nhiên từ rau củ.',
                status: true,
            },
            {
                id: 3,
                name: 'Trẻ em',
                description: '',
                status: true,
            },
            {
                id: 4,
                name: 'Mẹ bầu',
                description: '',
                status: true,
            },
        ];
        setCategoryBlogs(fetchedCategoryBlogs);
    }, []);

    const filteredBlogs = categoryBlogs.filter((b) => {
        const matchesSearch = `${b.name}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus =
            filterStatus === 'All' || (filterStatus === 'Active' && b.status) || (filterStatus === 'Inactive' && !b.status);
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
            title: 'Tiêu đề',
            dataIndex: 'name',
            key: 'name',
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
            render: (text: boolean) => (text ? 'Active' : 'Inactive'),
        },
        {
            title: 'Cập nhật',
            key: 'update',
            render: (_text: any, _record: CategoryBlog) => (
                <Button type="primary" icon={<EditOutlined />} className="bg-blue-500">
                    Edit
                </Button>
            ),
        },
        {
            title: 'Xóa',
            key: 'delete',
            render: (_text: any, _record: CategoryBlog) => (
                <Button type="primary" danger icon={<DeleteOutlined />} className="bg-red-500">
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div className="container mx-auto px-4 pb-8">
            <h1 className="mb-6 text-3xl font-bold">Quản lý danh mục bài viết</h1>
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
                                setFilterStatus(value as 'Active' | 'Inactive' | 'All')
                            }
                        >
                            <Option value="All">Tất cả</Option>
                            <Option value="Active">Hoạt động</Option>
                            <Option value="Inactive">Không hoạt động</Option>
                        </Select>
                    </div>
                </div>
                <div>
                    <Link
                        to="/admin/categories/create"
                        className="inline-flex items-center rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-700 hover:text-white"
                    >
                        <PlusOutlined className="mr-2" />
                        New
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table columns={columns} dataSource={filteredBlogs} rowKey="id" />
            </div>
        </div>
    );
};

export default CategoryBlogManagementPage;
