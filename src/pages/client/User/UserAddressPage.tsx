import React, { useState, useEffect } from 'react';
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

// Fake data
const fakeAddresses = [
    {
        id: 1,
        name: "Phạm Võ Minh T",
        address: "123 Đường ABC, Phường XYZ, Quận 1, TP. HCM",
        phone: "0123456789",
        default: true,
    },
    {
        id: 2,
        name: "PTDL",
        address: "456 Đường DEF, Phường UVW, Quận 2, TP. HCM",
        phone: "0987654321",
        default: false,
    },
];

interface UserAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserAddressPage: React.FC = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [addresses, setAddresses] = useState(fakeAddresses); // Use state for addresses
    const [selectedAddress, setSelectedAddress] = useState<any>(null); // Use state for selected address

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

    const handleAddAddress = (newAddress: any) => {
        setAddresses([...addresses, newAddress]);
    };

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
                            {/* Address Item */}
                            {addresses.map((address) => (
                                <div key={address.id} className="flex rounded bg-gray-50 p-4 shadow">
                                    <div className="flex-grow">
                                        <label className="font-semibold">Họ và tên: </label>
                                        <span>{address.name}</span>
                                        {address.default && (
                                            // <span className="ml-1 rounded-full bg-green-300 px-2 py-1 text-xs text-green-800">
                                            <span className="ml-2 rounded bg-pink-500 px-2 py-1 text-xs text-white">
                                                mặc định
                                            </span>
                                        )}
                                        <br />
                                        <label className="font-semibold">Địa chỉ: </label>
                                        <span>{address.address}</span>
                                        <br />
                                        <label className="font-semibold">Số điện thoại: </label>
                                        <span>{address.phone}</span>
                                    </div>
                                    <div className="ml-4 flex flex-col justify-center space-y-2">
                                        <button
                                            className="text-pink-500 hover:text-blue-600"
                                            onClick={() => openEditModal(address)}
                                        >
                                            <EditOutlined />
                                        </button>
                                        <button className="text-pink-500 hover:text-red-600">
                                            <DeleteOutlined />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Đặt AddAddressModal tại đây */}
            {/* <AddAddressModel isOpen={isAddModalOpen} onClose={closeAddModal} /> */}
            {/* <EditAddressModel isOpen={isEditModalOpen} onClose={closeEditModal} /> */}
            <EditAddressModel isOpen={isEditModalOpen} onClose={closeEditModal} address={selectedAddress} />

            <AddAddressModel isOpen={isAddModalOpen} onClose={closeAddModal} onAdd={handleAddAddress} />
            {/* {selectedAddress && (
                <EditAddressModel isOpen={isEditModalOpen} onClose={closeEditModal} address={selectedAddress} />
            )} */}
        </div>
    );
};

export default UserAddressPage;

