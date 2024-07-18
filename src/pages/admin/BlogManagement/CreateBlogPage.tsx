import React, { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Upload, Form, Switch } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

    const handleSwitchChange = (checked: boolean) => {
        setFormData((prevState) => ({
            ...prevState,
            status: checked,
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

    const handleSubmit = (values: FormData) => {
        console.log(values);
    };

    return (
        <div className="container mx-auto px-4 pb-8">
            <h1 className="mb-6 text-3xl font-bold">Bài viết mới</h1>
            <Form
                initialValues={formData}
                onFinish={handleSubmit}
                className="-mx-4 flex flex-wrap"
            >
                <div className="w-full px-4">
                    <div className="mb-4">
                        <Form.Item
                            label="Tiêu đề"
                            name="title"
                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                        >
                            <Input
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4 pb-4">
                        <Form.Item
                            label="Mô tả"
                            name="content"
                        >
                            <ReactQuill
                                value={formData.content}
                                onChange={handleContentChange}
                                className="h-60 mb-4"
                            />
                        </Form.Item>
                    </div>

                    <div className="mb-4">
                        <Form.Item
                            label="Hình ảnh đại diện"
                            name="thumbnail"
                            valuePropName="file"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                        >
                            <Upload
                                name="thumbnail"
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
                            name="status"
                            valuePropName="checked"
                        >
                            <Switch
                                id="status"
                                checked={formData.status}
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
                        <Link to="/admin/blogs">
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

export default CreateBlogPage;
