import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
    UserOutlined,
    SettingOutlined,
    EnvironmentOutlined,
    FileTextOutlined,
    RetweetOutlined,
    LogoutOutlined,
    CameraOutlined,
    UploadOutlined
} from '@ant-design/icons';

// const fakeUserData = {
//     id: "1234567890",
//     lastname: "Smith",
//     firstname: "John",
//     gender: "Không biết",
//     email: "john.smith@example.com",
//     phone: "123-456-7890",
//     address: "123 Fake Street, Faketown, FA 12345",
//     avatar: "",
//     background: ""
// };

// Hàm để gọi API và trả về thông tin người dùng đã được lọc
const getUserProfile = async (): Promise<any> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        throw new Error('Access token not found.');
    }

    try {
        const decodedToken: any = jwtDecode(accessToken);
        const userId = decodedToken.userId; // Assuming 'userId' is the key in your accessToken payload

        const response = await axios.get(`https://localhost:44329/api/Account/GetUserProfile?userId=${userId}`, {
            headers: {
                'accept': '*/*', // xem trong api yêu cầu gì thì copy vào
                'authorization': `Bearer ${accessToken}` // xem trong api yêu cầu gì thì copy vào
            }
        });

        // Lấy ra các trường cần thiết từ response
        const { id, firstName, lastName, gender, email, phoneNumber, address, avatar, background } = response.data.data;

        // Trả về một đối tượng chỉ chứa các trường cần thiết
        return { id, firstName, lastName, gender, email, phoneNumber, address, avatar, background };
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw new Error('Failed to fetch user profile.');
    }
};

