import React, { useState, useEffect } from 'react';
import { SearchOutlined, EyeOutlined, EllipsisOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Select, Button, Table, Tag, Space, Dropdown, Menu, Pagination } from 'antd';
import axios from 'axios';
import OrderDetailModal from './OrderDetailModal';

const { Option } = Select;

interface Order {
    orderId: string;
    orderDate: string;
    // customer: string;
    customer: {
        name: string,
        phone: string,
    },
    totalAmount: number;
    status: 'Waiting' | 'Preparing' | 'Prepared' | 'Shipping' | 'DeliveryFailed' | 'DeliverySuccessful' | 'Received' | 'Completed';
    type: 'Order' | 'Preorder';
    paymentMethod: 'Cash' | 'MoMo' | 'PayPal' | 'Credit Card' | 'VNPAY';
    paymentStatus: 'Paid' | 'Unpaid';
    recipient: {
        name: string,
        phone: string,
        address: string,
    },
    payment: {
        cash: string,
        vnpayQR: string,
        momo: string,
        paypal: string,
        subtotal: string,
        discount: string,
        shippingFee: string,
        coupon: string,
        points: string,
        total: string,
    },
    products: Product[]
}

interface Product {
    id: string;
    name: string;
    quantity: number;
    unitPrice: string;
    totalPrice: string;
    image: string;
    // image: string[];
  }

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Waiting':
            return 'yellow';
        case 'Preparing':
            return 'blue';
        case 'Prepared':
            return 'purple';
        case 'Shipping':
            return 'orange';
        case 'DeliveryFailed':
            return 'red';
        case 'DeliverySuccessful':
            return 'green';
        case 'Received':
            return 'cyan';
        case 'Completed':
            return 'green';
        default:
            return 'default';
    }
};

const getStatusVietnamese = (status: string) => {
    switch (status) {
        case 'Waiting':
            return 'Đang chờ';
        case 'Preparing':
            return 'Đang chuẩn bị hàng';
        case 'Prepared':
            return 'Đã chuẩn bị hàng';
        case 'Shipping':
            return 'Đang giao hàng';
        case 'DeliveryFailed':
            return 'Giao hàng thất bại';
        case 'ShippedAgain':
            return 'Giao hàng lại';
        case 'DeliverySuccessful':
            return 'Giao hàng thành công';
        case 'Received':
            return 'Đã nhận';
        case 'Completed':
            return 'Hoàn thành';
        default:
            return status;
    }
};

const nextStatuses = (currentStatus: string) => {
    switch (currentStatus) {
        case 'Waiting':
            return 'Preparing';
        case 'Preparing':
            return 'Prepared';
        case 'Prepared':
            return 'Shipping';
        case 'Shipping':
            return ['DeliverySuccessful', 'DeliveryFailed'];
        case 'DeliveryFailed':
            return 'ShippedAgain';
            case 'ShippedAgain':
                return 'Shipping';
        // case 'DeliverySuccessful':
        //     return 'Received';
            case 'DeliverySuccessful':
                return null;
        // case 'Received':
        //     return null;
        default:
            return null;
    }
};

interface ApiResponse {
    success: boolean;
    message: string;
    data: {
        totalItemsCount: number;
        pageSize: number;
        totalPagesCount: number;
        pageIndex: number;
        next: boolean;
        previous: boolean;
        items: Order[];
    };
}

const fetchOrders = async (keyword: string, status: string, pageIndex: number, pageSize: number): Promise<ApiResponse | undefined> => {
    const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    throw new Error('Access token not found.');
  }
    
    try {
        const response = await axios.get<ApiResponse>('https://localhost:44329/api/Account/GetAllOrderHistory', {
            params: {
                keyword,
                status,
                pageIndex,
                pageSize
            },
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'authorization': `Bearer ${accessToken}`
              }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch orders', error);
        return {
            success: false,
            message: 'Failed to fetch orders',
            data: {
                totalItemsCount: 0,
                pageSize: 0,
                totalPagesCount: 0,
                pageIndex: 0,
                next: false,
                previous: false,
                items: []
            }
        };
    }
    return undefined;
};

