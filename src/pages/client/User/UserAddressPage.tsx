import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import { jwtDecode } from 'jwt-decode';
import { Modal, Form, Input, Checkbox, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    UserOutlined,
    SettingOutlined,
    EnvironmentOutlined,
    FileTextOutlined,
    RetweetOutlined,
    LogoutOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import AddressForm from '../../../layouts/client/Components/User/Address/AddressForm';
import cities from '../../../layouts/client/Components/User/Address/data/provinces.json';
import districts from '../../../layouts/client/Components/User/Address/data/districts.json';
import wards from '../../../layouts/client/Components/User/Address/data/wards.json';
// Fake data
// const fakeAddresses = [
//     {
//         id: 1,
//         name: "Phạm Võ Minh T",
//         address: "123 Đường ABC, Phường XYZ, Quận 1, TP. HCM",
//         phone: "0123456789",
//         default: true,
//     },
//     {
//         id: 2,
//         name: "PTDL",
//         address: "456 Đường DEF, Phường UVW, Quận 2, TP. HCM",
//         phone: "0987654321",
//         default: false,
//     },
// ];

interface UserAddress {
    addressId?: number;
    userId: string;
    fullName: string;
    phoneNumber: string;
    addressLine: string;
    city: string;
    district: string;
    ward: string;
    isDefault: boolean;
}

interface UserAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    address?: UserAddress;
}

// const fetchData = async (setUserAddresses: React.Dispatch<React.SetStateAction<any>>) => {
//     try {
//         const userAddressData = await getUserAddress();
//         setUserAddresses(userAddressData);
//     } catch (error) {
//         console.error('Error fetching user address:', error);
//     }
// };

const getUserAddress = async (): Promise<any> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        throw new Error('Access token not found.');
    }

    try {
        const decodedToken: any = jwtDecode(accessToken);
        const userId = decodedToken.userId;

        const response = await axios.get(`https://localhost:44329/api/Address/GetAddressByUserId?userId=${userId}&pageIndex=0&pageSize=10`, {
            headers: {
                'accept': '*/*',
                'authorization': `Bearer ${accessToken}`
            }
        });

        // chưa phân trang
        const { totalItemsCount, pageSize, totalPagesCount, pageIndex, next, previous, items } = response.data.data;

        // Xử lý các item trong mảng items
        const formattedItems = items ? items.map((item: any) => ({
            addressId: item.addressId,
            userId: item.userId,
            fullName: item.fullName,
            phoneNumber: item.phoneNumber,
            addressLine: item.addressLine,
            city: item.city,
            district: item.district,
            ward: item.ward,
            isDefault: item.isDefault
        })) : [];

        return formattedItems;
    } catch (error) {
        console.error('Error fetching user address:', error);
        throw new Error('Failed to fetch user address.');
    }
};

