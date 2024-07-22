import React, { useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Form, Switch, message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

interface FormData {
    name: string;
    origin: string;
    description: string;
    active: boolean;
}

const CreateCategoryBlogPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        origin: '',
        description: '',
        active: false,
    });
    const navigate = useNavigate();

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
        try {
            const response = await axios.post('https://localhost:44329/api/Category/CreateCategory', {
                name: values.name,
                description: values.description,
                active: values.active,
            });

            message.success('Category created successfully');
            navigate('/admin/categories');
        } catch (error) {
            console.error('Error creating category:', error);
            message.error('Failed to create category');
        }
    };

    return (
        <div className="container mx-auto px-4 pb-8">
            <h1 className="mb-6 text-3xl font-bold">Thêm danh mục bài viết</h1>
            <Form initialValues={formData} onFinish={handleSubmit} className="-mx-4 flex flex-wrap">
                <div className="w-full px-4">
                    <div className="mb-4 w-1/2">
                        <Form.Item
                            label="Tên danh mục bài viết"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục bài viết' }]}
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
                        <Link to="/admin/categories">
                            <Button type="default">
                                Trở về
                            </Button>
                        </Link>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default CreateCategoryBlogPage;