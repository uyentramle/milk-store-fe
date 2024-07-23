import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import SidebarMenu from './SidebarMenu';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

// const fakeOrderData = [
//     {
//         orderId: '22010124125521352',
//         orderDate: '2024-03-21',
//         totalAmount: 15400000,
//         status: 'Đã giao hàng',
//     },
//     {
//         orderId: '22010124125521353',
//         orderDate: '2023-08-25 14:54:45',
//         totalAmount: 15400000,
//         status: 'Đang giao hàng',
//     },
//     {
//         orderId: '22010124125521354',
//         orderDate: '2024-03-21',
//         totalAmount: 15400000,
//         status: 'Hoàn thành',
//     },
//     {
//         orderId: '22010124125521355',
//         orderDate: '2024-03-21',
//         totalAmount: 60450,
//         status: 'Chờ xác nhận hàng',
//     },
//     {
//         orderId: '22010124125521356',
//         orderDate: '2023-08-25 14:54:45',
//         totalAmount: 60450,
//         status: 'Đang chuẩn bị hàng',
//     },
// ];

// interface Order { để call api
//     orderId: string;
//     orderDate: string;
//     totalAmount: number;
//     status: string;
// }

// interface OrderDetail {
//     // Các chi tiết khác của đơn hàng
// }

interface Order {
    orderId: string;
    orderDate: string; // hoặc Date nếu muốn chuyển đổi thành đối tượng Date
    totalAmount: number;
    status: string;
}

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

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: string;
}

const fetchOrders = async (pageIndex: number, pageSize: number): Promise<ApiResponse | undefined> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        throw new Error('Access token not found.');
    }

    try {
        const decodedToken: any = jwtDecode(accessToken);
        const userId = decodedToken.userId;

        const response = await axios.get<ApiResponse>('https://localhost:44329/api/Account/GetOrderByUserId', {
            params: {
                userId,
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

const OrderHistoryPage: React.FC = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // // const [orders, setOrders] = useState<any[]>(fakeOrderData); // fake 
    // const [orders, setOrders] = useState<Order[]>([]);
    // const [selectedOrderId, setSelectedOrderId] = useState<string>('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrderId, setSelectedOrderId] = useState<string>('');
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [totalItemsCount, setTotalItemsCount] = useState(0);
    const [loading, setLoading] = useState(true); // Added loading state

    const navigate = useNavigate();

    const navigateToSignInPage = () => {
        navigate('/sign-in');
    };

    const handleLogout = () => {
        // Clear local items
        localStorage.removeItem('accessToken');
        // Redirect to sign-in page
        navigateToSignInPage();
    };
    // const accessToken = localStorage.getItem('accessToken');

    // if (!accessToken) {
    //     throw new Error('Access token not found.');
    // }

    // const decodedToken: any = jwtDecode(accessToken);
    // const userId = decodedToken.userId;

    // console.log('userId:', userId);
    // useEffect(() => {
    //     const fetchOrders = async () => {
    //         try {
    //             const response = await axios.get<ApiResponse>('https://localhost:44329/api/Account/GetOrderByUserId', {
    //                 params: {
    //                     userId: '394030ce-b1dd-473f-b525-6c4979c0ef99', 
    //                     pageIndex: 0,
    //                     pageSize: 10
    //                 },
    //                 headers: {
    //                     'accept': '*/*'
    //                 }
    //             });
    //             if (response.data.success) {
    //                 setOrders(response.data.data.items);
    //             } else {
    //                 console.error('Failed to fetch orders:', response.data.message);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching orders:', error);
    //         }
    //     };

    //     fetchOrders();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchOrders(pageIndex, pageSize);
            if (response?.success) {
                setOrders(response.data.items);
                setTotalItemsCount(response.data.totalItemsCount);
                setLoading(false); // Set loading to false after data fetching
            }
        };
        // fetchData();
        const interval = setInterval(fetchData, 1000); // Cập nhật mỗi 0 giây

        return () => clearInterval(interval);
    }, [pageIndex, pageSize]);

    const openModal = (orderId: string) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrderId('');
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Spin size="large" />
                <span className="ml-4">Đang tải dữ liệu...</span>
            </div>
        );
    }

    return (
        <div className="container mx-auto w-4/5 p-4 pt-10">
            <div className="flex flex-col gap-10 lg:flex-row">
                {' '}
                <SidebarMenu onLogout={handleLogout} />
                <div className="w-full lg:flex-1">
                    <div className="rounded bg-white p-4 shadow">
                        <div className="mb-4">
                            <nav className="mb-4 flex">
                                <b className="inline-flex items-center rounded-t border-l border-r border-t border-pink-500 px-4 py-2 pb-1.5 text-pink-500">
                                    <span className="mr-2">Danh sách đơn hàng</span>
                                </b>
                                <div className="flex-grow border-b border-pink-500"></div>
                            </nav>
                            <div className="tab-content">
                                <div className="container">
                                    <table className="w-full table-auto text-center">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="py-2 text-center">Mã đơn hàng</th>
                                                <th className="py-2 text-center">Ngày đặt hàng</th>
                                                <th className="py-2 text-center">Tổng tiền</th>
                                                <th className="py-2 text-center">Trạng thái</th>
                                                <th className="py-2 text-center">Hành động</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {orders.map((order) => (
                                                <tr key={order.orderId} className="bg-gray-50">
                                                    <td className="py-2 text-center">{order.orderId}</td>
                                                    {/* <td className="py-2 text-center">{order.orderDate}</td> */}
                                                    <td className="py-2 text-center">
                                                        {new Date(order.orderDate).toLocaleDateString('vi-VN', {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric'
                                                        })}
                                                    </td>
                                                    {/* <td className="py-2 text-center">{order.totalAmount.toLocaleString()} ₫</td> */}
                                                    <td className="py-2 text-center">
                                                        {new Intl.NumberFormat('vi-VN', {
                                                            style: 'currency',
                                                            currency: 'VND'
                                                        }).format(order.totalAmount)}
                                                    </td>

                                                    <td className="py-2 text-center">
                                                        <span className={`rounded-full px-3 py-1 text-xs ${getStatusColor(order.status)}`}>
                                                            {getStatusVietnamese(order.status)}
                                                        </span>
                                                    </td>
                                                    <td className="py-2 text-center">
                                                        <button
                                                            className="rounded-md bg-gray-400 px-3 py-1 text-xs text-white shadow-md transition-colors duration-300 hover:bg-gray-500"
                                                            onClick={() => openModal(order.orderId)}
                                                        >
                                                            Chi tiết
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Đặt OrderModal tại đây */}
            <OrderDetailModal isOpen={isModalOpen} onClose={closeModal} orderId={selectedOrderId} />
        </div>
    );
};

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Waiting':
            return 'bg-yellow-500 text-white';  // Adjust color as needed
        case 'Preparing':
            return 'bg-blue-500 text-white';   // Adjust color as needed
        case 'Prepared':
            return 'bg-purple-500 text-white'; // Adjust color as needed
        case 'Shipping':
            return 'bg-orange-500 text-white'; // Adjust color as needed
        case 'DeliveryFailed':
            return 'bg-red-500 text-white';    // Adjust color as needed
        case 'ShippedAgain':
            return 'bg-yellow-700 text-white'; // Adjust color as needed
        case 'DeliverySuccessful':
            return 'bg-green-500 text-white';  // Adjust color as needed
        case 'Received':
            return 'bg-cyan-500 text-white';   // Adjust color as needed
        case 'Completed':
            return 'bg-green-300 text-green-800';   // Adjust color as needed
        default:
            return 'bg-gray-300 text-gray-800'; // Default color
    }
};

