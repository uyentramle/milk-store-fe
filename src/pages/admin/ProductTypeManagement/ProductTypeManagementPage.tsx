import React, { useState, useEffect } from 'react';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined, RestOutlined } from '@ant-design/icons';
import { Button, Input, Table, Select, Modal } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { message } from 'antd';

const { Option } = Select;

interface ProductType {
    id: number;
    name: string;
    description: string;
    active: boolean;
    isDeleted: boolean;
}

const ProductTypeManagementPage: React.FC = () => {
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'Active' | 'Inactive' | 'All'>('All');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentProductType, setCurrentProductType] = useState<ProductType | null>(null);
    
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

        fetch('https://localhost:44329/api/ProductType/GetAllProductType')
            .then(response => response.json())
            .then(data => setProductTypes(data.data
                .filter((productType: ProductType) => !productType.isDeleted)
                .sort((a: { id: number; }, b: { id: number; }) => b.id - a.id)));
    }, []);

    const filteredBlogs = productTypes.filter((p) => {
        const matchesSearch = `${p.name}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus =
            filterStatus === 'All' || (filterStatus === 'Active' && p.active) || (filterStatus === 'Inactive' && !p.active);
        return matchesSearch && matchesStatus;
    });

    // if (!isAuthorized) {
    //     return (
    //         <div className="flex justify-center items-center mt-16 text-lg font-semibold">
    //             Bạn không có quyền để truy cập nội dung này.
    //         </div>
    //     );
    // }

    const columns = [
        {
            title: 'STT.',
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
            dataIndex: 'active',
            key: 'active',
            render: (text: boolean) => (text ? 'Hoạt động' : 'Không hoạt động'),
        },
        {
            title: 'Cập nhật',
            key: 'update',
            render: (_text: any, _record: ProductType) => (
                <Link to={`/admin/product-types/update/${_record.id}/manage`}>
                    <Button type="primary" icon={<EditOutlined />} className="bg-blue-500">
                        Cập nhật
                    </Button>
                </Link>
            ),
        }, {
            title: 'Xóa',
            key: 'delete',
            render: (_text: any, _record: ProductType) => (
                <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    className="bg-red-500"
                    onClick={() => showDeleteConfirm(_record)}
                >
                    Xóa
                </Button>
            ),
        }
    ];

    const showDeleteConfirm = (record: ProductType) => {
        setCurrentProductType(record);
        setIsModalVisible(true);
    };

    const handleDelete = async () => {
        if (currentProductType) {
            try {
                const accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    throw new Error('Access token not found.');
                }

                const decodedToken: any = jwtDecode(accessToken);
                const DeletedBy = decodedToken.id;

                const data = new FormData();
                data.append('Id', currentProductType.id.toString());
                data.append('DeletedBy', DeletedBy);
                const response = await axios.post('https://localhost:44329/api/ProductType/DeleteProductType', data, {
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (response.data.success) {
                    message.success('Xóa danh mục sản phẩm thành công!');
                    setProductTypes(productTypes.filter((p) => p.id !== currentProductType.id));
                } else if (response.data.message === "Product type is in use.") {
                    message.error("Danh mục đang được sử dụng. Không thể xóa!");
                }
                else {
                    message.error('Không thể xóa danh mục sản phẩm');
                }
            } catch (error) {
                console.error('Error deleting product type:', error);
            }
            setIsModalVisible(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setCurrentProductType(null);
    };

    return (
        <div className="container mx-auto px-4 pb-8">
            <h1 className="mb-6 text-3xl font-bold">Quản lý danh mục sản phẩm</h1>
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
                <div className="flex space-x-4">
                    <Link
                        to="/admin/product-types/create"
                        className="inline-flex items-center rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-700 hover:text-white"
                    >
                        <PlusOutlined className="mr-2" />
                        Thêm mới
                    </Link>
                    <Link
                        to="/admin/product-types/restore"
                        className="inline-flex items-center rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-700 hover:text-white"
                    >
                        <RestOutlined className="mr-2" />
                        Khôi phục
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                <Table columns={columns} dataSource={filteredBlogs} rowKey="id" />
            </div>
            <Modal
                title="Xác nhận xóa"
                visible={isModalVisible}
                onOk={handleDelete}
                onCancel={handleCancel}
                okText="Xóa"
                cancelText="Hủy"
                centered
            >
                <p>Bạn có chắc chắn muốn xóa mục này không?</p>
            </Modal>

        </div>
    );
};

export default ProductTypeManagementPage;