const updateProfile = async (userId: string, firstName: string, lastName: string, gender: string): Promise<boolean> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        throw new Error('Access token not found.');
    }

    try {
        const response = await axios.put('https://localhost:44329/api/Account/UpdateUserProfile', {
            userId, // Assuming you need userId in the payload
            firstName,
            lastName,
            gender
        }, {
            headers: {
                'accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (response.data.success) {
            console.log('User profile updated successfully');
            return true;
        } else {
            console.error('Failed to update user profile:', response.data.message);
            return false;
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw new Error('Failed to update user profile.');
    }
}; 

const UserProfilePage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [avatar, setAvatar] = useState<string | null>(null); // For storing the avatar URL
    // const [userData, setUserData] = useState(fakeUserData);
    const [userData, setUserData] = useState<any>(null);
    const navigate = useNavigate();



    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    // Sử dụng useEffect để gọi hàm getUserProfile khi component được render
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfileData = await getUserProfile();
                setUserData(userProfileData);
                setAvatar(userProfileData.avatar);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                // Xử lý lỗi khi cần thiết
            }
        };

        fetchData();
    }, []);

    // // Giả lập gọi API để lấy dữ liệu người dùng
    // useEffect(() => {
    //     // Giả lập một gọi API với setTimeout
    //     setTimeout(() => {
    //         const fetchedUserData = {
    //             id: "1234567890",
    //             lastname: "Phạm",
    //             firstname: "Tum",
    //             gender: "Không biết",
    //             email: "tam.pham@example.com",
    //             phone: "098-765-4321",
    //             address: "456 Real Street, Realtown, RT 67890",
    //             avatar: "/logo.png",
    //             background: ""
    //         };
    //         setUserData(fetchedUserData);
    //         setAvatar(fetchedUserData.avatar);
    //     }, 2000); // Giả lập thời gian chờ 2 giây
    // }, []);

    const handleSaveAvatar = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            setAvatar(reader.result as string); // Set the avatar URL
        };
        reader.readAsDataURL(file);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const { id, firstName, lastName, gender } = userData;
    
        try {
            const success = await updateProfile(id, firstName, lastName, gender);
    
            if (success) {
                console.log('User profile updated successfully');
                
                // Optional: Perform any actions needed after successful update
    
                // Set a timeout to refresh user profile data after 2 seconds
                setTimeout(async () => {
                    try {
                        const userProfileData = await getUserProfile();
                        setUserData(userProfileData);
                        setAvatar(userProfileData.avatar);
                        console.log('User profile data refreshed');
                    } catch (error) {
                        console.error('Error refreshing user profile:', error);
                        // Handle error case as needed
                    }
                }, 2000); // Wait for 2 seconds before refreshing
            } else {
                console.error('Failed to update user profile');
                // Handle error case as needed
            }
        } catch (error: any) {
            console.error('Error updating user profile:', error);
            // Handle error case as needed
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.status === 401) {
                    console.error('Unauthorized - redirecting to login page');
                    // Điều hướng người dùng đến trang đăng nhập khi nhận được lỗi 401
                    navigate('/sign-in'); // Thay đổi đường dẫn tới trang đăng nhập của bạn
                } else {
                    console.error('Error updating user profile:', axiosError.message);
                    // Handle other Axios errors
                }
            } else {
                console.error('Error updating user profile:', error.message);
                // Handle non-Axios errors
            }
        }
    };
    

    if (!userData) {
        return <div>Loading...</div>; // Placeholder for loading state
    }

    return (
        <div className="container mx-auto w-4/5 p-4 pt-10">
            <div className="flex flex-col gap-10 lg:flex-row">
                {' '}
                {/* Thêm lớp gap-4 */}
                <div className="mb-4 w-full lg:mb-0 lg:w-1/4">
                    <div className="rounded bg-white p-4 shadow">
                        <nav className="space-y-2">
                            <a
                                href="/user-profile"
                                className="flex items-center rounded bg-pink-500 p-2 text-white"
                            >
                                {/* <i className="fa-solid fa-user mr-2"></i> */}
                                <UserOutlined className="mr-2" />
                                <b>Thông tin tài khoản</b>
                            </a>
                            <a
                                href="/account-settings"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                {/* <i className="fa-solid fa-location-dot mr-2"></i> */}
                                <SettingOutlined className="mr-2" />
                                <span>Thiết lập tài khoản</span>
                            </a>
                            <a
                                href="/user-address"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                {/* <i className="fa-solid fa-location-dot mr-2"></i> */}
                                <EnvironmentOutlined className="mr-2" />
                                <span>Quản lí địa chỉ</span>
                            </a>
                            <a
                                href="/order-history"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                {/* <i className="fa-solid fa-file-lines mr-2"></i> */}
                                <FileTextOutlined className="mr-2" />
                                <span>Lịch sử đơn hàng</span>
                            </a>
                            <a
                                href="/change-password"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                {/* <i className="fa-solid fa-retweet fa-sm mr-2"></i> */}
                                <RetweetOutlined className="mr-2" />
                                <span>Đổi mật khẩu</span>
                            </a>
                            <a
                                href="#"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                {/* <i className="fa-solid fa-arrow-right-from-bracket mr-2"></i> */}
                                <LogoutOutlined className="mr-2" />
                                <span>Đăng xuất</span>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className="w-full lg:flex-1">
                    <div className="rounded bg-white p-4 shadow">
                        <div className="mb-4 flex flex-col gap-12 sm:flex-row">
                            {' '}
                            {/* items-center */}
                            {/* Phần Avatar và Change Photo */}
                            <div className="mb-4 ml-16 mr-0 flex-shrink-0 sm:mb-0 sm:mr-4">
                                <div className="flex h-44 w-44 items-center justify-center rounded-full bg-white">
                                    {avatar || userData.avatar ? (
                                        <img src={avatar ?? userData.avatar} alt="Avatar" className="h-40 w-40 rounded-full object-cover" />
                                    ) : (
                                        <span className="text-xl text-gray-400">140x140</span>
                                    )}
                                </div>
                                <div className="mt-4 flex flex-col items-center justify-center">
                                    <button
                                        className="rounded bg-pink-500 px-3 py-1.5 text-white transition-colors duration-300 hover:bg-pink-600"
                                        onClick={handleOpenModal}
                                    >
                                        {/* <i className="fa fa-fw fa-camera mr-2"></i> */}
                                        <CameraOutlined className="mr-2" />
                                        <span>Thay ảnh đại diện</span>
                                    </button>
                                </div>
                            </div>
                            {/* Phần Thông tin cá nhân */}
                            <div className="flex-1 sm:text-left">
                                {/* <nav className="mb-4">
                                    <b className="border-b-2 border-pink-500 pb-1.5 text-pink-500">
                                        Thông tin cá nhân
                                    </b>
                                </nav> */}
                                <nav className="mb-4 flex">
                                    <b className="inline-flex items-center rounded-t border-l border-r border-t border-pink-500 px-4 py-2 pb-1.5 text-pink-500">
                                        <span className="mr-2">Thông tin cá nhân</span>
                                    </b>
                                    <div className="flex-grow border-b border-pink-500"></div>
                                </nav>
                                <div className="space-y-3">
                                    <form className="mt-6 space-y-3" onSubmit={handleUpdate}>
                                        <div className="flex flex-wrap sm:flex-nowrap sm:space-x-3">
                                            <div className="flex-1 min-w-[100px]">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Họ
                                                </label>
                                                <input
                                                    className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5 focus:border-pink-500 focus:outline-none"
                                                    type="text"
                                                    name="lastName"
                                                    value={userData.lastName}
                                                    onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-[200px]">
                                                <label className="block text-sm font-medium text-gray-700">
                                                    Tên
                                                </label>
                                                <input
                                                    className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5 focus:border-pink-500 focus:outline-none"
                                                    type="text"
                                                    name="firstName"
                                                    value={userData.firstName}
                                                    onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                                                />
                                            </div>
                                            {/* <div className="flex-1 min-w-[20px]">
            <label className="block text-sm font-medium text-gray-700">
                Giới tính
            </label>
            <input
                className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5 focus:border-pink-500 focus:outline-none"
                type="text"
                name="gender"
                value={userData.gender}
                onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
            />
        </div> */}
                                            <div className="flex items-end justify-end mt-4 mb-2 sm:mt-0">
                                                <button
                                                    className="rounded bg-pink-500 px-2 py-1 text-white transition-colors duration-300 hover:bg-pink-600 text-xs"
                                                    type="submit"
                                                >
                                                    Cập nhật
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5 focus:border-pink-500 focus:outline-none"
                                            type="email"
                                            name="email"
                                            value={userData.email}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Số điện thoại
                                        </label>
                                        <input
                                            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5 focus:border-pink-500 focus:outline-none"
                                            type="text"
                                            name="phone"
                                            value={userData.phoneNumber}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Địa chỉ
                                        </label>
                                        <input
                                            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5 focus:border-pink-500 focus:outline-none"
                                            type="text"
                                            name="address"
                                            value={userData.address}
                                            readOnly
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AvatarModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveAvatar} />
        </div>
    );
};

