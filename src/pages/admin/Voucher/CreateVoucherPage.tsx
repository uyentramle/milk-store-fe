import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Form, DatePicker, Select } from 'antd';

const { Option } = Select;

interface FormData {
    code: string;
    description: string;
    discount_type: 'Percentage' | 'FixedAmount';
    discount_value: number;
    start_date?: Date;
    end_date?: Date;
    usage_limit?: number;
    used_count?: number;
    minimum_order_amount: number;
    status: 'Active' | 'Disabled';
}

const CreateVoucherPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        code: '',
        description: '',
        discount_type: 'Percentage',
        discount_value: 0,
        start_date: undefined,
        end_date: undefined,
        usage_limit: undefined,
        used_count: undefined,
        minimum_order_amount: 0,
        status: 'Active',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as HTMLInputElement;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSelectChange = (value: string, name: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDateChange = (date: any, _dateString: string, name: string) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: date,
        }));
    };

    const handleSubmit = (values: FormData) => {
        console.log(values);
        // You can add your submit logic here
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">Thêm Voucher mới</h1>
            <Form
                initialValues={formData}
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
                            <Input
                                id="code"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Mô tả"
                            name="description"
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả' }]}
                        >
                            <Input.TextArea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Loại giảm giá"
                            name="discount_type"
                        >
                            <Select
                                id="discount_type"
                                value={formData.discount_type}
                                onChange={(value) => handleSelectChange(value, 'discount_type')}
                            >
                                <Option value="Percentage">Phần trăm</Option>
                                <Option value="FixedAmount">Số tiền cố định</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Giá trị giảm giá"
                            name="discount_value"
                            rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm giá' }]}
                        >
                            <Input
                                id="discount_value"
                                name="discount_value"
                                type="number"
                                value={formData.discount_value}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Ngày bắt đầu"
                            name="start_date"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày bắt đầu' }]}
                        >
                            <DatePicker
                                id="start_date"
                                name="start_date"
                                value={formData.start_date ? new Date(formData.start_date) : undefined}
                                onChange={(date, dateString) => handleDateChange(date, dateString[0], 'start_date')}
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Ngày kết thúc"
                            name="end_date"
                            rules={[{ required: true, message: 'Vui lòng chọn ngày kết thúc' }]}
                        >
                            <DatePicker
                                id="end_date"
                                name="end_date"
                                value={formData.end_date ? new Date(formData.end_date) : undefined}
                                onChange={(date, dateString) => handleDateChange(date, dateString[0], 'end_date')}
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Giới hạn sử dụng"
                            name="usage_limit"
                        >
                            <Input
                                id="usage_limit"
                                name="usage_limit"
                                type="number"
                                value={formData.usage_limit}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Số lần đã sử dụng"
                            name="used_count"
                        >
                            <Input
                                id="used_count"
                                name="used_count"
                                type="number"
                                value={formData.used_count}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Giá trị đơn hàng tối thiểu"
                            name="minimum_order_amount"
                        >
                            <Input
                                id="minimum_order_amount"
                                name="minimum_order_amount"
                                type="number"
                                value={formData.minimum_order_amount}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Trạng thái"
                            name="status"
                            valuePropName="checked"
                        >
                            <Select
                                id="status"
                                value={formData.status}
                                onChange={(value) => handleSelectChange(value, 'status')}
                            >
                                <Option value="Active">Hoạt động</Option>
                                <Option value="Disabled">Vô hiệu hóa</Option>
                            </Select>
                        </Form.Item>
                    </div>

                    <div className="mt-6 flex space-x-4">
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Thêm mới
                        </Button>
                        <Link to="/admin/vouchers">
                            <Button
                                type="default"
                            >
                                Trở về
                            </Button>
                        </Link>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default CreateVoucherPage;
