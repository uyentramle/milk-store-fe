import React, { useState, useEffect } from 'react';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Table, Select, Image, } from 'antd';
import { Link } from 'react-router-dom';

const { Option } = Select;

interface Blog {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    status: boolean;
}

const BlogManagementPage: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'Active' | 'Inactive' | 'All'>('All');

    useEffect(() => {
        const fetchedBlogs: Blog[] = [
            {
                id: 1,
                title: '5 lý do mẹ nên tin chọn sữa Vinamilk Organic Gold cho bé yêu',
                description: '5 lý do mẹ nên tin chọn sữa Vinamilk Organic Gold cho bé yêu',
                thumbnail: 'https://cdn1.concung.com/img/news/2021/1053-1633086650-cover.webp',
                status: true,
            },
            {
                id: 2,
                title: 'Sữa Vinamilk Organic Gold - Sự lựa chọn hoàn hảo cho sức khỏe của bé',
                description: 'Sữa Vinamilk Organic Gold - Sự lựa chọn hoàn hảo cho sức khỏe của bé',
                thumbnail: 'https://cdn1.concung.com/img/news/2023/2430-1692244686-cover.webp',
                status: true,
            },
        ];
        setBlogs(fetchedBlogs);
    }, []);

    const filteredBlogs = blogs.filter((b) => {
        const matchesSearch = `${b.title} ${b.description}`
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
            title: 'Hình ảnh',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            render: (text: string) => <Image src={text} alt="blog" width={64} />,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
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
            render: (_text: any, _record: Blog) => (
                <Button type="primary" icon={<EditOutlined />} className="bg-blue-500">
                    Edit
                </Button>
            ),
        },
        {
            title: 'Xóa',
            key: 'delete',
            render: (_text: any, _record: Blog) => (
                <Button type="primary" danger icon={<DeleteOutlined />} className="bg-red-500">
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">Quản lý Bài viết</h1>
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
                        to="/admin/blogs/create"
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

export default BlogManagementPage;
