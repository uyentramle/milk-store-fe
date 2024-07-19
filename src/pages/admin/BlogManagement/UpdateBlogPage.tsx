import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Upload, Switch, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Ensure jwtDecode is correctly imported

interface FormData {
    title: string;
    content: string;
    status: boolean;
    thumbnail: any; // Adjust the type as per your backend's expected format
}

const UpdateBlogPage: React.FC = () => {
    const [form] = Form.useForm();
    const { blogId } = useParams<{ blogId: string }>();
    const history = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        title: '',
        content: '',
        status: false,
        thumbnail: null,
    });

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`https://localhost:44329/api/Blog/GetBlogByBlogId?blogId=${blogId}`);
                if (response.data.success) {
                    const blogData = response.data.data;
                    setFormData({
                        title: blogData.title,
                        content: blogData.content,
                        status: blogData.status,
                        thumbnail: blogData.thumbnail, // Assuming correct field name
                    });
                    form.setFieldsValue({
                        title: blogData.title,
                        content: blogData.content,
                        status: blogData.status,
                        thumbnail: blogData.thumbnail, // Assuming correct field name
                    });
                } else {
                    console.error('Failed to fetch blog:', response.data.message);
                    // Handle error scenario
                }
            } catch (error) {
                console.error('Error fetching blog:', error);
                // Handle error scenario
            }
        };

        fetchBlog();
    }, [blogId, form]);

    const handleFileChange = (info: any) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            // Update form data with the uploaded file information
            setFormData({
                ...formData,
                thumbnail: info.file.originFileObj,
            });
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const handleContentChange = (value: string) => {
        // Handle content change
    };

    const handleSwitchChange = (checked: boolean) => {
        // Handle switch change
    };

    const onFinish = async (values: any) => {
        try {
            // Fetch userId from accessToken in localStorage
            const accessToken = localStorage.getItem('accessToken');
            const decodedToken: any = jwtDecode(accessToken);
            const userId = decodedToken.userId;

            // Prepare data for UpdateBlog API call
            const formDataToSend = {
                title: values.title,
                content: values.content,
                status: values.status,
                updateAt: new Date().toISOString(),
                updateBy: userId,
            };

            // Update blog using UpdateBlog endpoint
            const response = await axios.put(`https://localhost:44329/api/Blog/UpdateBlog?id=${blogId}`, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.data.success) {
                throw new Error(response.data.message || 'Failed to update blog');
            }

            // Check if thumbnail has been updated
            if (formData.thumbnail) {
                // Upload image to Firebase and get imageUrl
                const uploadResponse = await axios.post('https://localhost:44329/api/Firebase/UploadWebImage', formData.thumbnail);
                const imgUrl = uploadResponse.data.imageUrl;

                // Update blog thumbnail using UpdateImgBlog endpoint
                const updateImgResponse = await axios.put(`https://localhost:44329/api/Blog/UpdateImgBlog?blogid=${blogId}`, { imgUrl }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!updateImgResponse.data.success) {
                    throw new Error(updateImgResponse.data.message || 'Failed to update blog thumbnail');
                }
            }

            message.success('Blog updated successfully');
            history('/admin/blogs');

        } catch (error) {
            console.error('Error updating blog:', error);
            message.error('Failed to update blog');
        }
    };

    return (
        <div className="container mx-auto px-4 pb-8">
            <h1 className="mb-6 text-3xl font-bold">Chỉnh sửa bài viết</h1>
            <Form
                form={form}
                onFinish={onFinish}
                initialValues={formData}
                layout="vertical"
                scrollToFirstError
            >
                <Form.Item
                    name="title"
                    label="Tiêu đề"
                    rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    name="content"
                    label="Nội dung"
                >
                    <ReactQuill
                        onChange={handleContentChange}
                        className="h-60 mb-4"
                    />
                </Form.Item>

                <Form.Item
                    name="thumbnail"
                    label="Hình ảnh đại diện"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e.fileList}
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

                <Form.Item
                    name="status"
                    label="Trạng thái"
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Cập nhật
                    </Button>
                    <Link to="/admin/blogs">
                        <Button type="default">
                            Trở về
                        </Button>
                    </Link>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateBlogPage;
