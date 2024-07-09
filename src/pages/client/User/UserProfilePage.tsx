import React from 'react';
import { UserOutlined, EnvironmentOutlined, FileTextOutlined, RetweetOutlined, LogoutOutlined } from '@ant-design/icons';

const UserProfilePage: React.FC = () => {
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
                                href="#"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                {/* <i className="fa-solid fa-location-dot mr-2"></i> */}
                                <EnvironmentOutlined className="mr-2" />
                                <span>Quản lí địa chỉ</span>
                            </a>
                            <a
                                href="#"
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
                        <div className="mb-4 flex flex-col gap-12 sm:flex-row"> {/* items-center */}
                            {/* Phần Avatar và Change Photo */}
                            <div className="mb-4 ml-16 mr-0 flex-shrink-0 sm:mb-0 sm:mr-4">
                                <div className="flex h-44 w-44 items-center justify-center rounded-full bg-gray-200">
                                    <span className="text-xl text-gray-400">140x140</span>
                                </div>
                                <div className="mt-4 flex flex-col items-center justify-center">
                                    <button className="mt-2 rounded bg-pink-500 px-3 py-1.5 text-white">
                                        <i className="fa fa-fw fa-camera mr-2"></i>
                                        <span>Change Photo</span>
                                    </button>
                                </div>
                            </div>

                            {/* Phần Thông tin cá nhân */}
                            <div className="flex-1 sm:text-left">
                                <nav className="mb-4">
                                    <b className="border-b-2 border-pink-500 pb-1.5 text-pink-500">
                                        Thông tin cá nhân
                                    </b>
                                </nav>
                                <form className="space-y-3">
                                    <div className="flex flex-col sm:flex-row sm:space-x-3">
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Họ
                                            </label>
                                            <input
                                                className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5"
                                                type="text"
                                                name="lastname"
                                                defaultValue="John Smith"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Tên
                                            </label>
                                            <input
                                                className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5"
                                                type="text"
                                                name="firstname"
                                                defaultValue="johnny.s"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <input
                                            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5"
                                            type="email"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Số điện thoại
                                        </label>
                                        <input
                                            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5"
                                            type="text"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Địa chỉ
                                        </label>
                                        <input
                                            className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5"
                                            type="text"
                                            readOnly
                                        />
                                    </div>
                                    <div className="text-right">
                                        <button
                                            className="rounded bg-pink-500 px-4 py-2 text-white"
                                            type="submit"
                                        >
                                            Lưu
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
