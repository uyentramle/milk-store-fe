import React from 'react';
import { Modal, Table, Button, Tag } from 'antd';

interface OrderDetailsProps {
    visible: boolean;
    onCancel: () => void;
    order: Order | null;
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
        case 'ShippedAgain':
            return 'yellow';
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
            return 'Đang chuẩn bị';
        case 'Prepared':
            return 'Đã chuẩn bị';
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

const OrderDetailModal: React.FC<OrderDetailsProps> = ({ visible, onCancel, order }) => {
    if (!order) return null;

    const columns = [
        {
            title: 'Ảnh',
            dataIndex: 'image',
            key: 'image',
            render: (text: string) => <img src={text} alt="Ảnh sản phẩm" style={{ width: 32, height: 32, borderRadius: '50%' }} />,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            render: (text: string) => <span style={{ fontSize: '13px' }}>{text}</span>,
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            render: (text: string) => <span style={{ fontSize: '13px' }}>{text}</span>,
        },
        {
            title: 'Đơn giá',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            align: 'center',
            render: (text: string) => <span style={{ fontSize: '13px' }}>{text}</span>,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'center',
            render: (text: string) => <span style={{ fontSize: '13px' }}>{text}</span>,
        },
    ];

    return (
        <Modal visible={visible} onCancel={onCancel} footer={null} width="68%">
            <h5 className="modal-title mb-2 text-center text-xl font-bold">Chi tiết đơn hàng</h5>
            <div className="modal-body flex text-sm">
                <div className="w-full md:w-2/3">
                    <div className="mb-4 flex justify-between rounded bg-gray-100 p-4">
                        <div>
                            <p className="font-bold">
                                Đơn hàng: <span className="font-normal">{order.orderId}</span>
                            </p>
                            <p className="font-bold">
                                Ngày đặt hàng: <span className="font-normal">{order.orderDate}</span>
                            </p>
                        </div>
                        <p className="font-bold">
                            Trạng thái: <Tag color={getStatusColor(order.status)}>{getStatusVietnamese(order.status)}</Tag>
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 lg:flex-row">
                        <div className="mb-4 rounded bg-gray-100 p-4">
                            <h6 className="mb-4 w-full font-semibold text-primary">KHÁCH HÀNG</h6>
                            <p className="mb-2 whitespace-nowrap">
                                Tên: <span className="font-semibold">{order.customer.name}</span>
                            </p>
                            <p className="mb-2 whitespace-nowrap">
                                Số điện thoại: <span className="font-semibold">{order.customer.phone}</span>
                            </p>
                        </div>
                        <div className="mb-4 w-full rounded bg-gray-100 p-4">
                            <h6 className="mb-4 font-semibold text-primary">NGƯỜI NHẬN</h6>
                            <p className="mb-2">
                                Tên: <span className="font-semibold">{order.recipient.name}</span>
                            </p>
                            <p className="mb-2">
                                Số điện thoại: <span className="font-semibold">{order.recipient.phone}</span>
                            </p>
                            <p className="mb-2">
                                Địa chỉ: <span className="font-semibold">{order.recipient.address}</span>
                            </p>
                        </div>
                    </div>
                    <div>
                        <h6 className="mb-2 font-semibold text-primary">CHI TIẾT SẢN PHẨM</h6>
                        <div className="overflow-x-auto">
                                <Table
                                    columns={columns}
                                    dataSource={order.products}
                                    pagination={false}
                                    scroll={{ y: 150 }}
                                />
                        </div>
                    </div>
                </div>
                <div className="w-full pl-4 md:w-1/3">
                    <div className="mb-4 rounded bg-gray-100 p-4">
                        <h6 className="mb-4 font-semibold text-primary">PHƯƠNG THỨC THANH TOÁN</h6>
                        <p className="mb-2 flex justify-between">
                            Tiền mặt: <span className="font-semibold">{order.payment.cash}</span>
                        </p>
                        <p className="mb-2 flex justify-between">
                            VnpayQR: <span className="font-semibold">{order.payment.vnpayQR}</span>
                        </p>
                        <p className="mb-2 flex justify-between">
                            MoMo: <span className="font-semibold">{order.payment.momo}</span>
                        </p>
                        <p className="mb-2 flex justify-between">
                            PayPal: <span className="font-semibold">{order.payment.paypal}</span>
                        </p>
                    </div>
                    <div className="mb-4 rounded bg-gray-100 p-4">
                        <h6 className="mb-4 font-semibold text-primary">THANH TOÁN</h6>
                        <p className="mb-2 flex justify-between">
                            Tạm tính: <span className="font-semibold">{order.payment.subtotal}  ₫</span>
                        </p>
                        <p className="mb-2 flex justify-between">
                            Khuyến mãi: <span className="font-semibold">{order.payment.discount} ₫</span>
                        </p>
                        <p className="mb-2 flex justify-between">
                            Phí vận chuyển: <span className="font-semibold">{order.payment.shippingFee}</span>
                        </p>
                        <p className="mb-2 flex justify-between">
                            Mã giảm giá: <span className="font-semibold">{order.payment.coupon}</span>
                        </p>
                        <p className="mb-2 flex justify-between">
                            Dùng điểm: <span className="font-semibold">{order.payment.points}</span>
                        </p>
                        <p className="mb-2 flex justify-between">
                            Cần thanh toán: <span className="font-semibold text-red-500">{order.payment.total} ₫</span>
                        </p>
                    </div>
                    <div className="modal-footer flex justify-end">
                        <Button type="primary" onClick={onCancel}>Đóng</Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default OrderDetailModal;