const UserAddressPage: React.FC = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    //const [addresses, setAddresses] = useState(fakeAddresses); // Use state for addresses
    const [userAddresses, setUserAddresses] = useState<any>(null);
    const [selectedAddress, setSelectedAddress] = useState<any>(null); // Use state for selected address

    const navigate = useNavigate();
    const navigateToSignInPage = () => {
        navigate('/sign-in');
    };

    const handleLogout = () => {
        // Clear local items
        localStorage.removeItem('accessToken');
        // Redirect to sign-in page
        navigateToSignInPage();
    };


    // const fetchData = async () => {
    //     try {
    //         const userAddressData = await getUserAddress();
    //         setUserAddresses(userAddressData);
    //     } catch (error) {
    //         console.error('Error fetching user address:', error);
    //         // Xử lý lỗi khi cần thiết
    //     }
    // };

    useEffect(() => {
        const fetchData = async () => {
            // const accessToken = localStorage.getItem('accessToken');
            // if (!accessToken) {
            //     navigateToSignInPage(); return;
            // }

            try {
                const userAddressData = await getUserAddress();
                setUserAddresses(userAddressData);
            } catch (error) {
                console.error('Error fetching user address:', error);
                // Xử lý lỗi khi cần thiết
            }
        };

        // fetchData(setUserAddresses);

        const interval = setInterval(fetchData, 0); // Cập nhật mỗi 1 giây

        return () => clearInterval(interval);

    }, []);


    const openAddModal = () => {
        setIsAddModalOpen(true);
    };

    const closeAddModal = () => {
        setIsAddModalOpen(false);
    };

    const openEditModal = (address: any) => {
        setSelectedAddress(address); // Set selected address for editing
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedAddress(null); // Clear selected address
    };

    const handleDeleteAddress = async (addressId: number) => {
        try {
            await axios.delete(`https://localhost:44329/api/Address/DeleteAddress?addressId=${addressId}`, {
                headers: {
                    'accept': '*/*'
                }
            });
            // setUserAddresses(userAddresses.filter((address: { id: number; }) => address.id !== addressId)); // Cập nhật state addresses sau khi xóa
            await fetchData(setUserAddresses); // Reload danh sách địa chỉ sau khi xóa thành công
            message.success('Xóa địa chỉ thành công');

        } catch (error) {
            console.error('Error deleting address:', error);
            message.error('Xóa địa chỉ thất bại');
        }
    };

    if (!userAddresses) {
        // navigateToSignInPage();        
        return (
            <div className="container mx-auto w-4/5 p-4 pt-10">
                <div className="flex flex-col gap-10 lg:flex-row">
                    <div>Loading...</div>
                </div>
            </div>); // Placeholder for loading state
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
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                {/* <i className="fa-solid fa-user mr-2"></i> */}
                                <UserOutlined className="mr-2" />
                                <span>Thông tin tài khoản</span>
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
                                className="flex items-center rounded bg-pink-500 p-2 text-white"
                            >
                                {/* <i className="fa-solid fa-location-dot mr-2"></i> */}
                                <EnvironmentOutlined className="mr-2" />
                                <b>Quản lí địa chỉ</b>
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
                                href=""
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                                onClick={handleLogout}
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
                        <div className="mb-4 flex items-center justify-between">
                            <button
                                className="flex items-center rounded bg-pink-500 px-4 py-2 text-white transition duration-300 hover:bg-pink-600"
                                onClick={openAddModal}
                            >
                                <EnvironmentOutlined className="mr-2" />
                                <span>Thêm địa chỉ</span>
                            </button>
                        </div>
                        <nav className="mb-4 flex">
                            <b className="inline-flex items-center rounded-t border-l border-r border-t border-pink-500 px-4 py-2 pb-1.5 text-pink-500">
                                <span className="mr-2">Địa chỉ của bạn</span>
                            </b>
                            <div className="flex-grow border-b border-pink-500"></div>
                        </nav>
                        <div className="space-y-4">
                            {userAddresses.length === 0 ? (
                                <div className="bg-gray-50 p-4 shadow rounded text-center">
                                    <p className="text-base font-semibold  text-gray-600">Chưa có địa chỉ nào được thiết lập.</p>
                                    <p className="text-sm text-gray-600">Hãy thiết lập địa chỉ để nhận và đặt hàng.</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* Address Item */}
                                    {userAddresses.map((address: any) => (
                                        <div key={address.addressId} className="flex rounded bg-gray-50 p-4 shadow">
                                            <div className="flex-grow">
                                                <label className="font-semibold">Họ và tên: </label>
                                                <span>{address.fullName}</span>
                                                {address.isDefault && (
                                                    // <span className="ml-1 rounded-full bg-green-300 px-2 py-1 text-xs text-green-800">
                                                    <span className="ml-2 rounded bg-pink-500 px-2 py-1 text-xs text-white">
                                                        mặc định
                                                    </span>
                                                )}
                                                <br />
                                                <label className="font-semibold">Địa chỉ: </label>
                                                <span>{address.addressLine}, {address.ward}, {address.district}, {address.city}</span>
                                                <br />
                                                <label className="font-semibold">Số điện thoại: </label>
                                                <span>{address.phoneNumber}</span>
                                            </div>
                                            <div className="ml-4 flex flex-col justify-center space-y-2">
                                                <button
                                                    className="text-pink-500 hover:text-blue-600"
                                                    onClick={() => openEditModal(address)}
                                                >
                                                    <EditOutlined />
                                                </button>
                                                <button className="text-pink-500 hover:text-red-600" onClick={() => handleDeleteAddress(address.addressId)}>
                                                    <DeleteOutlined />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            { }
            {/* <AddAddressModel isOpen={isAddModalOpen} onClose={closeAddModal} /> */}
            {/* <EditAddressModel isOpen={isEditModalOpen} onClose={closeEditModal} /> */}
            <EditAddressModel isOpen={isEditModalOpen} onClose={closeEditModal} address={selectedAddress}/>

            <AddAddressModel isOpen={isAddModalOpen} onClose={closeAddModal}/>
            {/* {selectedAddress && (
                <EditAddressModel isOpen={isEditModalOpen} onClose={closeEditModal} address={selectedAddress} />
            )} */}
        </div>
    );
};

export default UserAddressPage;

// Add and Edit Address Modal
// const AddAddressModel: React.FC<UserAddressModalProps> = ({ isOpen, onClose }) => {
const AddAddressModel: React.FC<UserAddressModalProps> = ({ isOpen, onClose }) => {
    // State for controlling the modal animation
    const [modalClass, setModalClass] = useState('');
    const [form] = Form.useForm();

    const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
    const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);
    // const [fullName, setFullName] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [addressLine, setAddressLine] = useState('');
    // const [city, setCity] = useState('');
    // const [district, setDistrict] = useState('');
    // const [ward, setWard] = useState('');
    // const [isDefault, setIsDefault] = useState(false);

    useEffect(() => {
        // Add or remove transition class based on modal state
        setModalClass(
            isOpen
                ? 'translate-y-0 transition-all duration-500 ease-in-out'
                : '-translate-y-full transition-all duration-500 ease-in-out',
        );

        if (isOpen) {
            // setFullName('');
            // setPhoneNumber('');
            // setAddressLine('');
            // setCity('');
            // setDistrict('');
            // setWard('');
            // setIsDefault(false);
            form.resetFields();
        }
    }, [isOpen, form]);

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

    // const handleCityChange = (value: string) => {
    //     setSelectedCity(value);
    //     setSelectedDistrict(undefined); // Reset district when city changes
    //     form.setFieldsValue({ district: undefined, ward: undefined }); // Reset district and ward in form
    //   };

    //   const handleDistrictChange = (value: string) => {
    //     setSelectedDistrict(value);
    //     form.setFieldsValue({ ward: undefined }); // Reset ward in form
    //   };

    // test
    const handleSubmit = async (values: any) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('Access token not found.');
            }

            const decodedToken: any = jwtDecode(accessToken);
            const userId = decodedToken.userId;

            const cityName = cities.find(city => city.code === values.city)?.name_with_type;
            const districtName = districts.find(district => district.code === values.district)?.name_with_type;
            const wardName = wards.find(ward => ward.code === values.ward)?.name_with_type;

            const newAddress: UserAddress = {
                userId: userId, // Gán giá trị phù hợp nếu cần thiết
                ...values,
                city: cityName,
                district: districtName,
                ward: wardName
                // fullName,
                // phoneNumber,
                // addressLine,
                // city,
                // district,
                // ward,
                // isDefault,
            };

            const response = await axios.post(`https://localhost:44329/api/Address/AddAddress`, newAddress, {
                headers: {
                    'accept': '*/*',
                    'content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.data.success) {
                message.success('Thêm địa chỉ thành công');
                onClose();
            }

            // onAdd(response.data.data); // Cập nhật danh sách địa chỉ với địa chỉ mới
            // window.location.reload(); // Reload trang sau khi thêm thành công
        } catch (error) {
            console.error('Error adding address:', error);
            message.error('Thêm địa chỉ thất bại');
        }
    };

    const handleCityChange = (value: string) => {
        setSelectedCity(value);
        setSelectedDistrict(undefined);
        form.setFieldsValue({ city: value, district: undefined, ward: undefined });
    };

    const handleDistrictChange = (value: string) => {
        setSelectedDistrict(value);
        form.setFieldsValue({ district: value, ward: undefined });
    };

    return (
        <Modal
            title="Thêm địa chỉ"
            visible={isOpen}
            onCancel={onClose}
            footer={null}
            width={540}
            style={{ textAlign: 'center' }}
            className={modalClass}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
            >
                <Form.Item
                    label="Họ và tên"
                    name="fullName"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                    style={{ textAlign: 'left' }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[
                        // { required: true, message: 'Vui lòng nhập số điện thoại' },
                        // { type: 'string', pattern: new RegExp(/^[0-9]+$/), message: 'Số điện thoại chưa hợp lệ' },
                        {

                            validator: (_, value) => {
                                if (!value) {
                                    return Promise.reject('Vui lòng nhập số điện thoại');
                                }
                                const isPhone = /^0\d{9}$/.test(value) || /^\+84\s?\d{9,10}$/.test(value);
                                if (!isPhone) {
                                    return Promise.reject('Định dạng số điện thoại không hợp lệ');
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                    style={{ textAlign: 'left' }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    name="addressLine"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                    style={{ textAlign: 'left' }}
                >
                    <Input />
                </Form.Item>
                {/* <Form.Item
                    label="Thành phố"
                    name="city"
                    rules={[{ required: true, message: 'Vui lòng nhập thành phố' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Quận/Huyện"
                    name="district"
                    rules={[{ required: true, message: 'Vui lòng nhập quận/huyện' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phường/Xã"
                    name="ward"
                    rules={[{ required: true, message: 'Vui lòng nhập phường/xã' }]}
                >
                    <Input />
                </Form.Item> */}
                <Form.Item>
                    <AddressForm
                        selectedCity={selectedCity}
                        selectedDistrict={selectedDistrict}
                        onCityChange={handleCityChange}
                        onDistrictChange={handleDistrictChange} />
                </Form.Item>
                <Form.Item
                    name="isDefault"
                    valuePropName="checked"
                    style={{ textAlign: 'left' }}
                >
                    <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
                </Form.Item>
                <Form.Item>
                    <div className="flex justify-end space-x-2">
                        <Button onClick={onClose}>Hủy</Button>
                        <Button type="primary" htmlType="submit">Thêm địa chỉ</Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const EditAddressModel: React.FC<UserAddressModalProps> = ({ isOpen, onClose, address }) => {
    const [form] = Form.useForm();
    const [selectedCity, setSelectedCity] = useState<string | undefined>(undefined);
    const [selectedDistrict, setSelectedDistrict] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (isOpen) {
            const city = cities.find(city => city.name_with_type === address?.city);
            const district = districts.find(district => district.name_with_type === address?.district);
            const ward = wards.find(ward => ward.name_with_type === address?.ward);

            form.setFieldsValue({
                fullName: address?.fullName || '',
                phoneNumber: address?.phoneNumber || '',
                addressLine: address?.addressLine || '',
                city: city?.name,
                district: district?.name,
                ward: ward?.name,
                isDefault: address?.isDefault || false,
            });

            setSelectedCity(city?.code);
            setSelectedDistrict(district?.code);
        }
    }, [isOpen, address, form]);

    const updateAddress = async (updatedAddress: UserAddress) => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('Access token not found.');
            }

            const response = await axios.put(`https://localhost:44329/api/Address/UpdateAddress`, updatedAddress, {
                headers: {
                    'accept': '*/*',
                    'content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (response.data.success) {
                message.success('Cập nhật địa chỉ thành công');
                onClose();
            }

            // await fetchData(setUserAddresses); // Reload danh sách địa chỉ sau khi cập nhật thành công
            // window.location.reload(); // Reload trang sau khi cập nhật thành công
            // onAdd(response.data.data); // Cập nhật danh sách địa chỉ với địa chỉ mới

        } catch (error) {
            console.error('Error updating address:', error);
            message.error('Cập nhật địa chỉ thất bại');
        }
    };

    const handleCityChange = (value: string) => {
        setSelectedCity(value);
        setSelectedDistrict(undefined); // Reset district when city changes
        form.setFieldsValue({ city: value, district: undefined, ward: undefined });
    };

    const handleDistrictChange = (value: string) => {
        setSelectedDistrict(value);
        form.setFieldsValue({ district: value, ward: undefined });
    };

    const handleUpdate = async () => {
        try {
            const values = await form.validateFields();

            const city = cities.find(city => city.name === values.city);
            const district = districts.find(district => district.name === values.district);
            const ward = wards.find(ward => ward.name === values.ward);

            const cityName = cities.find(city => city.code === values.city)?.name_with_type;
            const districtName = districts.find(district => district.code === values.district)?.name_with_type;
            const wardName = wards.find(ward => ward.code === values.ward)?.name_with_type;

            const updatedAddress: UserAddress = {
                ...address,
                ...values,
                city: cityName || city?.name_with_type,
                district: districtName || district?.name_with_type,
                ward: wardName || ward?.name_with_type
            };
            await updateAddress(updatedAddress);
        } catch (error) {
            console.error('Error validating fields:', error);
        }
    };

    return (
        <Modal
            title="Cập nhật địa chỉ"
            visible={isOpen}
            onCancel={onClose}
            style={{ textAlign: 'center' }}
            footer={[
                <Button key="back" onClick={onClose}>
                    Hủy
                </Button>,
                <Button key="submit" type="primary" onClick={handleUpdate}>
                    Lưu thay đổi
                </Button>,
            ]}
            width={500}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="fullName"
                    label="Họ và tên"
                    rules={[{ required: true, message: 'Vui lòng nhập họ và tên' }]}
                    style={{ textAlign: 'left' }}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[
                        { required: true, message: 'Vui lòng nhập số điện thoại hoặc email' },
                        // { type: 'string', pattern: new RegExp(/^[0-9]+$/), message: 'Số điện thoại chưa hợp lệ' },
                        {
                            validator: (_, value) => {
                                // if (!value) {
                                //     return Promise.reject('Vui lòng nhập số điện thoại');
                                // }
                                const isPhone = /^0\d{9}$/.test(value) || /^\+84\s?\d{9,10}$/.test(value);
                                if (!isPhone) {
                                    return Promise.reject('Định dạng số điện thoại không hợp lệ');
                                }
                                return Promise.resolve();
                            },
                        },
                    ]}
                    style={{ textAlign: 'left' }} >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="addressLine"
                    label="Địa chỉ"
                    rules={[{ required: true, message: 'Vui lòng nhập địa chỉ' }]}
                    style={{ textAlign: 'left' }}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <AddressForm
                        selectedCity={selectedCity}
                        selectedDistrict={selectedDistrict}
                        onCityChange={handleCityChange}
                        onDistrictChange={handleDistrictChange}
                    />
                </Form.Item>
                <Form.Item name="isDefault" valuePropName="checked" style={{ textAlign: 'left' }}
                >
                    <Checkbox>Đặt làm địa chỉ mặc định</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};

