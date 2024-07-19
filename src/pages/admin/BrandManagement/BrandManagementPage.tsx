import React, { useState, useEffect } from 'react';
import {
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { Button, Input, Table, Image, Select, Spin, Modal, notification, } from 'antd';
import { Link, useNavigate, } from 'react-router-dom';
import axios from 'axios';

const { Option } = Select;
const { confirm } = Modal;

interface Brand {
    id: number;
    name: string;
    origin: string;
    description: string;
    image: string | null;
    active: boolean;
}

const deleteBrandById = async (brandId: number): Promise<void> => {
    try {
        await axios.delete(`https://localhost:44329/api/Brand/DeleteBrand?id=${brandId}`, {
            headers: {
                'accept': '*/*'
            }
        });
        notification.success({
            message: 'Success',
            description: 'Thương hiệu được xóa thành công!',
        });
    } catch (error) {
        console.error('Lỗi xóa thương hiệu:', error);
        try {
            await axios.delete(`https://localhost:7251/api/Brand/DeleteBrand?id=${brandId}`, {
                headers: {
                    'accept': '*/*'
                }
            });
            notification.success({
                message: 'Success',
                description: 'Thương hiệu được xóa thành công!',
            });
        } catch (error) {
            console.error('Lỗi xóa thương hiệu:', error);
            notification.error({
                message: 'Error',
                description: 'Không thể xóa.',
            });
        }
    }
};

const BrandManagementPage: React.FC = () => {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'Active' | 'Inactive' | 'All'>('All');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const defaultImageUrl = 'https://via.placeholder.com/64';

    useEffect(() => {
        const fetchBrands = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('https://localhost:7251/api/Brand/GetBrands?pageIndex=0&pageSize=10');
                const fetchedBrands = response.data.data.items.map((brand: any) => ({
                    id: brand.id,
                    name: brand.name,
                    origin: brand.brandOrigin,
                    description: brand.description,
                    image: brand.imageUrl,
                    active: brand.active,
                }));
                setBrands(fetchedBrands);
            } catch (error) {
                console.error('Lỗi tìm nạp từ port 7251:', error);
                try {
                    const fallbackResponse = await axios.get('https://localhost:44329/api/Brand/GetBrands?pageIndex=0&pageSize=10');
                    const fetchedBrands = fallbackResponse.data.data.items.map((brand: any) => ({
                        id: brand.id,
                        name: brand.name,
                        origin: brand.brandOrigin,
                        description: brand.description,
                        image: brand.imageUrl,
                        active: brand.active,
                    }));
                    setBrands(fetchedBrands);
                } catch (fallbackError) {
                    console.error('Lỗi tìm nạp từ port 44329:', fallbackError);
                    setError('Không thể lấy từ cả hai ports.');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    const handleEdit = (brandId: number) => {
        navigate(`/admin/brands/update/${brandId}`);
    };

    const handleDeleteBrand = (brandId: number) => {
        confirm({
            title: 'Bạn có chắc xóa thương hiệu này?',
            icon: <ExclamationCircleOutlined />,
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            onOk: async () => {
                await deleteBrandById(brandId);
                setBrands(brands.filter(brand => brand.id !== brandId));
            },
            onCancel() {
                console.log('Hủy');
            },
        });
    };

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
            render: (text: string, brand: Brand) =>
                <a href={`/brand-name/${brand.id}`} target='_blank'>
                    <span className="font-semibold text-pink-500">
                        {text}
                    </span>
                </a>,
        },
        {
            title: 'Hình ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text: string | null) => (
                <Image
                    src={text || defaultImageUrl}
                    alt="brand"
                    width={64}
                    fallback={defaultImageUrl}
                />
            ),
        },
        {
            title: 'Nguồn gốc',
            dataIndex: 'origin',
            key: 'origin',
        },
        // {
        //     title: 'Mô tả',
        //     dataIndex: 'description',
        //     key: 'description',
        // },
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
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(_record.id)} >
                    Cập nhật
                </Button>
            ),
        },
        {
            title: 'Xóa',
            key: 'delete',
            render: (_text: any, _record: any) => (
                <Button
                    type="primary"
                    danger icon={<DeleteOutlined />}
                    className="bg-red-500"
                    onClick={() => handleDeleteBrand(_record.id)}>
                    Xóa
                </Button >
            ),
        },
    ];

    return (
        <div className="container mx-auto px-4 pb-8">
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
                        to="/admin/brands/create"
                        className="inline-flex items-center rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-700 hover:text-white"
                    >
                        <PlusOutlined className="mr-2" />
                        Thêm mới
                    </Link>
                </div>
            </div>

            <div className="overflow-x-auto">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <Spin size="large" />
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center">
                        <span className="text-red-500">{error}</span>
                    </div>
                ) : (
                    <Table columns={columns} dataSource={filteredBrands} rowKey="id" />
                )}
            </div>
        </div>
    );
};

export default BrandManagementPage;