// Add and Edit Address Modal
// const AddAddressModel: React.FC<UserAddressModalProps> = ({ isOpen, onClose }) => {
const AddAddressModel: React.FC<UserAddressModalProps & { onAdd: (address: any) => void }> = ({ isOpen, onClose, onAdd }) => {
    // State for controlling the modal animation
    const [modalClass, setModalClass] = useState('');

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [isDefault, setIsDefault] = useState(false);

    useEffect(() => {
        // Add or remove transition class based on modal state
        setModalClass(
            isOpen
                ? 'translate-y-0 transition-all duration-500 ease-in-out'
                : '-translate-y-full transition-all duration-500 ease-in-out',
        );

        if (isOpen) {
            setName('');
            setPhone('');
            setAddress('');
            setIsDefault(false);
        }
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

    // test
    const handleSubmit = () => {
        const newAddress = {
            id: Date.now(),
            name,
            phone,
            address,
            default: isDefault,
        };
        onAdd(newAddress);
        onClose();
    };

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}
        >
            <div className={`w-full max-w-screen-sm rounded bg-white p-6 shadow-lg ${modalClass}`}>
                <div className="modal-content">
                    <div className="modal-header text-black">
                        <h5 className="modal-title mb-4 text-center text-xl font-bold">
                            Thêm địa chỉ
                        </h5>
                    </div>
                    <div className="modal-body">
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex gap-2">
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Họ và tên
                                        </label>
                                        <input
                                            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5"
                                            type="text"
                                            placeholder=""

                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Số điện thoại
                                        </label>
                                        <input
                                            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5"
                                            type="text"
                                            placeholder=""

                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Địa chỉ
                                    </label>
                                    <input
                                        className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5"
                                        type="text"
                                        placeholder=""

                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                                {/* <div>
                      <label className="block text-sm font-medium text-gray-700">Quốc tịch</label>
                      <select className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5">
                        <option>Vietnam</option>
                      </select>
                    </div> */}
                                {/* <div>
                      <label className="block text-sm font-medium text-gray-700">Mã zip</label>
                      <input
                        className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5"
                        type="text"
                        placeholder=""
                      />
                    </div> */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tỉnh/Thành phố
                                    </label>
                                    <select className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5">
                                        <option>---</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Quận/Huyện
                                    </label>
                                    <select className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5">
                                        <option>---</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phường/Xã
                                    </label>
                                    <select className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5">
                                        <option>---</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <input
                                    className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                    type="checkbox"

                                    id="default-address"
                                    checked={isDefault}
                                    onChange={(e) => setIsDefault(e.target.checked)}
                                />
                                <label htmlFor="default-address" className="ml-2 block text-sm text-gray-900">
                                    Đặt làm địa chỉ mặc định
                                </label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer mt-4 flex justify-end space-x-2">
                        <button
                            type="button"
                            className="rounded border border-pink-500 bg-white px-2 py-1 text-sm text-pink-500 hover:bg-gray-50"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button
                            type="button"
                            className="rounded bg-pink-500 px-2 py-1 text-sm text-white hover:bg-pink-600"
                            onClick={handleSubmit} // test 
                        >
                            Thêm địa chỉ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const EditAddressModel: React.FC<UserAddressModalProps & { address: any }> = ({ isOpen, onClose, address }) => {
    const [modalClass, setModalClass] = useState('');

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

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}`}
        >
            <div className={`w-full max-w-screen-sm rounded bg-white p-6 shadow-lg ${modalClass}`}>
                <div className="modal-content">
                    <div className="modal-header text-black">
                        <h5 className="modal-title mb-4 text-center text-xl font-bold">
                            Cập nhật địa chỉ
                        </h5>
                    </div>
                    <div className="modal-body">
                        <form className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex gap-2">
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Họ và tên
                                        </label>
                                        <input
                                            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5"
                                            type="text"
                                            placeholder=""
                                            defaultValue={address?.name}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Số điện thoại
                                        </label>
                                        <input
                                            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5"
                                            type="text"
                                            placeholder=""
                                            defaultValue={address?.phone}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Địa chỉ
                                    </label>
                                    <input
                                        className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5"
                                        type="text"
                                        placeholder=""
                                        defaultValue={address?.address}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Tỉnh/Thành phố
                                    </label>
                                    <select className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5">
                                        <option>---</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Quận/Huyện
                                    </label>
                                    <select className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5">
                                        <option>---</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Phường/Xã
                                    </label>
                                    <select className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5">
                                        <option>---</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="default-address-edit"
                                        className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                                        defaultChecked={address?.default}
                                    />
                                    <label htmlFor="default-address-edit" className="text-gray-700">
                                        Đặt làm địa chỉ mặc định
                                    </label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer mt-6 flex justify-end">
                        <button
                            className="mr-2 rounded bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-400"
                            onClick={onClose}
                        >
                            Hủy
                        </button>
                        <button className="rounded bg-pink-500 px-4 py-2 text-sm font-semibold text-white hover:bg-pink-600">
                            Lưu thay đổi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
