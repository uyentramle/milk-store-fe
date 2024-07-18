import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Upload, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

interface FormData {
    title: string;
    content: string;
    thumbnail: RcFile | null;
    status: boolean;
}

const CreateBlogPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
        thumbnail: null,
        status: false,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleFileChange = (info: UploadChangeParam) => {
        const { file } = info;
        setFormData((prevState) => ({
            ...prevState,
            thumbnail: file as RcFile,
        }));
    };

    const handleContentChange = (value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            content: value,
        }));
    };

    const handleSubmit = async (values: FormData) => {
        try {
            // Upload thumbnail image
            const imageUrl = await uploadImage(formData.thumbnail);
            
            // Create blog API call
            const postData = {
                title: values.title,
                content: values.content,
                img: imageUrl,
            };

            // Replace with your API endpoint
            const response = await axios.post('https://localhost:44329/api/Blog/CreateBlog', postData);
            console.log('Blog created:', response.data);
            message.success('Blog created successfully');
            history('/admin/blogs');

            // Redirect or show success message as needed
        } catch (error) {
            console.error('Error creating blog:', error);
        }
    };

    const uploadImage = async (file: RcFile | null): Promise<string> => {
        if (!file) return '';

        try {
            const formData = new FormData();
            formData.append('file', file);

            // Replace with your API endpoint for image upload
            const response = await axios.post('https://localhost:44329/api/Firebase/UploadWebImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Return the image URL from the response
            return response.data.imageUrl;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-6 text-3xl font-bold">Bài viết mới</h1>
            <Form initialValues={formData} onFinish={handleSubmit} className="-mx-4 flex flex-wrap">
                <div className="w-full px-4">
                    <div className="mb-4">
                        <Form.Item label="Tiêu đề" name="title" rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}>
                            <Input id="title" name="title" value={formData.title} onChange={handleChange} />
                        </Form.Item>
                    </div>

                    <div className="mb-4 pb-4">
                        <Form.Item label="Mô tả" name="content">
                            <ReactQuill value={formData.content} onChange={handleContentChange} className="h-60 mb-4" />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Hình ảnh đại diện"
                            name="thumbnail"
                            valuePropName="file"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        >
                            <Upload name="thumbnail" listType="picture" beforeUpload={() => false} onChange={handleFileChange}>
                                <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
                            </Upload>
                        </Form.Item>
                    </div>

                    <div className="mt-6 flex space-x-4">
                        <Button type="primary" htmlType="submit">
                            Thêm mới
                        </Button>
                        <Link to="/admin/blogs">
                            <Button type="default">Trở về</Button>
                        </Link>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default CreateBlogPage;