// const mockOrders: Order[] = [
//     {
//         orderId: 'O001',
//         orderDate: '2024-07-20',
//         customer: { name: 'John Doe', phone: '123456789' },
//         totalAmount: 120.5,
//         status: 'DeliveryFailed',
//         type: 'Order',
//         paymentMethod: 'Credit Card',
//         paymentStatus: 'Paid',
//         recipient: {
//             name: 'Diệu Linh',
//             phone: '0985123245',
//             address: 'Tầng 12, tòa PeakView, Số 36 Hoàng Cầu, phường Ô Chợ Dừa, Hà Nội',
//         },
//         payment: {
//             cash: '10.000.000 ₫',
//             vnpayQR: '6.000.000 ₫',
//             momo: '0 ₫',
//             paypal: '0 ₫',
//             subtotal: '16.000.000 ₫',
//             discount: '-30.000 ₫',
//             shippingFee: 'Miễn phí',
//             coupon: '-10.000 ₫',
//             points: '-20.000 ₫',
//             total: '15.400.000 ₫',
//         },
//         products: [
//             {
//                 id: '1',
//                 name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
//                 quantity: 2,
//                 unitPrice: '1.024.000 ₫',
//                 totalPrice: '2.048.000 ₫',
//                 image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
//             },
//             {
//                 id: '2',
//                 name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
//                 quantity: 2,
//                 unitPrice: '1.024.000 ₫',
//                 totalPrice: '2.048.000 ₫',
//                 image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
//             },
//             {
//                 id: '4',
//                 name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
//                 quantity: 2,
//                 unitPrice: '1.024.000 ₫',
//                 totalPrice: '2.048.000 ₫',
//                 image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
//             },
//             {
//                 id: '4',
//                 name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
//                 quantity: 2,
//                 unitPrice: '1.024.000 ₫',
//                 totalPrice: '2.048.000 ₫',
//                 image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
//             }
//         ],
//     },
//     {
//         orderId: 'O002',
//         orderDate: '2024-07-21',
//         customer: { name: 'Jane Smith', phone: '987654321' },
//         totalAmount: 75.0,
//         status: 'Completed',
//         type: 'Preorder',
//         paymentMethod: 'PayPal',
//         paymentStatus: 'Paid',
//         recipient: {
//             name: 'Diệu Linh',
//             phone: '0985123245',
//             address: 'Tầng 12, tòa PeakView, Số 36 Hoàng Cầu, phường Ô Chợ Dừa, Hà Nội',
//         },
//         payment: {
//             cash: '10.000.000 ₫',
//             vnpayQR: '6.000.000 ₫',
//             momo: '0 ₫',
//             paypal: '0 ₫',
//             subtotal: '16.000.000 ₫',
//             discount: '-30.000 ₫',
//             shippingFee: 'Miễn phí',
//             coupon: '-10.000 ₫',
//             points: '-20.000 ₫',
//             total: '15.400.000 ₫',
//         },
//         products: [
//             {
//                 id: '1',
//                 name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
//                 quantity: 2,
//                 unitPrice: '1.024.000 ₫',
//                 totalPrice: '2.048.000 ₫',
//                 image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
//             },
//             {
//                 id: '2',
//                 name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
//                 quantity: 2,
//                 unitPrice: '1.024.000 ₫',
//                 totalPrice: '2.048.000 ₫',
//                 image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
//             },
//             {
//                 id: '4',
//                 name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
//                 quantity: 2,
//                 unitPrice: '1.024.000 ₫',
//                 totalPrice: '2.048.000 ₫',
//                 image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
//             },
//             {
//                 id: '4',
//                 name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
//                 quantity: 2,
//                 unitPrice: '1.024.000 ₫',
//                 totalPrice: '2.048.000 ₫',
//                 image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
//             }
//         ],
//     },
//     // Add more mock orders as needed
// ];

// const fetchOrders = async (pageIndex: number, pageSize: number, searchTerm: string, filterStatus: string): Promise<Order[]> => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             const filteredOrders = mockOrders.filter(order =>
//                 (filterStatus === 'All' || order.status === filterStatus) &&
//                 (order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                     order.orderId.toLowerCase().includes(searchTerm.toLowerCase()))
//             );
//             resolve(filteredOrders.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize));
//         }, 1000);
//     });
// };
const updateOrderStatus = async (orderId: string, status: string): Promise<void> => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token not found.');
        }

        const response = await axios.put(
            `https://localhost:44329/api/Account/ChangeOrderStatus?orderId=${encodeURIComponent(orderId)}&status=${encodeURIComponent(status)}`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        if (response.data.success) {
            console.log('Order status updated successfully:', response.data.message);
        } else {
            console.error('Failed to update order status:', response.data.message);
        }
    } catch (error) {
        console.error('Error updating order status:', error);
    }
};



