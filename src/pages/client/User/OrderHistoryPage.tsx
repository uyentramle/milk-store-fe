import React, { useState, useEffect } from 'react';
import {
    UserOutlined,
    SettingOutlined,
    EnvironmentOutlined,
    FileTextOutlined,
    RetweetOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

const fakeOrderData = [
    {
        id: '1',
        orderNumber: '22010124125521352',
        orderDate: '2024-03-21',
        totalAmount: 15400000,
        status: 'Đã giao hàng',
    },
    {
        id: '2',
        orderNumber: '22010124125521353',
        orderDate: '2023-08-25 14:54:45',
        totalAmount: 15400000,
        status: 'Đang giao hàng',
    },
    {
        id: '3',
        orderNumber: '22010124125521354',
        orderDate: '2024-03-21',
        totalAmount: 15400000,
        status: 'Hoàn thành',
    },
    {
        id: '4',
        orderNumber: '22010124125521355',
        orderDate: '2024-03-21',
        totalAmount: 60450,
        status: 'Chờ xác nhận hàng',
    },
    {
        id: '5',
        orderNumber: '22010124125521356',
        orderDate: '2023-08-25 14:54:45',
        totalAmount: 60450,
        status: 'Đang chuẩn bị hàng',
    },
];

// interface Order { để call api
//     orderId: string;
//     orderDate: string;
//     totalAmount: number;
//     status: string;
// }

// interface OrderDetail {
//     // Các chi tiết khác của đơn hàng
// }

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: string;
}

const OrderHistoryPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [orders, setOrders] = useState<any[]>(fakeOrderData); // fake data
    const [selectedOrderId, setSelectedOrderId] = useState<string>('');


    const openModal = (orderId: string) => {
        setSelectedOrderId(orderId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedOrderId('');
    };

    return (
        <div className="container mx-auto w-4/5 p-4 pt-10">
            <div className="flex flex-col gap-10 lg:flex-row">
                {' '}
                {/* Thêm lớp gap-4 */}
                <div className="mb-4 w-full lg:mb-0 lg:w-1/4">
                    <div className="rounded bg-white p-4 shadow">
                        <nav className="space-y-2">
                            <a
                                href="/user-profile"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                {/* <i className="fa-solid fa-user mr-2"></i> */}
                                <UserOutlined className="mr-2" />
                                <span>Thông tin tài khoản</span>
                            </a>
                            <a
                                href="/account-settings"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                {/* <i className="fa-solid fa-location-dot mr-2"></i> */}
                                <SettingOutlined className="mr-2" />
                                <span>Thiết lập tài khoản</span>
                            </a>
                            <a
                                href="/user-address"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                {/* <i className="fa-solid fa-location-dot mr-2"></i> */}
                                <EnvironmentOutlined className="mr-2" />
                                <span>Quản lí địa chỉ</span>
                            </a>
                            <a
                                href="/order-history"
                                className="flex items-center rounded bg-pink-500 p-2 text-white"
                            >
                                {/* <i className="fa-solid fa-file-lines mr-2"></i> */}
                                <FileTextOutlined className="mr-2" />
                                <b>Lịch sử đơn hàng</b>
                            </a>
                            <a
                                href="/change-password"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                {/* <i className="fa-solid fa-retweet fa-sm mr-2"></i> */}
                                <RetweetOutlined className="mr-2" />
                                <span>Đổi mật khẩu</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                {/* <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i> */}
                                <LogoutOutlined className="mr-2" />
                                <span>Đăng xuất</span>
                            </a>
                        </nav>
                    </div>
                </div>
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
                                                <tr key={order.id} className="bg-gray-50">
                                                    <td className="py-2 text-center">{order.orderNumber}</td>
                                                    <td className="py-2 text-center">{order.orderDate}</td>
                                                    <td className="py-2 text-center">{order.totalAmount.toLocaleString()} ₫</td>
                                                    <td className="py-2 text-center">
                                                        <span className={`rounded-full px-3 py-1 text-xs ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-2 text-center">
                                                        <button
                                                            className="rounded-md bg-gray-400 px-3 py-1 text-xs text-white shadow-md transition-colors duration-300 hover:bg-gray-500"
                                                            onClick={() => openModal(order.id)}
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
            <OrderDetailModal isOpen={isModalOpen} onClose={closeModal} orderId={selectedOrderId}/>
        </div>
    );
};

// Helper function to determine status color
const getStatusColor = (status: string) => {
    switch (status) {
        case 'Đã giao hàng':
            return 'bg-blue-300 text-blue-800';
        case 'Đang giao hàng':
            return 'bg-yellow-200 text-yellow-800';
        case 'Hoàn thành':
            return 'bg-green-300 text-green-800';
        case 'Chờ xác nhận hàng':
            return 'bg-yellow-100 text-yellow-800';
        default:
            return 'bg-gray-300 text-gray-800';
    }
};

export default OrderHistoryPage;

// Order Detail Modal
const OrderDetailModal: React.FC<OrderModalProps> = ({ isOpen, onClose, orderId }) => {
    // State for controlling the modal animation
    const [modalClass, setModalClass] = useState('');

    useEffect(() => {
        // Add or remove transition class based on modal state
        setModalClass(
            isOpen
                ? 'translate-y-0 transition-all duration-500 ease-in-out'
                : '-translate-y-full transition-all duration-500 ease-in-out',
        );
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

    const canReturnOrder = () => {
        // Example condition: return true if status is 'Hoàn thành' and it's within 7 days from order date
        if (fakeOrderDetail.status === 'Hoàn thành') {
            // Calculate days between order date and current date
            const orderDate = new Date(fakeOrderDetail.orderDate);
            const currentDate = new Date();
            const timeDiff = currentDate.getTime() - orderDate.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

            // Return true if within 7 days
            return daysDiff <= 7;
        }
        return false;
    };

    // Fake data for OrderDetail
    const fakeOrderDetail = {
        orderId: '22010124125521352',
        orderDate: '2024-07-10',
        status: 'Hoàn thành',
        customer: {
            name: 'Phạm Võ Minh T',
            phone: '0985123245',
        },
        recipient: {
            name: 'Diệu Linh',
            phone: '0985123245',
            address: 'Tầng 12, tòa PeakView, Số 36 Hoàng Cầu, phường Ô Chợ Dừa, Hà Nội',
        },
        payment: {
            cash: '10.000.000 ₫',
            vnpayQR: '6.000.000 ₫',
            momo: '0 ₫',
            paypal: '0 ₫',
            subtotal: '16.000.000 ₫',
            discount: '-30.000 ₫',
            shippingFee: 'Miễn phí',
            coupon: '-10.000 ₫',
            points: '-20.000 ₫',
            total: '15.400.000 ₫',
        },
        products: [
            {
                id: '1',
                name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
                quantity: 2,
                unitPrice: '1.024.000 ₫',
                totalPrice: '2.048.000 ₫',
                image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
            },
            {
                id: '2',
                name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
                quantity: 2,
                unitPrice: '1.024.000 ₫',
                totalPrice: '2.048.000 ₫',
                image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
            },
            {
                id: '4',
                name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
                quantity: 2,
                unitPrice: '1.024.000 ₫',
                totalPrice: '2.048.000 ₫',
                image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
            },
            {
                id: '4',
                name: 'Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng',
                quantity: 2,
                unitPrice: '1.024.000 ₫',
                totalPrice: '2.048.000 ₫',
                image: 'https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg',
            }
        ],
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
                isOpen ? '' : 'hidden'
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
                                        <span className="font-normal">{fakeOrderDetail.orderId}</span>
                                    </p>
                                    <p className="font-bold">
                                        Ngày đặt hàng:{' '}
                                        <span className="font-normal">{fakeOrderDetail.orderDate}</span>
                                    </p>
                                </div>
                                <p className="font-bold">
                                    Trạng thái:{' '}
                                    <span className={`rounded-full px-2 py-1 font-normal ${getStatusColor(fakeOrderDetail.status)}`}>
        {fakeOrderDetail.status}
    </span>
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 lg:flex-row">
                                <div className="mb-4 rounded bg-gray-100 p-4">
                                    <h6 className="mb-4 w-full font-semibold text-primary">
                                        KHÁCH HÀNG
                                    </h6>
                                    <p className="mb-2 whitespace-nowrap">
                                        Tên: <span className="font-semibold">{fakeOrderDetail.customer.name}</span>
                                    </p>
                                    <p className="mb-2 whitespace-nowrap">
                                        Số điện thoại:{' '}
                                        <span className="font-semibold">{fakeOrderDetail.customer.phone}</span>
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
                                        Tên: <span className="font-semibold">{fakeOrderDetail.recipient.name}</span>
                                    </p>
                                    <p className="mb-2">
                                        Số điện thoại:{' '}
                                        <span className="font-semibold">{fakeOrderDetail.recipient.phone}</span>
                                    </p>
                                    <p className="mb-2">
                                        Địa chỉ:{' '}
                                        <span className="font-semibold">
                                            {fakeOrderDetail.recipient.address}
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
                                            {fakeOrderDetail.products.map((product) => (
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
                                                        <td className="whitespace-nowrap px-4 py-2 text-center">
                                                            {product.unitPrice}
                                                        </td>
                                                        <td className="whitespace-nowrap px-4 py-2 text-center">
                                                            {product.totalPrice}
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
                                    Tiền mặt: <span className="font-semibold">{fakeOrderDetail.payment.cash}</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    VnpayQR: <span className="font-semibold">{fakeOrderDetail.payment.vnpayQR}</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    MoMo: <span className="font-semibold">{fakeOrderDetail.payment.momo}</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    PayPal: <span className="font-semibold">{fakeOrderDetail.payment.paypal}</span>
                                </p>
                            </div>
                            <div className="mb-4 rounded bg-gray-100 p-4">
                                <h6 className="mb-4 font-semibold text-primary">THANH TOÁN</h6>
                                <p className="mb-2 flex justify-between">
                                    Tạm tính:{' '}
                                    <span className="font-semibold">{fakeOrderDetail.payment.subtotal}</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    Khuyến mãi:{' '}
                                    <span className="font-semibold">{fakeOrderDetail.payment.discount}</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    Phí vận chuyển:{' '}
                                    <span className="font-semibold">{fakeOrderDetail.payment.shippingFee}</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    Mã giảm giá:{' '}
                                    <span className="font-semibold">{fakeOrderDetail.payment.coupon}</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    Dùng điểm:{' '}
                                    <span className="font-semibold">{fakeOrderDetail.payment.points}</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    Cần thanh toán:{' '}
                                    <span className="font-semibold text-red-500">{fakeOrderDetail.payment.total}</span>
                                </p>
                            </div>
                            <div className="modal-footer flex justify-end gap-2">
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
