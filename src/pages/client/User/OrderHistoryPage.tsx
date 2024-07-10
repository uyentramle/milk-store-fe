import React, { useState, useEffect } from 'react';
import {
    UserOutlined,
    EnvironmentOutlined,
    FileTextOutlined,
    RetweetOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const OrderHistoryPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                                            <tr className="bg-gray-50">
                                                <td className="py-2 text-center">
                                                    22010124125521352
                                                </td>
                                                <td className="py-2 text-center">Mar 21</td>
                                                <td className="py-2 text-center">15.400.000 ₫</td>
                                                <td className="py-2 text-center">
                                                    <span className="rounded-full bg-blue-300 px-3 py-1 text-xs text-blue-800">
                                                        Đã giao hàng
                                                    </span>
                                                </td>
                                                <td className="py-2 text-center">
                                                    <button
                                                        className="rounded-md bg-gray-400 px-3 py-1 text-xs text-white shadow-md transition-colors duration-300 hover:bg-gray-500"
                                                        onClick={openModal}
                                                    >
                                                        Chi tiết
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="bg-white">
                                                <td className="py-2 text-center">
                                                    22010124125521352
                                                </td>
                                                <td className="py-2 text-center">
                                                    25-08-2023 14:54:45
                                                </td>
                                                <td className="py-2 text-center">15.400.000 ₫</td>
                                                <td className="py-2 text-center">
                                                    <span className="rounded-full bg-yellow-200 px-3 py-1 text-xs text-yellow-800">
                                                        Đang giao hàng
                                                    </span>
                                                </td>
                                                <td className="py-2 text-center">
                                                    <button
                                                        className="rounded-md bg-gray-400 px-3 py-1 text-xs text-white shadow-md transition-colors duration-300 hover:bg-gray-500"
                                                        onClick={openModal}
                                                    >
                                                        Chi tiết
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td className="py-2 text-center">
                                                    22010124125521352
                                                </td>
                                                <td className="py-2 text-center">Mar 21</td>
                                                <td className="py-2 text-center">15.400.000 ₫</td>
                                                <td className="py-2 text-center">
                                                    <span className="rounded-full bg-green-300 px-3 py-1 text-xs text-green-800">
                                                        Hoàn thành
                                                    </span>
                                                </td>
                                                <td className="py-2 text-center">
                                                    <button
                                                        className="rounded-md bg-gray-400 px-3 py-1 text-xs text-white shadow-md transition-colors duration-300 hover:bg-gray-500"
                                                        onClick={openModal}
                                                    >
                                                        Chi tiết
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="bg-white">
                                                <td className="py-2 text-center">
                                                    22010124125521352
                                                </td>
                                                <td className="py-2 text-center">Mar 21</td>
                                                <td className="py-2 text-center">$604.50</td>
                                                <td className="py-2 text-center">
                                                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-800">
                                                        Chờ xác nhận hàng
                                                    </span>
                                                </td>
                                                <td className="py-2 text-center">
                                                    <button
                                                        className="rounded-md bg-gray-400 px-3 py-1 text-xs text-white shadow-md transition-colors duration-300 hover:bg-gray-500"
                                                        onClick={openModal}
                                                    >
                                                        Chi tiết
                                                    </button>
                                                </td>
                                            </tr>
                                            <tr className="bg-gray-50">
                                                <td className="py-2 text-center">
                                                    22010124125521352
                                                </td>
                                                <td className="py-2 text-center">
                                                    25-08-2023 14:54:45
                                                </td>
                                                <td className="py-2 text-center">$604.50</td>
                                                <td className="py-2 text-center">
                                                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs text-orange-800">
                                                        Đang chuẩn bị hàng
                                                    </span>
                                                </td>
                                                <td className="py-2 text-center">
                                                    <button
                                                        className="rounded-md bg-gray-400 px-3 py-1 text-xs text-white shadow-md transition-colors duration-300 hover:bg-gray-500"
                                                        onClick={openModal}
                                                    >
                                                        Chi tiết
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Đặt OrderModal tại đây */}
            <OrderDetailModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
    );
};

export default OrderHistoryPage;