const getStatusVietnamese = (status: string) => {
    switch (status) {
        case 'Waiting':
            return 'Đang chờ xác nhận';
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
            return 'Đã nhận được hàng';
        case 'Completed':
            return 'Hoàn thành';
        default:
            return status;
    }
};

// Helper function to determine status color
// const getStatusColor = (status: string | undefined) => {
//     switch (status) {
//         case 'Đã giao hàng':
//             return 'bg-blue-300 text-blue-800';
//         case 'Đang giao hàng':
//             return 'bg-yellow-200 text-yellow-800';
//         case 'Hoàn thành':
//             return 'bg-green-300 text-green-800';
//         case 'Chờ xác nhận hàng':
//             return 'bg-yellow-100 text-yellow-800';
//         default:
//             return 'bg-gray-300 text-gray-800';
//     }
// };

export default OrderHistoryPage;

interface OrderDetailResponse {
    success: boolean;
    message: string;
    data: OrderDetail;
}

interface OrderDetail {
    orderId: string;
    orderDate: string;
    status: string;
    customer: {
        name: string;
        phone: string;
    };
    recipient: {
        name: string;
        phone: string;
        address: string;
    };
    payment: {
        cash: string;
        vnpayQR: number;
        momo: string;
        paypal: string;
        subtotal: number;
        discount: number;
        shippingFee: string;
        coupon: string;
        points: string;
        total: number;
    };
    products: Array<{
        id: string;
        name: string;
        quantity: number;
        unitPrice: number;
        totalPrice: number;
        image: string;
    }>;
}

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