export default UserProfilePage;

const AvatarModal: React.FC<{ isOpen: boolean, onClose: () => void, onSave: (file: File) => void }> = ({ isOpen, onClose, onSave }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [modalClass, setModalClass] = useState('');

    useEffect(() => {
        // Add or remove transition class based on modal state
        setModalClass(
            isOpen
                ? 'translate-y-0 transition-all duration-500 ease-in-out'
                : '-translate-y-full transition-all duration-500 ease-in-out',
        );
    }, [isOpen]);

    // Function to handle Escape key press
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

    const handleSave = () => {
        if (selectedFile) {
            onSave(selectedFile);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`w-full max-w-screen-sm rounded-lg bg-white pl-8 pr-8 pt-4 pb-4 shadow-xl ${modalClass}`}>
                <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">Chọn ảnh đại diện</h2>
                <div className="border mb-6 flex justify-center p-6 bg-gray-100 rounded-lg">
                    {preview ? (
                        <img src={preview} alt="Preview" className="rounded-full w-48 h-48 object-cover shadow-md" />
                    ) : (
                        <div className="flex items-center justify-center w-48 h-48 bg-gray-300 rounded-full">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}
                </div>
                {/* <input type="file" accept="image/*" className="w-full p-2 text-sm text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring focus:ring-pink-200 focus:border-pink-300" onChange={handleFileChange} /> */}

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
                        // style={{ minWidth: '100px' }}
                        >
                            Hủy
                        </button>
                        <button
                            className="rounded-lg bg-pink-500 px-3 py-1 text-white hover:bg-pink-600 transition-colors text-sm"
                            onClick={handleSave}
                        // style={{ minWidth: '100px' }}
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};