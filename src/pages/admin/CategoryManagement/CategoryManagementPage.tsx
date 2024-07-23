import React, { useState, useEffect } from 'react';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Table, Select, Modal, Form, Input as AntInput, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const { Option } = Select;

interface CategoryBlog {
    id: number;
    name: string;
    description: string;
    status: boolean; // 'status' reflects the 'active' field
    blogsCount: number;
}

const CategoryBlogManagementPage: React.FC = () => {
    const [categoryBlogs, setCategoryBlogs] = useState<CategoryBlog[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'Active' | 'Inactive' | 'All'>('All');
    const [editingCategory, setEditingCategory] = useState<CategoryBlog | null>(null);
    const [form] = Form.useForm();
    
    // const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

    // useEffect(() => {
    //     const accessToken = localStorage.getItem('accessToken');

    //     if (!accessToken) {
    //         return;
    //     }

    //     try {
    //         const decodedToken: any = jwtDecode(accessToken);
    //         const userRoles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    //         if (userRoles.includes('Admin') || userRoles.includes('Staff') ||
    //             userRoles.includes('admin') || userRoles.includes('staff')) {
    //             setIsAuthorized(true);
    //         }
    //     } catch (error) {
    //         console.error('Error decoding token:', error);
    //     }
    // }, []);

    useEffect(() => {
        // if (!isAuthorized) return;

        const fetchCategoryBlogs = async () => {
            try {
                const response = await fetch('https://localhost:44329/api/Category/GetAllCategory?pageIndex=0&pageSize=10');
                if (!response.ok) {
                    throw new Error('Failed to fetch categories.');
                }
                const data = await response.json();
                const categories = data.data.items;

                // Fetch blog categories
                const blogCategoryResponse = await fetch('https://localhost:44329/api/BlogCategory/GetAllBlogCategories?pageIndex=0&pageSize=10');
                if (!blogCategoryResponse.ok) {
                    throw new Error('Failed to fetch blog category relationships.');
                }
                const blogCategoryData = await blogCategoryResponse.json();
                const blogCategories = blogCategoryData.data.items;

                // Calculate blog count and filter deleted categories
                const categorizedBlogs = categories
                    .filter((category: any) => !category.isDeleted) // Exclude deleted categories
                    .map((category: any) => {
                        const blogsCount = blogCategories.filter((item: any) => item.categoryId === category.id).length;
                        return {
                            id: category.id,
                            name: category.name,
                            description: category.description,
                            status: category.active, // `active` corresponds to `status`
                            blogsCount
                        };
                    });

                setCategoryBlogs(categorizedBlogs);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCategoryBlogs();
    }, []);

    const filteredBlogs = categoryBlogs.filter((b) => {
        const matchesSearch = `${b.name}`.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' ||
            (filterStatus === 'Active' && b.status) ||
            (filterStatus === 'Inactive' && !b.status);
        return matchesSearch && matchesStatus;
    });

    const handleEdit = (category: CategoryBlog) => {
        setEditingCategory(category);
        form.setFieldsValue({
            name: category.name,
            description: category.description,
            status: category.status ? 'Active' : 'Inactive',
        });
    };

    const handleUpdate = async (values: any) => {
        if (editingCategory) {
            try {
                const { name, description, status } = values;
                await axios.put(`https://localhost:44329/api/Category/UpdateCategory?id=${editingCategory.id}`, {
                    name,
                    description,
                    active: status === 'Active', // Convert status to boolean
                });
                message.success('Category updated successfully');
                setEditingCategory(null);
                form.resetFields();
                // Refetch the categories
                await fetchCategoryBlogs();
            } catch (error) {
                await fetchCategoryBlogs();
            }
        }
    };

    const handleDelete = (categoryId: number) => {
        Modal.confirm({
            title: 'Xóa danh mục',
            content: 'Bạn có chắc chắn muốn xóa danh mục này?',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    await axios.delete(`https://localhost:44329/api/Category/DeleteCategory?id=${categoryId}`);
                    message.success('Category deleted successfully');
                    // Refetch the categories
                    await fetchCategoryBlogs();
                } catch (error) {
                    await fetchCategoryBlogs();
                }
            }
        });
    };

    // if (!isAuthorized) {
    //     return (
    //         <div className="flex justify-center items-center mt-16 text-lg font-semibold">
    //             Bạn không có quyền để truy cập nội dung này.
    //         </div>
    //     );
    // }

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
            title: 'Số lượng blog',
            dataIndex: 'blogsCount',
            key: 'blogsCount',
        },
        {
            title: 'Cập nhật',
            key: 'update',
            render: (_text: any, record: CategoryBlog) => (
                <Button type="primary" icon={<EditOutlined />} className="bg-blue-500" onClick={() => handleEdit(record)}>
                    Edit
                </Button>
            ),
        },
        {
            title: 'Xóa',
            key: 'delete',
            render: (_text: any, record: CategoryBlog) => (
                <Button type="primary" danger icon={<DeleteOutlined />} className="bg-red-500" onClick={() => handleDelete(record.id)}>
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

            <Modal
                title="Edit Category"
                visible={!!editingCategory}
                onCancel={() => setEditingCategory(null)}
                footer={null}
            >
                <Form form={form} layout="vertical" onFinish={handleUpdate}>
                    <Form.Item
                        label="Tiêu đề"
                        name="name"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                    >
                        <AntInput />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                    >
                        <AntInput />
                    </Form.Item>
                    <Form.Item
                        label="Trạng thái"
                        name="status"
                        rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                    >
                        <Select>
                            <Option value="Active">Hoạt động</Option>
                            <Option value="Inactive">Không hoạt động</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default CategoryBlogManagementPage;
