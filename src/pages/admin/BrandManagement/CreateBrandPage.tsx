import React, { useState, ChangeEvent, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Button, Form, Switch, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../services/Firebase/firebase';


interface FormData {
    name: string;
    brandOrigin: string;
    description?: string | null;
    imageUrl?: string | null;
    active: boolean;
}

const CreateBrandPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [image, setImage] = useState<string | null>(null);
    const navigate = useNavigate();
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);

    // const [userData, setUserData] = useState<any>(null);
    // const userId = userData?.id;

    // const navigateToSignInPage = () => {
    //   navigate('/sign-in');
    // };

    // const handleLogout = () => {
    //   // Clear local items
    //   localStorage.removeItem('accessToken');
    //   // Redirect to sign-in page
    //   navigateToSignInPage();
    // };

    const handleOpenModal = (userId: string) => {
        setCurrentUserId(userId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

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

    // const handleFileChange = (info: UploadChangeParam) => {
    //   const { file } = info;
    //   setFormData((prevState) => ({
    //     ...prevState,
    //     image: file as RcFile,
    //   }));
    // };

    const handleContentChange = (value: string) => {
        setFormData((prevState) => ({
            ...prevState,
            description: value,
        }));
    };

    const handleSaveImage = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
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
            const response = await axios.post('https://localhost:44329/api/Brand/CreateBrand', data, {
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                    // 'Authorization': 'Bearer 916ddd3c-8263-4bab-a7b2-5b50c7fd9458', 
                },
            });

            if (response.data.success) {
                message.success('Thương hiệu được tạo thành công.');
                navigate('/admin/brands');
            } else {
                message.error('Không tạo được thương hiệu.');
            }
        } catch (error) {
            console.error('Lỗi tạo thương hiệu port 44329:', error);
            try {
                const response = await axios.post('https://localhost:7251/api/Brand/CreateBrand', data, {
                    headers: {
                        'accept': '*/*',
                        'Content-Type': 'application/json',
                        // 'Authorization': 'Bearer 916ddd3c-8263-4bab-a7b2-5b50c7fd9458', 
                    },
                });

                if (response.data.success) {
                    message.success('Thương hiệu được tạo thành công.');
                    navigate('/admin/brands');
                } else {
                    message.error('Không tạo được thương hiệu.');
                }
            } catch (error) {
                console.error('Lỗi tạo thương hiệu:', error);
                message.error('Đã xảy ra lỗi khi tạo thương hiệu.');
            }
        }
    };

    return (
        <div className="container mx-auto px-4 pb-8">
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
                            {/* <Upload
                name="imageUrl"
                listType="picture"
                beforeUpload={() => false}
                onChange={handleFileChange}
              >
                <Button icon={<UploadOutlined />}>Chọn hình ảnh</Button>
              </Upload> */}
                            {image && (
                                <img src={image} alt="Preview" className="w-48 h-48 object-cover shadow-md mb-4" />
                            )}
                            <Button
                                onClick={() => handleOpenModal('04593eb6-fc18-4b07-b22a-3b0e4be00b59')}
                                icon={<UploadOutlined />}
                            >
                                Chọn hình ảnh
                            </Button>

                            <ImageModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveImage} userId={currentUserId} />
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

const ImageModal: React.FC<{ isOpen: boolean, onClose: () => void, onSave: (file: File) => void, userId: string | null }> = ({ isOpen, onClose, onSave, userId: userIdd }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [modalClass, setModalClass] = useState('');

    // const accessToken = localStorage.getItem('accessToken');

    // if (!accessToken) {
    //   throw new Error('Access token not found.');
    // }

    // const decodedToken: any = jwtDecode(accessToken);
    // const userId = decodedToken.userId;

    useEffect(() => {
        setModalClass(
            isOpen
                ? 'translate-y-0 transition-all duration-500 ease-in-out'
                : '-translate-y-full transition-all duration-500 ease-in-out',
        );
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleEsc);

        return () => {
            document.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);

            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpload = async (file: File) => {
        const storageRef = ref(storage, `brands/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise<string>((resolve, reject) => {
            uploadTask.on(
                'state_changed',
                (snapshot) => { },
                (error) => {
                    console.error('Upload failed:', error);
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleSave = async () => {
        if (selectedFile) {
            try {
                const url = await handleUpload(selectedFile);
                console.log('Tải đường dẫn tệp:', url);

                const uploadImageResponse = await axios.post('https://localhost:44329/api/Image/UploadImage', {
                    imageUrl: url,
                    thumbnailUrl: url,
                    type: 'brand',
                    userId: userIdd
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        'accept': '*/*',
                    }
                });

                if (uploadImageResponse.data.success) {
                    console.log('Hình ảnh đã tải lên thành công');
                    message.success('Hình ảnh đã đăng thành công.');
                    onSave(selectedFile);
                    onClose();
                } else {
                    console.error('Failed to upload image:', uploadImageResponse.data.message);
                    message.error('Đăng ảnh thất bại.');
                }

            } catch (error) {
                console.error('Error uploading file:', error);
                message.error('Có lỗi xảy ra khi tải lên.');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`w-full max-w-screen-sm rounded-lg bg-white pl-8 pr-8 pt-4 pb-4 shadow-xl ${modalClass}`}>
                <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">Tải ảnh lên</h2>
                <div className="border mb-6 flex justify-center p-6 bg-gray-100 rounded-lg">
                    {preview ? (
                        <img src={preview} alt="Preview" className="rounded-full w-48 h-48 object-cover shadow-md" />
                    ) : (
                        <div className="flex items-center justify-center w-48 h-48 bg-gray-300 rounded-full">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex justify-between space-x-4">
                    <label className="flex items-center gap-2 px-2 py-1 bg-white text-pink-500 rounded-lg shadow-lg tracking-wide uppercase border border-pink-500 cursor-pointer hover:bg-pink-600 hover:text-white text-sm">
                        <UploadOutlined className="text-xs" />
                        <span className="mt-1 text-xs">Chọn ảnh</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    </label>
                    <div className="flex space-x-4">
                        <button
                            className="rounded-lg bg-gray-300 px-3 py-1 text-gray-700 hover:bg-gray-400 transition-colors text-sm"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button
                            className="rounded-lg bg-pink-500 px-3 py-1 text-white hover:bg-pink-600 transition-colors text-sm"
                            onClick={handleSave}
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};