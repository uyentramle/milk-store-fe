import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Option } = Select;

interface UserDetailsFormProps {
    visible: boolean;
    onCancel: () => void;
    user: Account | null;
    onUpdate: (updatedUser: Account) => void;
}

const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
    visible,
    onCancel,
    user,
    onUpdate,
}) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (user) {
            form.setFieldsValue({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                roles: user.roles,
                status: user.status,
                address: user.address,
                avatar: user.avatar,
            });
        }
    }, [user, form]);

    const handleUpdateUser = () => {
        form.validateFields().then((values) => {
            const updatedUser = {
                ...user!,
                ...values,
            };
            onUpdate(updatedUser);
            form.resetFields();
        });
    };

    return (
        <Modal
            title="Chi tiết người dùng"
            className="text-center"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleUpdateUser}>
                    Cập nhật
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <div className="flex ">
                    <div className="flex items-center justify-center items-center mr-5">
                        <Avatar
                            size={120}
                            src={user?.avatar}
                            icon={<UserOutlined />}
                        />
                    </div>
                    <div>
                        <div className="flex justify-between gap-2">
                            <Form.Item className="w-full" name="firstName" label="Họ" rules={[{ required: true, message: 'Vui lòng nhập họ' }]}>
                                <Input disabled />
                            </Form.Item>
                            <Form.Item className="w-full" name="lastName" label="Tên" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                                <Input disabled />
                            </Form.Item>
                        </div>

                        <div className="flex justify-between gap-2">
                            <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
                                <Input disabled />
                            </Form.Item>
                            <Form.Item name="phoneNumber" label="Số điện thoại">
                                <Input disabled />
                            </Form.Item>
                        </div>
                    </div>
                </div>

                <Form.Item className="w-full" name="address" label="Địa chỉ" rules={[{ required: true, message: 'Vui lòng nhập tên' }]}>
                    <Input disabled />
                </Form.Item>
                <div className="flex justify-between gap-2">
                    <Form.Item style={{ width: '50%' }} name="roles" label="Role">
                        <Select mode="multiple">
                            <Option value="Customer">Customer</Option>
                            <Option value="Staff">Staff</Option>
                            <Option value="Admin">Admin</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{ width: '25%' }} name="gender" label="Giới tính">
                        <Select>
                            <Option value="Male">Nam</Option>
                            <Option value="Female">Nữ</Option>
                            <Option value="Unknown">Khác</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{ width: '25%' }} name="status" label="Trạng thái">
                        <Select>
                            <Option value="Active">Hoạt động</Option>
                            <Option value="Blocked">Chặn</Option>
                            <Option value="Inactive">Không hoạt động</Option>
                        </Select>
                    </Form.Item>
                </div>

            </Form>
        </Modal>
    );
};

export default UserDetailsForm;
