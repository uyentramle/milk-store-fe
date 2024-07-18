import React, { useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Upload, Form, Switch, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

interface FormData {
    name: string;
    brandOrigin: string;
    description?: string | null;
    imageUrl?: string | null;
    active: boolean;
}

const CreateBrandPage: React.FC = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState<FormData>({
        name: '',
        brandOrigin: '',
        description: undefined,
        imageUrl: undefined,
        active: true,
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

    const handleFileChange = (info: UploadChangeParam) => {
        const { file } = info;
        setFormData((prevState) => ({
            ...prevState,
            image: file as RcFile,
        }));
    };

    const handleContentChange = (value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            description: value,
        }));
    };

    const handleSubmit = async (values: FormData) => {
        const data = {
            name: values.name,
            brandOrigin: values.brandOrigin,
            description: values.description ? values.description : null,
            imageUrl: "string",
            active: values.active,
        };
        // const data = new FormData();
        // data.append('name', formData.name);
        // data.append('brandOrigin', formData.brandOrigin);
        // data.append('description', formData.description || '');
        // if (formData.imageUrl) {
        //     data.append('imageUrl', formData.imageUrl);
        // }
        // data.append('active', formData.active.toString());

        try {
            const response = await axios.post('https://localhost:7251/api/Brand/CreateBrand', data, {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer 916ddd3c-8263-4bab-a7b2-5b50c7fd9458', // Thay thế bằng token thực tế
                },
            });

            if (response.data.success) {
                message.success('Brand được tạo thành công.');
                navigate('/admin/brands');
            } else {
                message.error('Không tạo được brand.');
            }
        } catch (error) {
            console.error('Lỗi tạo brand:', error);
            message.error('Đã xảy ra lỗi khi tạo brand.');
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">Thêm thương hiệu</h1>
            <Form
                initialValues={formData}
                onFinish={handleSubmit}
                className="-mx-4 flex flex-wrap"
            >
                <div className="w-full px-4">
                    <div className="mb-4 w-1/2">
                        <Form.Item
                            label="Tên thương hiệu"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên thương hiệu' }]}
                        >
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4 w-1/2">
                        <Form.Item
                            label="Nguồn gốc"
                            name="brandOrigin"
                            rules={[{ required: true, message: 'Vui lòng nhập nguồn gốc' }]}
                        >
                            <Input
                                id="brandOrigin"
                                name="brandOrigin"
                                value={formData.brandOrigin}
                                onChange={handleChange}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </Form.Item>
                    </div>

                    {/* <div className="mb-4">
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
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </Form.Item>
                    </div> */}
                    <div className="mb-4 pb-4">
                        <Form.Item
                            label="Mô tả"
                            name="description"
                        >
                            <ReactQuill
                                theme="snow"
                                value={formData.description || ''}
                                onChange={handleContentChange}
                                className="h-60 mb-4"
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Hình ảnh"
                            name="imageUrl"
                            valuePropName="file"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        >
                            <Upload
                                name="imageUrl"
                                listType="picture"
                                beforeUpload={() => false}
                                onChange={handleFileChange}
                            >
                                <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
                            </Upload>
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
                        <Link to="/admin/brands">
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

export default CreateBrandPage;
