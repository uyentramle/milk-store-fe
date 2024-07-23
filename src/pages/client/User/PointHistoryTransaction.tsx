import React, { useState, } from 'react';
import axios from 'axios'; // Import Axios
import { jwtDecode } from 'jwt-decode';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import SidebarMenu from './SidebarMenu';
import {
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

    return (
        <div className="container mx-auto w-4/5 p-4 pt-10">
            <div className="flex flex-col gap-10 lg:flex-row">
                {' '}
                <SidebarMenu onLogout={handleLogout} />
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

