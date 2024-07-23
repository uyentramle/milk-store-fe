import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Form, Switch, message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';

interface FormData {
    name: string;
    description: string;
    active: boolean;
}

const CreateAgeRangePage: React.FC = () => {
    const [form] = Form.useForm();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        active: false,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData((prevState) => ({
            ...prevState,
            active: checked,
        }));
    };

    const handleContentChange = (value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            description: value,
        }));
    };

    const handleSubmit = async (values: FormData) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token not found.');
        }

        const decodedToken: any = jwtDecode(accessToken);
        const CreatedBy = decodedToken.id;

        const data = new FormData();
        data.append('Name', values.name);
        data.append('Description', values.description);
        data.append('Active', values.active.toString());
        data.append('CreatedBy', CreatedBy);

        try {
            const response = await axios.post('https://localhost:44329/api/AgeRange/CreateAgeRange', data, {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${accessToken}`,
                },
            });

            if (response.data.success) {
                message.success('Thêm độ tuổi sử dụng thành công!');
                form.resetFields();
            } else if (response.data.message === 'AgeRange already exists.') {
                message.error('Độ tuổi sử dụng đã tồn tại');
            } else {
                message.error('Không thể thêm độ tuổi sử dụng');
            }
        } catch (error) {
            message.error('Có lỗi xảy ra khi thêm độ tuổi sử dụng');
        }
    };

    return (
        <div className="container mx-auto px-4 pb-8">
            <h1 className="mb-6 text-3xl font-bold">Thêm độ tuổi sử dụng</h1>
            <Form
                form={form}
                initialValues={formData}
                onFinish={handleSubmit}
                className="-mx-4 flex flex-wrap"
            >
                <div className="w-full px-4">
                    <div className="mb-4 w-1/2">
                        <Form.Item
                            label="Tên độ tuổi sử dụng"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên độ tuổi sử dụng' }]}
                        >
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4 pb-4">
                        <Form.Item
                            label="Mô tả"
                            name="description"
                        >
                            <ReactQuill
                                value={formData.description}
                                onChange={handleContentChange}
                                className="h-60 mb-4"
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Trạng thái"
                            name="active"
                            valuePropName="checked"
                        >
                            <Switch
                                id="active"
                                checked={formData.active}
                                onChange={handleSwitchChange}
                            />
                        </Form.Item>
                    </div>

                    <div className="mt-6 flex space-x-4">
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Thêm mới
                        </Button>
                        <Link to="/admin/age-ranges">
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

export default CreateAgeRangePage;
