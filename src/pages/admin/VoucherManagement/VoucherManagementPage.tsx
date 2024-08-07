import React, { useState, useEffect } from 'react';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Table, Select, Spin, Modal, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';

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
    status: "Active" | "Expired" | "Used" | "Disabled";
}

const VoucherManagementPage: React.FC = () => {
    const [vouchers, setVouchers] = useState<Voucher[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'Active' | 'Expired' | 'Used' | 'All'>('All');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // const accessToken = localStorage.getItem('accessToken');
    // const decodedToken: { userId: string } = jwtDecode(accessToken as string);
    
    const navigate = useNavigate();

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

        const fetchVouchers = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get('https://localhost:44329/api/Voucher/GetVouchers?pageIndex=0&pageSize=10', {
                    headers: {
                        'Authorization': 'Bearer 916ddd3c-8263-4bab-a7b2-5b50c7fd9458' // Replace by token from local storage
                    }
                });
                const fetchedVouchers = response.data.data.items;
                setVouchers(fetchedVouchers);
            } catch (error) {
                console.error('Lỗi tìm nạp vouchers từ port 44329:', error);
                try {
                    const fallbackResponse = await axios.get('https://localhost:7251/api/Voucher/GetVouchers?pageIndex=0&pageSize=10', {
                        headers: {
                            'Authorization': 'Bearer 916ddd3c-8263-4bab-a7b2-5b50c7fd9458' // Replace by token from local storage
                        }
                    });
                    const fetchedVouchers = fallbackResponse.data.data.items;
                    setVouchers(fetchedVouchers);
                } catch (fallbackError) {
                    console.error('Lỗi tìm nạp vouchers từ port 7251:', fallbackError);
                    setError('Không thể lấy vouchers từ cả hai ports.');
                }
                // } catch (error) {
                //     console.error('Lỗi tìm nạp vouchers:', error);
                //     setError('Không thể lấy vouchers.');
                // } finally {
                //     setLoading(false);
                // }
            } finally {
                setLoading(false);
            }
        };

        fetchVouchers();
    }, []);

    const handleDelete = async (id: number) => {
        Modal.confirm({
            title: 'Bạn có chắc muốn xóa voucher này không?',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            onOk: async () => {
                try {
                    await axios.delete(`https://localhost:44329/api/Voucher/DeleteVoucher?id=${id}`, {
                        headers: {
                            'Authorization': 'Bearer 916ddd3c-8263-4bab-a7b2-5b50c7fd9458' // Replace by token from local storage
                        }
                    });
                    setVouchers((prevVouchers) => prevVouchers.filter((voucher) => voucher.id !== id));
                    message.success('Voucher đã xóa thành công.');
                } catch (error) {
                    console.error('Lỗi xóa voucher từ port 44329:', error);
                    try {
                        await axios.delete(`https://localhost:7251/api/Voucher/DeleteVoucher?id=${id}`, {
                            headers: {
                                'Authorization': 'Bearer 916ddd3c-8263-4bab-a7b2-5b50c7fd9458' // Replace by token from local storage
                            }
                        });
                        setVouchers((prevVouchers) => prevVouchers.filter((voucher) => voucher.id !== id));
                        message.success('Voucher đã xóa thành công.');
                    } catch (fallbackError) {
                        console.error('Lỗi xóa voucher từ port 7251:', fallbackError);
                        message.error('Không thể xóa voucher từ cả hai ports.');
                    }
                }
            },
        });
    };

    const handleEdit = (id: number) => {
        // navigate(`/admin/vouchers/update/voucherId=${id}`);
        navigate(`#`);

    };

    const filteredVouchers = vouchers.filter((v) => {
        const matchesSearch = `${v.code} ${v.description}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesStatus =
            filterStatus === 'All' || filterStatus === v.status;
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
                <Button
                    type="primary"
                    icon={<EditOutlined />}
                    className="bg-blue-500"
                    onClick={() => handleEdit(_record.id)}
                >
                    Cập nhật
                </Button>
            ),
        },
        {
            title: 'Xóa',
            key: 'delete',
            render: (_text: any, _record: Voucher) => (
                <Button
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    className="bg-red-500"
                    onClick={() => handleDelete(_record.id)}
                >
                    Xóa
                </Button>
            ),
        },
    ];

    return (
        <div className="container mx-auto px-4 pb-8">
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
                    <Table columns={columns} dataSource={filteredVouchers} rowKey="id" />
                )}
            </div>
        </div>
    );
};

export default VoucherManagementPage;
