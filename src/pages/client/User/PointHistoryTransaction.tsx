import React, { useState, } from 'react';
import axios from 'axios'; // Import Axios
import { jwtDecode } from 'jwt-decode';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
    UserOutlined,
    SettingOutlined,
    EnvironmentOutlined,
    FileTextOutlined,
    RetweetOutlined,
    LogoutOutlined,
    DollarOutlined,
    DollarTwoTone,
} from '@ant-design/icons';

interface PointByUser {
    userId: string;
    points: number;
    transactionType: "Earning" | "Spending";
    orderId: string;
    transactionDate: string;
}

const PointHistoryTransaction: React.FC = () => {

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
                                href="/point-history-transaction"
                                className="flex items-center rounded bg-pink-500 p-2 text-white"
                            >
                                {/* <i className="fa-solid fa-location-dot mr-2"></i> */}
                                <DollarOutlined className="mr-2" />
                                <b>Lịch sử điểm thưởng</b>
                            </a>
                            <a
                                href=""
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
                        <nav className="mb-4 flex">
                            <b className="inline-flex items-center rounded-t border-l border-r border-t border-pink-500 px-4 py-2 pb-1.5 text-pink-500">
                                <span className="mr-2">Điểm của bạn</span>
                            </b>
                            <div className="flex-grow border-b border-pink-500"></div>
                        </nav>
                        <div className="flex items-center justify-between">
                            <div className="">
                                <div className="flex items-center space-x-2 mb-4">
                                    <div>
                                        <DollarTwoTone twoToneColor="#e90" style={{ fontSize: '48px' }} />
                                    </div>
                                    <div>
                                        <div
                                            className="text-yellow-500 font-medium"
                                            style={{ fontSize: '26px' }}>
                                            160
                                        </div>
                                        <div
                                            className="text-yellow-500"
                                            style={{ fontSize: '16px' }}>
                                            điểm đang có
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h6 className="mb-4 mt-8 border-t pt-5 text-xl">Lịch sử</h6>
                        <div className="flex items-center justify-between">
                            <div className="">
                                <div className="flex items-center space-x-2 mb-4">
                                    <div>
                                        <DollarTwoTone twoToneColor="#52c41a" style={{ fontSize: '30px' }} />
                                    </div>
                                    <div>
                                        <div
                                            className="text-green-500 font-medium"
                                            style={{ fontSize: '18px' }}>
                                            12 điểm
                                        </div>
                                        <div
                                            className="text-green-500"
                                            style={{ fontSize: '15px' }}>
                                            Mã đơn hàng: asdjfk59gjkd - Ngày: 18/10/2021
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <div className="flex items-center space-x-2 mb-4">
                                <div>
                                    <DollarTwoTone twoToneColor="#f81d22" style={{ fontSize: '30px' }} />
                                </div>
                                <div>
                                    <div
                                        className="text-red-500 font-medium"
                                        style={{ fontSize: '18px' }}>
                                        - 12 điểm
                                    </div>
                                    <div
                                        className="text-red-500"
                                        style={{ fontSize: '15px' }}>
                                        Mã đơn hàng: asdjfk59gjkd - Ngày: 18/10/2021
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PointHistoryTransaction;

