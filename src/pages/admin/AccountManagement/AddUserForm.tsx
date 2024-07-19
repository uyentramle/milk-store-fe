import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Password } from '@mui/icons-material';

const { Option } = Select;

interface AddUserFormProps {
    visible: boolean;
    onCancel: () => void;
    onCreate: (newUser: Account) => void;
}

const AddUserForm: React.FC<AddUserFormProps> = ({
    visible,
    onCancel,
    onCreate
}) => {
    const [form] = Form.useForm();

    const handleCreateUser = () => {
        form.validateFields().then((values) => {
          const newUser = {
            id: '',
            ...values,
          };
          onCreate(newUser);
          form.resetFields();
        });
      };

    return (
        <Modal
            title="Tạo mới người dùng"
            className="text-center"
            visible={visible}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleCreateUser}>
                    Thêm
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">

                        <div className="flex justify-between gap-2">
                            <Form.Item className="w-full" name="firstName" label="Họ" 
                            // rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                            >
                                <Input  />
                            </Form.Item>
                            <Form.Item className="w-full" name="lastName" label="Tên" 
                            // rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                            >
                                <Input  />
                            </Form.Item>
                        </div>

                        
            
                <div className="flex justify-between gap-2">
                            <Form.Item className="w-full" name="email" label="Email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
                                <Input  />
                            </Form.Item>
                            <Form.Item className="w-full" name="phoneNumber" label="Số điện thoại" 
                            // rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}
                            >
                                <Input  />
                            </Form.Item>
                        </div>
                <Form.Item className="w-full" name="password" label="Mật khẩu" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                    <Input.Password  />
                </Form.Item>
                <div className="flex justify-between gap-2">
                    <Form.Item style={{ width: '50%' }} name="roles" label="Role" rules={[{ required: true, message: 'Vui lòng chọn vai trò' }]}>
                        <Select mode="multiple">
                            <Option value="Customer">Customer</Option>
                            <Option value="Staff">Staff</Option>
                            <Option value="Admin">Admin</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{ width: '25%' }} name="gender" label="Giới tính" rules={[{ required: true, message: 'Vui lòng chọn giới tính' }]}>
                        <Select>
                            <Option value="Male">Nam</Option>
                            <Option value="Female">Nữ</Option>
                            <Option value="Unknown">Khác</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item style={{ width: '25%' }} name="status" label="Trạng thái" rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}>
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

export default AddUserForm;
