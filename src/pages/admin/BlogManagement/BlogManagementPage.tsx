import React, { useState, useEffect } from 'react';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Table, Select, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Ensure jwtDecode is correctly imported


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
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
    const accessToken = localStorage.getItem('accessToken');
  const decodedToken = jwtDecode(accessToken);
  const userId = decodedToken.userId;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('https://localhost:44329/api/Blog/GetAllBlogs?pageIndex=0&pageSize=10');
                if (response.data.success) {
                    const filteredBlogs = response.data.data.items.filter((blog: Blog) => !blog.isDelete);
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

    const handleDeleteModal = (blog: Blog) => {
        setBlogToDelete(blog);
        setDeleteModalVisible(true);
    };

    const handleDeleteBlog = async () => {
        try {
            if (!blogToDelete) return; // Ensure blogToDelete is defined
    
            setDeleteModalVisible(false);
    
            // Replace with your logic to get userId from accessToken
            const deleteBy = 1; // Example: Replace with actual userId from accessToken
    
            const response = await axios.put(`https://localhost:44329/api/Blog/DeleteBlog?id=${blogToDelete.id}&deleteBy=${userId}`);
    
            if (response.data.success) {
                message.success('Deleted blog successfully');
                const updatedBlogs = blogs.filter((blog) => blog.id !== blogToDelete.id);
                setBlogs(updatedBlogs);
            } else {
                message.error(response.data.message || 'Failed to delete blog');
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            message.error('Failed to delete blog');
        }
    };

    const handleCancelDeleteModal = () => {
        setDeleteModalVisible(false);
        setBlogToDelete(null);
    };

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
            dataIndex: 'blogImg',
            key: 'thumbnail',
            render: (text: string) => <img src={text} alt="blog" style={{ width: 64, height: 'auto' }} />,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            render: (text: string) => <span className="font-semibold text-pink-500">{text}</span>,
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
            render: (_text: any, record: Blog) => (
                <Link to={`/admin/blogs/edit/${record.id}`}>
                    <Button type="primary" icon={<EditOutlined />} className="bg-blue-500">
                        Edit
                    </Button>
                </Link>
            ),
        },
        {
            title: 'Xóa',
            key: 'delete',
            render: (_text: any, record: Blog) => (
                <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    className="bg-red-500"
                    onClick={() => handleDeleteModal(record)}
                >
                    Delete
                </Button>
            ),
        },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">Quản lý bài viết</h1>
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
                            className="w-48"
                            value={filterStatus}
                            onChange={(value) => setFilterStatus(value as 'Active' | 'Inactive' | 'All')}
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

            {/* Delete Blog Modal */}
            <Modal
                title="Xác nhận xóa bài viết"
                visible={deleteModalVisible}
                onOk={handleDeleteBlog}
                onCancel={handleCancelDeleteModal}
                okText="Xóa"
                cancelText="Hủy"
                okButtonProps={{ danger: true }}
            >
                <p>Bạn có chắc chắn muốn xóa bài viết này?</p>
            </Modal>
        </div>
    );
};

export default BlogManagementPage;
