import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Input, Button, Form, DatePicker, Select, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Option } = Select;

interface VoucherData {
    id: number;
    code: string;
    description: string;
    discountType: 'Percentage' | 'FixedAmount';
    discountValue: number;
    startDate?: string | null;
    endDate?: string | null;
    usageLimit: number;
    usedCount?: number | null;
    minimumOrderValue: number;
    status: 'Active' | 'Expired' | 'Used' | 'Disabled';
}

const getVoucherData = async (voucherId: string): Promise<VoucherData> => {
    try {
        const response = await axios.get(`https://localhost:44329/api/Voucher/GetVoucherById?id=${voucherId}`, {
            headers: {
                'accept': '*/*'
            }
        });

        if (response.data && response.data.data) {
            const { id, code, description, discountType, discountValue, startDate, endDate, usageLimit, usedCount, minimumOrderValue, status } = response.data;

            return {
                id,
                code,
                description,
                discountType,
                discountValue,
                startDate,
                endDate,
                usageLimit,
                usedCount,
                minimumOrderValue,
                status
            };
        } else {
            throw new Error('Invalid response data');
        }
    } catch (error) {
        console.error('Lỗi tìm nạp voucher:', error);
        throw new Error('Không thể tìm nạp voucher.');
    }
};

const UpdateVoucherPage: React.FC = () => {
    const { voucherId } = useParams<{ voucherId: string }>();
    const [voucherData, setVoucherData] = useState<VoucherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVoucher = async () => {
            setLoading(true);
            try {
                if (voucherId) {
                    const voucherData = await getVoucherData(voucherId);
                    setVoucherData(voucherData);
                }
                setLoading(false);
            } catch (error) {
                console.error('Lỗi tìm nạp voucher:', error);
                setError('Không thể tìm nạp voucher.');
            } finally {
                setLoading(false);
            }
        };

        fetchVoucher();
    }, [voucherId]);

    const handleSubmit = async (values: VoucherData) => {
        const requestBody = {
            ...values,
            startDate: values.startDate ? moment(values.startDate).format('YYYY-MM-DDTHH:mm:ss') : null,
            endDate: values.endDate ? moment(values.endDate).format('YYYY-MM-DDTHH:mm:ss') : null,
        };

        try {
            const response = await axios.put('https://localhost:44329/api/Voucher/UpdateVoucher', requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 916ddd3c-8263-4bab-a7b2-5b50c7fd9458', // Replace with actual token
                },
            });
            if (response.data.success) {
                message.success('Voucher được cập nhật thành công.');
                navigate('/admin/vouchers');
            } else {
                message.error('Không thể cập nhật voucher.');
            }
        } catch (error) {
            console.error('Lỗi cập nhật voucher:', error);
            message.error('Không thể cập nhật voucher.');
        }
    };

    if (loading || !voucherData) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const startDateMoment = voucherData.startDate ? moment(voucherData.startDate) : undefined;
    const endDateMoment = voucherData.endDate ? voucherData.endDate : undefined;

    return (
        <div className="container mx-auto px-4 pb-8">
            <h1 className="mb-6 text-3xl font-bold">Cập nhật voucher</h1>
            <Form
                initialValues={voucherData}
                onFinish={handleSubmit}
                className="-mx-4 flex flex-wrap"
            >
                <div className="w-1/2 px-4">
                    <div className="mb-4">
                        <Form.Item
                            label="Mã voucher"
                            name="code"
                            rules={[{ required: true, message: 'Vui lòng nhập mã voucher' }]}
                        >
                            <Input name="code" defaultValue={voucherData.code} disabled />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                        >
                            <Input.TextArea name="description" defaultValue={voucherData.description} />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Loại giảm giá"
                            name="discountType"
                            rules={[{ required: true, message: 'Vui lòng chọn loại giảm giá' }]}
                        >
                            <Select defaultValue={voucherData.discountType} disabled>
                                <Option value="Percentage">Percentage</Option>
                                <Option value="FixedAmount">Fixed Amount</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Giá trị giảm giá"
                            name="discountValue"
                            rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm giá' }]}
                        >
                            <Input type="number" name="discountValue" defaultValue={voucherData.discountValue.toString()} />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Ngày bắt đầu"
                            name="startDate"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
                        >
                            <DatePicker
                                name="startDate"
                                defaultValue={startDateMoment}
                                format="YYYY-MM-DD HH:mm:ss"
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Ngày kết thúc"
                            name="endDate"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
                        >
                            <DatePicker
                                name="endDate"
                                defaultValue={endDateMoment}
                                format="YYYY-MM-DD HH:mm:ss"
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Giới hạn sử dụng"
                            name="usageLimit"
                        >
                            <Input type="number" name="usageLimit" defaultValue={voucherData.usageLimit.toString()} />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Giá trị đơn hàng tối thiểu"
                            name="minimumOrderValue"
                        >
                            <Input type="number" name="minimumOrderValue" defaultValue={voucherData.minimumOrderValue.toString()} />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Trạng thái"
                            name="status"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
                        >
                            <Select defaultValue={voucherData.status}>
                                <Option value="Active">Active</Option>
                                <Option value="Disabled">Disabled</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="mt-6 flex space-x-4">
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                        <Link to="/admin/vouchers">
                            <Button type="default">
                                Back
                            </Button>
                        </Link>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default UpdateVoucherPage;
