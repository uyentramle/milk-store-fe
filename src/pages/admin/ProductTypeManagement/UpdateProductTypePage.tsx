import React, { useState, ChangeEvent, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Input, Button, Form, Switch } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { message } from 'antd';

interface FormData {
    name: string;
    description: string;
    active: boolean;
}

const CreateProductTypePage: React.FC = () => {
    const { id, page } = useParams<{ id: string, page: string }>();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        active: false,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        fetch(`https://localhost:44329/api/ProductType/GetProductTypeById?id=${id}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    setFormData({
                        name: data.data.name,
                        description: data.data.description,
                        active: data.data.active,
                    });
                    setLoading(false);
                } else {
                    setError(data.message || 'Failed to fetch product type data.');
                    setLoading(false);
                }
            })
            .catch((error) => {
                setError('Error fetching product type data.');
                setLoading(false);
            });
    }, [id]);

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

    const handleReset = () => {
        setFormData({
            name: '',
            description: '',
            active: false,
        });
    };

    const handleSubmit = async (values: FormData) => {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token not found.');
        }

        const decodedToken: any = jwtDecode(accessToken);
        const UpdatedBy = decodedToken.id;

        const data = new FormData();
        data.append('Id', id);
        data.append('Name', values.name);
        data.append('Description', values.description);
        data.append('Active', values.active.toString());
        data.append('UpdatedBy', UpdatedBy);
        console.log(values.active);
        const response = await axios.post(`https://localhost:44329/api/ProductType/UpdateProductType`, data, {
            headers: {
                'accept': '*/*',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (response.data.success) {
            message.success('Cập nhật danh mục sản phẩm thành công!');
        } else if (response.data.message === "Product type already exists.") {
            message.error('Danh mục sản phẩm đã tồn tại!');
        } else if (response.data.message === "Product type is not active.") {
            message.error('Danh mục sản phẩm đã bị xóa nê không thể cập nhật trạng thái danh mục sản phẩm!');
        }
         else {
            message.error('Không thể cập nhật danh mục sản phẩm!');
        }
    };

    if (loading) {
        return <div className="container mx-auto px-4 pb-8">Đang tải dữ liệu...</div>;
    }

    if (error) {
        return <div className="container mx-auto px-4 pb-8">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 pb-8">
            <h1 className="mb-6 text-3xl font-bold">Chỉnh sửa danh mục sản phẩm</h1>
            <Form
                initialValues={formData}
                onFinish={handleSubmit}
                className="-mx-4 flex flex-wrap"
            >
                <div className="w-full px-4">
                    <div className="mb-4 w-1/2">
                        <Form.Item
                            label="Tên danh mục sản phẩm"
                            name="name"
                            rules={[{ required: true, message: 'Vui lòng nhập tên danh mục sản phẩm' }]}
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
                        <Button type="primary" htmlType="submit">
                            Chỉnh sửa
                        </Button>
                        {page === 'manage' && (
                            <Link to="/admin/product-types">
                                <Button type="default">Trở về</Button>
                            </Link>
                        )}
                        {page === 'restore' && (
                            <Link to="/admin/product-types/restore">
                                <Button type="default">Trở về</Button>
                            </Link>
                        )}
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default CreateProductTypePage;
