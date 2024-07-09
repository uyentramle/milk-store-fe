import React from 'react';
import {
    UserOutlined,
    EnvironmentOutlined,
    FileTextOutlined,
    RetweetOutlined,
    LogoutOutlined,
} from '@ant-design/icons';

const ChangePasswordPage: React.FC = () => {
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
                                href="#"
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
                                className="flex items-center rounded bg-pink-500 p-2 text-white"
                            >
                                {/* <i className="fa-solid fa-retweet fa-sm mr-2"></i> */}
                                <RetweetOutlined className="mr-2" />
                                <b>Đổi mật khẩu</b>
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
                        {/* <nav className="mb-4">
                            <b className="border-b-2 border-pink-500 pb-1.5 text-pink-500">
                                Đổi mật khẩu
                            </b>
                        </nav> */}
                        <nav className="mb-4 flex">
                            <b className="inline-flex items-center rounded-t border-l border-r border-t border-pink-500 px-4 py-2 pb-1.5 text-pink-500">
                                <span className="mr-2">Đổi mật khẩu</span>
                            </b>
                            <div className="flex-grow border-b border-pink-500"></div>
                        </nav>
                        <form className="space-y-3" noValidate>
                            <div>
                                <b>
                                    Để đảm bảo tính bảo mật vui lòng đặt mật khẩu với ít nhất 8 kí
                                    tự
                                </b>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Mật khẩu hiện tại
                                </label>
                                <input
                                    className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5"
                                    type="password"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Mật khẩu mới
                                </label>
                                <input
                                    className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5"
                                    type="password"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nhập lại mật khẩu mới
                                </label>
                                <input
                                    className="mt-1 block w-full rounded border border-gray-300 px-2 py-1.5"
                                    type="password"
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    className="rounded bg-pink-500 px-2 py-2 text-white transition-colors duration-300 hover:bg-pink-600"
                                    type="submit"
                                >
                                    Lưu thay đổi
                                </button>
                                <a
                                    href="#"
                                    className="rounded px-2 py-2 text-pink-500 transition-colors duration-300 hover:bg-pink-600 hover:text-white"
                                >
                                    Quên mật khẩu
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangePasswordPage;