// Order Detail Modal
const OrderDetailModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
    // State for controlling the modal animation
    const [modalClass, setModalClass] = useState('');

    useEffect(() => {
        // Add or remove transition class based on modal state
        setModalClass(
            isOpen
                ? 'translate-y-0 transition-all duration-500 ease-in-out'
                : '-translate-y-full transition-all duration-500 ease-in-out',
        );
    }, [isOpen]);

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
                                        <span className="font-normal">22010124125521352</span>
                                    </p>
                                    <p className="font-bold">
                                        Ngày đặt hàng:{' '}
                                        <span className="font-normal">10/07/2024</span>
                                    </p>
                                </div>
                                <p className="font-bold">
                                    Trạng thái:{' '}
                                    <span className="rounded-full bg-blue-300 px-2 py-1 font-normal text-blue-800">
                                        Đã giao hàng
                                    </span>
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 lg:flex-row">
                                <div className="mb-4 rounded bg-gray-100 p-4">
                                    <h6 className="mb-4 w-full font-semibold text-primary">
                                        KHÁCH HÀNG
                                    </h6>
                                    <p className="mb-2 whitespace-nowrap">
                                        Tên: <span className="font-semibold">Phạm Võ Minh T</span>
                                    </p>
                                    <p className="mb-2 whitespace-nowrap">
                                        Số điện thoại:{' '}
                                        <span className="font-semibold">0985123245</span>
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
                                        Tên: <span className="font-semibold">Diệu Linh</span>
                                    </p>
                                    <p className="mb-2">
                                        Số điện thoại:{' '}
                                        <span className="font-semibold">0985123245</span>
                                    </p>
                                    <p className="mb-2">
                                        Địa chỉ:{' '}
                                        <span className="font-semibold">
                                            Tầng 12, tòa PeakView, Số 36 Hoàng Cầu, phường Ô Chợ
                                            Dừa, Hà Nội
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
                                                <tr>
                                                    <td className="px-4 py-2">
                                                        <img
                                                            src="https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg"
                                                            alt="Ảnh sản phẩm"
                                                            className="h-8 w-8 rounded-full"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng
                                                    </td>
                                                    <td className="px-4 py-2 text-center">2</td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-center">
                                                        1.024.000 ₫
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-center">
                                                        2.048.000 ₫
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-2">
                                                        <img
                                                            src="https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg"
                                                            alt="Ảnh sản phẩm"
                                                            className="h-8 w-8 rounded-full"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng
                                                    </td>
                                                    <td className="px-4 py-2 text-center">2</td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-center">
                                                        1.024.000 ₫
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-center">
                                                        2.048.000 ₫
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-2">
                                                        <img
                                                            src="https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg"
                                                            alt="Ảnh sản phẩm"
                                                            className="h-8 w-8 rounded-full"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng
                                                    </td>
                                                    <td className="px-4 py-2 text-center">2</td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-center">
                                                        1.024.000 ₫
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-center">
                                                        2.048.000 ₫
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-2">
                                                        <img
                                                            src="https://suachobeyeu.vn/application/upload/products/sua-hallo-baby-so-1-lon-800g-cho-tre-0-12-thang-nhap-khau-dan-mach-bia.jpg"
                                                            alt="Ảnh sản phẩm"
                                                            className="h-8 w-8 rounded-full"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 text-center">
                                                        Sữa Hallo Baby số 1 lon 800g trẻ 0-12 tháng
                                                    </td>
                                                    <td className="px-4 py-2 text-center">2</td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-center">
                                                        1.024.000 ₫
                                                    </td>
                                                    <td className="whitespace-nowrap px-4 py-2 text-center">
                                                        2.048.000 ₫
                                                    </td>
                                                </tr>
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
                                    Tiền mặt: <span className="font-semibold">10.000.000 ₫</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    VnpayQR: <span className="font-semibold">6.000.000 ₫</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    MoMo: <span className="font-semibold">0 ₫</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    PayPal: <span className="font-semibold">0 ₫</span>
                                </p>
                            </div>
                            <div className="mb-4 rounded bg-gray-100 p-4">
                                <h6 className="mb-4 font-semibold text-primary">THANH TOÁN</h6>
                                <p className="mb-2 flex justify-between">
                                    Tạm tính: <span className="font-semibold">16.000.000 ₫</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    Khuyến mãi: <span className="font-semibold">-30.000 ₫</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    Phí vận chuyển: <span className="font-semibold">Miễn phí</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    Mã giảm giá: <span className="font-semibold">-10.000 ₫</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    Dùng điểm: <span className="font-semibold">-20.000 ₫</span>
                                </p>
                                <p className="mb-2 flex justify-between">
                                    Cần thanh toán:{' '}
                                    <span className="font-semibold text-red-500">15.400.000 ₫</span>
                                </p>
                            </div>
                            <div className="modal-footer flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="rounded border border-pink-500 px-2 py-1 text-sm text-pink-500 transition-colors duration-300 hover:bg-pink-600 hover:text-white"
                                >
                                    Hoàn trả
                                </button>
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
