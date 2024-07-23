import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserOutlined, SettingOutlined, EnvironmentOutlined, FileTextOutlined, RetweetOutlined, LogoutOutlined, DollarOutlined } from '@ant-design/icons';

interface SidebarMenuProps {
    onLogout: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ onLogout }) => {
    const location = useLocation();
    
    // Function to determine if the current path is active
    const isActive = (path: string) => location.pathname === path;

    return (
        <div className="mb-4 w-full lg:mb-0 lg:w-1/4">
            <div className="rounded bg-white p-4 shadow">
                <nav className="space-y-2">
                    <Link
                        to="/user-profile"
                        className={`flex items-center rounded p-2 ${
                            isActive('/user-profile') ? 'bg-pink-500 text-white font-bold' : 'text-gray-700 hover:bg-pink-400 hover:text-white'
                        }`}
                    >
                        <UserOutlined className="mr-2" />
                        <span>Thông tin tài khoản</span>
                    </Link>
                    <Link
                        to="/account-settings"
                        className={`flex items-center rounded p-2 ${
                            isActive('/account-settings') ? 'bg-pink-500 text-white font-bold' : 'text-gray-700 hover:bg-pink-400 hover:text-white'
                        }`}
                    >
                        <SettingOutlined className="mr-2" />
                        <span>Thiết lập tài khoản</span>
                    </Link>
                    <Link
                        to="/user-address"
                        className={`flex items-center rounded p-2 ${
                            isActive('/user-address') ? 'bg-pink-500 text-white font-bold' : 'text-gray-700 hover:bg-pink-400 hover:text-white'
                        }`}
                    >
                        <EnvironmentOutlined className="mr-2" />
                        <span>Quản lí địa chỉ</span>
                    </Link>
                    <Link
                        to="/order-history"
                        className={`flex items-center rounded p-2 ${
                            isActive('/order-history') ? 'bg-pink-500 text-white font-bold' : 'text-gray-700 hover:bg-pink-400 hover:text-white'
                        }`}
                    >
                        <FileTextOutlined className="mr-2" />
                        <span>Lịch sử đơn hàng</span>
                    </Link>
                    <Link
                        to="/change-password"
                        className={`flex items-center rounded p-2 ${
                            isActive('/change-password') ? 'bg-pink-500 text-white font-bold' : 'text-gray-700 hover:bg-pink-400 hover:text-white'
                        }`}
                    >
                        <RetweetOutlined className="mr-2" />
                        <span>Đổi mật khẩu</span>
                    </Link>
                    <Link
                        to="/point-history-transaction"
                        className={`flex items-center rounded p-2 ${
                            isActive('/point-history-transaction') ? 'bg-pink-500 text-white font-bold' : 'text-gray-700 hover:bg-pink-400 hover:text-white'
                        }`}
                    >
                        <DollarOutlined className="mr-2" />
                        <span>Lịch sử điểm thưởng</span>
                    </Link>
                    <button
                        className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white w-full text-left"
                        onClick={onLogout}
                    >
                        <LogoutOutlined className="mr-2" />
                        <span>Đăng xuất</span>
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default SidebarMenu;

{/* Thêm lớp gap-4 */}
                {/* <div className="mb-4 w-full lg:mb-0 lg:w-1/4">
                    <div className="rounded bg-white p-4 shadow">
                        <nav className="space-y-2">
                            <a
                                href="/user-profile"
                                className="flex items-center rounded bg-pink-500 p-2 text-white"
                            >
                                <UserOutlined className="mr-2" />
                                <b>Thông tin tài khoản</b>
                            </a>
                            <a
                                href="/account-settings"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                <SettingOutlined className="mr-2" />
                                <span>Thiết lập tài khoản</span>
                            </a>
                            <a
                                href="/user-address"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                <EnvironmentOutlined className="mr-2" />
                                <span>Quản lí địa chỉ</span>
                            </a>
                            <a
                                href="/order-history"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                <FileTextOutlined className="mr-2" />
                                <span>Lịch sử đơn hàng</span>
                            </a>
                            <a
                                href="/change-password"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                <RetweetOutlined className="mr-2" />
                                <span>Đổi mật khẩu</span>
                            </a>
                            <a
                                href="/point-history-transaction"
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                            >
                                <DollarOutlined className="mr-2" />
                                <span>Lịch sử điểm thưởng</span>
                            </a>
                            <a
                                href=""
                                className="flex items-center rounded p-2 text-gray-700 hover:bg-pink-400 hover:text-white"
                                onClick={handleLogout}
                            >
                                <LogoutOutlined className="mr-2" />
                                <span>Đăng xuất</span>
                            </a>
                        </nav>
                    </div>
                </div> */}