// Order Detail Modal
const OrderDetailModal: React.FC<OrderModalProps> = ({ isOpen, onClose, orderId }) => {
    // State for controlling the modal animation
    const [modalClass, setModalClass] = useState('');
    const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);

    // useEffect(() => {
    //     // Add or remove transition class based on modal state
    //     setModalClass(
    //         isOpen
    //             ? 'translate-y-0 transition-all duration-500 ease-in-out'
    //             : '-translate-y-full transition-all duration-500 ease-in-out',
    //     );
    // }, [isOpen, orderId]);

    useEffect(() => {
        setModalClass(
            isOpen
                ? 'translate-y-0 transition-all duration-500 ease-in-out'
                : '-translate-y-full transition-all duration-500 ease-in-out',
        );

        if (isOpen && orderId) {
            fetchOrderDetail(orderId);
        }
    }, [isOpen, orderId]);

    // Function to handle Escape key press
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    // // Function to format currency
    // const formatCurrency = (amount: number) => {
    //     return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    // };

    // useEffect(() => {
    //     if (orderId && isOpen) {
    //         setLoading(true);
    //         axios.get(`https://localhost:44329/api/Account/GetOrderById?orderId=${orderId}`)
    //             .then(response => {
    //                 setOrderDetail(response.data);
    //                 setLoading(false);
    //             })
    //             .catch(error => {
    //                 setError(error.message);
    //                 setLoading(false);
    //             });
    //     }
    // }, [orderId, isOpen]);

    const fetchOrderDetail = async (orderId: string) => {
        try {
            const response = await axios.get<OrderDetailResponse>(`https://localhost:44329/api/Account/GetOrderById`, {
                params: { orderId },
            });
            setOrderDetail(response.data.data);
            // console.log('Order detail:', orderDetail);
            // console.log('Order detail:', orderDetail?.orderId);
        } catch (error) {
            console.error('Failed to fetch order details:', error);
        }
    };

    // const canReturnOrder = () => {
    //     // Example condition: return true if status is 'Hoàn thành' and it's within 7 days from order date
    //     if (fakeOrderDetail.status === 'Hoàn thành') {
    //         // Calculate days between order date and current date
    //         const orderDate = new Date(fakeOrderDetail.orderDate);
    //         const currentDate = new Date();
    //         const timeDiff = currentDate.getTime() - orderDate.getTime();
    //         const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    //         // Return true if within 7 days
    //         return daysDiff <= 7;
    //     }
    //     return false;
    // };

    const canReturnOrder = () => {
        if (orderDetail && orderDetail.status === 'Received') {
            const orderDate = new Date(orderDetail.orderDate);
            const currentDate = new Date();
            const timeDiff = currentDate.getTime() - orderDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            return daysDiff <= 7;
        }
        return false;
    };

    const handleMarkAsReceived = async () => {
        if (orderDetail) {
            await updateOrderStatus(orderId, 'Received');
            fetchOrderDetail(orderId); // Refresh order details
        }
    };

    const handleMarkAsCompleted = async () => {
        if (orderDetail) {
            await updateOrderStatus(orderId, 'Completed');
            fetchOrderDetail(orderId); // Refresh order details
        }
    };

    // Fake data for OrderDetail
    // const fakeOrderDetail = {
    //     orderId: '22010124125521352',
    //     orderDate: '2024-07-10',
    //     status: 'Hoàn thành',
    //     customer: {
    //         name: 'Phạm Võ Minh T',
    //         phone: '0985123245',
    //     },
    //     recipient: {
    //         name: 'Diệu Linh',
    //         phone: '0985123245',
    //         address: 'Tầng 12, tòa PeakView, Số 36 Hoàng Cầu, phường Ô Chợ Dừa, Hà Nội',
    //     },
    //     payment: {
    //         cash: '10.000.000 ₫',
    //         vnpayQR: '6.000.000 ₫',
    //         momo: '0 ₫',
    //         paypal: '0 ₫',
    //         subtotal: '16.000.000 ₫',
    //         discount: '-30.000 ₫',
    //         shippingFee: 'Miễn phí',
    //         coupon: '-10.000 ₫',
    //         points: '-20.000 ₫',
    //         total: '15.400.000 ₫',
    //     },
    //     products: [
    //         {
    //             id: '1',
    //             name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
    //             quantity: 2,
    //             unitPrice: '1.024.000 ₫',
    //             totalPrice: '2.048.000 ₫',
    //             image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
    //         },
    //         {
    //             id: '2',
    //             name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
    //             quantity: 2,
    //             unitPrice: '1.024.000 ₫',
    //             totalPrice: '2.048.000 ₫',
    //             image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
    //         },
    //         {
    //             id: '4',
    //             name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
    //             quantity: 2,
    //             unitPrice: '1.024.000 ₫',
    //             totalPrice: '2.048.000 ₫',
    //             image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
    //         },
    //         {
    //             id: '4',
    //             name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
    //             quantity: 2,
    //             unitPrice: '1.024.000 ₫',
    //             totalPrice: '2.048.000 ₫',
    //             image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
    //         }
    //     ],
    // };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'
                }`}
        >
            {/* max-w-[60rem] */}
            <div className={`w-full max-w-screen-lg rounded bg-white p-4 shadow-lg ${modalClass}`}>
                <div className="modal-content">
                    <div className="modal-header text-black">
                        <h5 className="modal-title mb-2 text-center text-xl font-bold">
                            Chi tiết đơn hàng
                        </h5>
                    </div>
                    <div className="modal-body flex text-sm">
                        {/* Left side: Thông tin đơn hàng & Chi tiết sản phẩm */}
                        <div className="w-full md:w-2/3">
                            <div className="mb-4 flex justify-between rounded bg-gray-100 p-4">
                                <div>
                                    <p className="font-bold">
                                        Đơn hàng:{' '}
                                        <span className="font-normal">{orderDetail?.orderId}</span>
                                    </p>
                                    <p className="font-bold">
                                        Ngày đặt hàng: <span className="font-normal">
                                            {orderDetail?.orderDate
                                                ? new Date(orderDetail.orderDate).toLocaleDateString('vi-VN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                                : 'Ngày không xác định'}
                                        </span>
                                    </p>

                                </div>
                                <p className="font-bold">
                                    Trạng thái:{' '}
                                    <span className={`rounded-full px-2 py-1 font-normal ${getStatusColor(orderDetail?.status ?? 'unknown')}`}>
                                        {getStatusVietnamese(orderDetail?.status ?? 'unknown')}
                                    </span>
                                </p>

                            </div>
                            <div className="flex flex-col gap-2 lg:flex-row">
                                <div className="mb-4 rounded bg-gray-100 p-4">
                                    <h6 className="mb-4 w-full font-semibold text-primary">
                                        KHÁCH HÀNG
                                    </h6>
                                    <p className="mb-2 whitespace-nowrap">
                                        Tên: <span className="font-semibold">{orderDetail?.customer?.name}</span>
                                    </p>
                                    <p className="mb-2 whitespace-nowrap">
                                        Số điện thoại:{' '}
                                        <span className="font-semibold">{orderDetail?.customer?.phone}</span>
                                    </p>
                                </div>
                                {/* <div className="border rounded mb-4">
  <h6 className="bg-gray-100 border-b text-primary p-2 mb-4 rounded-t font-bold">KHÁCH HÀNG</h6>
  <div className="bg-white p-2">
    <p className="mb-2 whitespace-nowrap">
      Tên: <span className="font-semibold">Nguyễn Minh Hoàng Phương</span>
    </p>
    <p className="mb-2">
      Số điện thoại: <span className="font-semibold">0985123245</span>
    </p>
  </div>
                                    </div> */}
                                <div className="mb-4 w-full rounded bg-gray-100 p-4">
                                    <h6 className="mb-4 font-semibold text-primary">NGƯỜI NHẬN</h6>
                                    <p className="mb-2">
                                        Tên: <span className="font-semibold">{orderDetail?.recipient?.name}</span>
                                    </p>
                                    <p className="mb-2">
                                        Số điện thoại:{' '}
                                        <span className="font-semibold">{orderDetail?.recipient?.phone}</span>
                                    </p>
                                    <p className="mb-2">
                                        Địa chỉ:{' '}
                                        <span className="font-semibold">
                                            {orderDetail?.recipient?.address}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h6 className="mb-2 font-semibold text-primary">
                                    CHI TIẾT SẢN PHẨM
                                </h6>
                                <div className="overflow-x-auto">
                                    <div className="max-h-48 overflow-y-auto">
                                        <table className="min-w-full border border-gray-200 bg-white">
                                            <thead className="border-b border-gray-200 bg-gray-100">
                                                <tr>
                                                    <th className="px-4 py-2 text-center">Ảnh</th>
                                                    <th className="px-4 py-2 text-center">
                                                        Tên sản phẩm
                                                    </th>
                                                    <th className="whitespace-nowrap px-4 py-2 text-center">
                                                        Số lượng
                                                    </th>
                                                    <th className="px-4 py-2 text-center">
                                                        Đơn giá
                                                    </th>
                                                    <th className="px-4 py-2 text-center">
                                                        Tổng tiền
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody className="text-gray-700">
                                                {orderDetail?.products?.map((product) => (
                                                    <tr key={product.id}>
                                                        <td className="px-4 py-2">
                                                            <img
                                                                src={product.image}
                                                                alt="Ảnh sản phẩm"
                                                                className="h-8 w-8 rounded-full"
                                                            />
                                                        </td>
                                                        <td className="px-4 py-2 text-center">{product.name}</td>
                                                        <td className="px-4 py-2 text-center">{product.quantity}</td>
                                                        {/* <td className="whitespace-nowrap px-4 py-2 text-center">
                                                            {product.unitPrice}
                                                        </td>
                                                        <td className="whitespace-nowrap px-4 py-2 text-center">
                                                            {product.totalPrice}
                                                        </td> */}
                                                        <td className="whitespace-nowrap px-4 py-2 text-center">
                                                            {new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            }).format(product.unitPrice)}
                                                        </td>
                                                        <td className="whitespace-nowrap px-4 py-2 text-center">
                                                            {new Intl.NumberFormat('vi-VN', {
                                                                style: 'currency',
                                                                currency: 'VND'
                                                            }).format(product.totalPrice)}
                                                        </td>

                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right side: Phương thức thanh toán */}
                        <div className="w-full pl-4 md:w-1/3">
                            <div className="mb-4 rounded bg-gray-100 p-4">
                                <h6 className="mb-4 font-semibold text-primary">
                                    PHƯƠNG THỨC THANH TOÁN
                                </h6>
                                <p className="mb-2 flex justify-between">
                                    Tiền mặt: <span className="font-semibold">{orderDetail?.payment?.cash}</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    VnpayQR: <span className="font-semibold">{orderDetail?.payment?.vnpayQR.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    MoMo: <span className="font-semibold">{orderDetail?.payment?.momo}</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    PayPal: <span className="font-semibold">{orderDetail?.payment?.paypal}</span>
                                </p>
                            </div>
                            <div className="mb-4 rounded bg-gray-100 p-4">
                                <h6 className="mb-4 font-semibold text-primary">THANH TOÁN</h6>
                                <p className="mb-2 flex justify-between">
                                    Tạm tính:{' '}
                                    {/* <span className="font-semibold">{orderDetail?.payment?.subtotal}</span> */}
                                    <span className="font-semibold">{orderDetail?.payment?.subtotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    Khuyến mãi:{' '}
                                    {/* <span className="font-semibold">{orderDetail?.payment?.discount}</span> */}
                                    <span className="font-semibold">{orderDetail?.payment?.discount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    Phí vận chuyển:{' '}
                                    <span className="font-semibold">{orderDetail?.payment?.shippingFee}</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    Mã giảm giá:{' '}
                                    <span className="font-semibold">{orderDetail?.payment?.coupon}</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    Dùng điểm:{' '}
                                    <span className="font-semibold">{orderDetail?.payment?.points} ₫</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    Cần thanh toán:{' '}
                                    {/* <span className="font-semibold text-red-500">{orderDetail?.payment?.total}</span> */}
                                    <span className="font-semibold">{orderDetail?.payment?.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                                </p>
                            </div>
                            <div className="modal-footer flex justify-end gap-2">
                                {orderDetail?.status === 'DeliverySuccessful' && (
                                    <button
                                        type="button"
                                        className="rounded border border-pink-500 px-2 py-1 text-sm text-pink-500 transition-colors duration-300 hover:bg-pink-600 hover:text-white"
                                        onClick={handleMarkAsReceived}
                                    >
                                        Đã nhận được hàng
                                    </button>
                                )}
                                {orderDetail?.status === 'Received' && (
                                    <button
                                        type="button"
                                        className="rounded border border-pink-500 px-2 py-1 text-sm text-pink-500 transition-colors duration-300 hover:bg-pink-600 hover:text-white"
                                        onClick={handleMarkAsCompleted}
                                    >
                                        Hoàn thành
                                    </button>
                                )}
                                {canReturnOrder() && (
                                    <button
                                        type="button"
                                        className="rounded border border-pink-500 px-2 py-1 text-sm text-pink-500 transition-colors duration-300 hover:bg-pink-600 hover:text-white"
                                    >
                                        Hoàn trả
                                    </button>
                                )}
                                <button
                                    type="button"
                                    className="rounded bg-pink-500 px-2 py-1 text-sm text-white transition-colors duration-300 hover:bg-pink-600"
                                    onClick={onClose}
                                >
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