const OrderManagementPage: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'Waiting' | 'Preparing' | 'Prepared' | 'Shipping' | 'DeliveryFailed' | 'ShippedAgain' | 'DeliverySuccessful' | 'Received' | 'Completed' | 'All'>('All');
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [detailVisible, setDetailVisible] = useState(false);
    
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const data = await fetchOrders(pageIndex, pageSize, searchTerm, filterStatus);
    //         setOrders(data);
    //         setTotalItemsCount(mockOrders.length);
    //     };
    //     fetchData();
    // }, [searchTerm, filterStatus, pageIndex, pageSize]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchOrders(searchTerm, filterStatus, pageIndex, pageSize, );
            if (response.success) {
                setOrders(response.data.items);
                setTotalItemsCount(response.data.totalItemsCount);
            }
        };
        // fetchData();
        const interval = setInterval(fetchData, 1000); // Cập nhật mỗi 0 giây

      return () => clearInterval(interval);
    }, [searchTerm, filterStatus, pageIndex, pageSize]);

    const handlePageChange = (page: number, pageSize?: number) => {
        setPageIndex(page - 1); // Adjust for 0-based index
        if (pageSize) {
            setPageSize(pageSize);
        }
    };

    const showOrderDetailModal = (order: Order) => {
        setSelectedOrder(order);
        setDetailVisible(true);
    };

    const handleCancel = () => {
        setDetailVisible(false);
    };

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'orderDate',
            key: 'orderDate',
            // render: (text: string) => new Date(text).toLocaleDateString(),
            render: (text: string) => {
                try {
                    return new Date(text).toLocaleDateString('vi-VN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                } catch (error) {
                    console.error('Invalid date:', text);
                    return 'Invalid date'; // Or any other fallback text you prefer
                }
            }
            
        },
        {
            title: 'Khách hàng',
            dataIndex: 'customer',
            key: 'customer',
            render: (customer: { name: string; }) => `${customer.name}`,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (amount: number) => `${amount.toLocaleString()} ₫`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Tag color={getStatusColor(status)}>{getStatusVietnamese(status)}</Tag>
            ),
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            key: 'type',
            render: (type: string) => (type === 'Order' ? 'Đặt hàng' : 'Đặt trước'),
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            render: (method: string) => {
                switch (method) {
                    case 'CreditCard':
                        return 'Thẻ tín dụng';
                    case 'PayPal':
                        return 'PayPal';
                    case 'Cash':
                        return 'Tiền mặt';
                    default:
                        return method;
                }
            },
        },
        // {
        //     title: 'Thao tác',
        //     key: 'action',
        //     render: (text: any, record: Order) => (
        //         <Space size="middle" className="flex flex-col">
        //             <Button icon={<EyeOutlined />} onClick={() => showOrderDetailModal(record)}>
        //                 Chi tiết
        //             </Button>
        //             {record.status !== 'DeliverySuccessful' && record.status !== 'Received' && record.status !== 'Completed' && (
        //             <Button
        //                 onClick={async () => {
        //                     const newStatus = nextStatus(record.status);
        //                     if (newStatus) {
        //                         await updateOrderStatus(record.orderId, newStatus);
        //                         // Optionally refresh orders or update the status in state
        //                         const updatedOrders = orders.map(order =>
        //                             order.orderId === record.orderId ? { ...order, status: newStatus } : order
        //                         );
        //                         setOrders(updatedOrders);
        //                     }
        //                 }}
        //             >
        //                 {getStatusVietnamese(nextStatus(record.status) as string)}
        //             </Button>
        //         )}
        //         </Space>
        //     ),
        // }
        {
            title: 'Thao tác',
            key: 'action',
            render: (text: any, record: Order) => {
                const currentStatus = record.status;
                const possibleNextStatuses = nextStatuses(currentStatus);

                return (
                    <Space size="middle">
                        <Button icon={<EyeOutlined />} onClick={() => showOrderDetailModal(record)} />
                        {possibleNextStatuses && (
                            <Select
                                style={{ width: 150 }}
                                placeholder="Thay đổi trạng thái"
                                onChange={async (newStatus) => {
                                    if (newStatus) {
                                        await updateOrderStatus(record.orderId, newStatus);
                                        // Re-fetch data to reflect changes
                                        const response = await fetchOrders(searchTerm, filterStatus, pageIndex, pageSize);
                                        if (response?.success) {
                                            setOrders(response.data.items);
                                        }
                                    }
                                }}
                            >
                                {Array.isArray(possibleNextStatuses)
                                    ? possibleNextStatuses.map((status) => (
                                        <Option key={status} value={status}>
                                            {getStatusVietnamese(status)}
                                        </Option>
                                    ))
                                    : <Option key={possibleNextStatuses} value={possibleNextStatuses}>{getStatusVietnamese(possibleNextStatuses)}</Option>}
                            </Select>
                        )}
                    </Space>
                );
            },
        },
        
        
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">Quản lý Đơn hàng</h1>
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
                            onChange={(value) => setFilterStatus(value as any)}
                        >
                            <Option value="All">Tất cả</Option>
                            <Option value="Waiting">Đang chờ</Option>
                            <Option value="Preparing">Đang chuẩn bị</Option>
                            <Option value="Prepared">Đã chuẩn bị</Option>
                            <Option value="Shipping">Đang giao hàng</Option>
                            <Option value="DeliveryFailed">Giao hàng thất bại</Option>
                            <Option value="DeliverySuccessful">Giao hàng thành công</Option>
                            <Option value="Received">Đã nhận</Option>
                            <Option value="Completed">Hoàn thành</Option>
                        </Select>
                    </div>
                </div>
            </div>
            <Table columns={columns} dataSource={orders} rowKey="id" pagination={false} />
            <Pagination
                className="mt-10 flex justify-center"
                current={pageIndex + 1}
                pageSize={pageSize}
                total={totalItemsCount}
                onChange={handlePageChange}
                showSizeChanger
            />
            <OrderDetailModal
        visible={detailVisible}
        onCancel={handleCancel}
        order={selectedOrder}
      />
        </div>
    );
};


export default OrderManagementPage;