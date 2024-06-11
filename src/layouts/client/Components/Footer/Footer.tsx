import { Footer } from 'antd/es/layout/layout';
import React from 'react';

const MyFooter: React.FC = () => {
    return (
        <Footer className="bg-gray text-gray-600 py-8">
            <div className="container mx-auto flex flex-wrap justify-between">
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 className="text-lg font-bold mb-2">Công Ty Cổ Phần Milk Store</h2>
                    <p>Email: cskh@milkstore.fptu</p>
                    <p>Điện thoại: 028 7300 6609</p>
                    <p>Văn phòng: Lưu Hữu Phước, Đông Hoà, Dĩ An, Bình Dương</p>
                </div>
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 className="text-lg font-bold mb-2">Về Milk Store</h2>
                    <ul>
                        <li>Giới thiệu về Milk Store</li>
                        <li>Chính sách bảo mật</li>
                        <li>Điều khoản chung</li>
                    </ul>
                </div>
                <div className="w-full md:w-1/4 mb-6 md:mb-0">
                    <h2 className="text-lg font-bold mb-2">Chấp Nhận Thanh Toán</h2>
                    <div className="flex flex-wrap mb-4">
                        <img src="https://cdn1.concung.com/themes/desktop4.1/image/v40/style/visa-pay.png" alt="Visa" className="w-10 h-10 mr-2" />
                        <img src="https://cdn1.concung.com/themes/desktop4.1/image/v40/style/mastercard-pay.png" alt="Mastercard" className="w-10 h-10 mr-2" />
                        <img src="https://cdn1.concung.com/themes/desktop4.1/image/v40/style/vnpay.png" alt="VNPay" className="w-10 h-10 mr-2" />
                        <img src="https://cdn1.concung.com/themes/desktop4.1/image/v40/style/atm-pay.png" alt="ATM" className="w-10 h-10 mr-2" />
                    </div>
                    <h2 className="text-lg font-bold mb-2">Đối Tác Vận Chuyển</h2>
                    <div className="flex flex-wrap">
                        <img src="https://cdn1.concung.com/themes/desktop4.1/image/v40/style/grap.png" alt="Grab" className="w-10 h-10 mr-2" />
                        <img src="https://cdn1.concung.com/themes/desktop4.1/image/v40/style/ahamove.png" alt="Ahamove" className="w-10 h-10 mr-2" />
                    </div>
                </div>
                <div className="w-full md:w-1/4">
                    {/* <h2 className="text-lg font-bold mb-2">Tải Ứng Dụng Nhận Ngay Nhiều Ưu Đãi Hấp Dẫn</h2>
                    <div className="flex flex-wrap mb-4">
                        <img src="/images/appstore.png" alt="App Store" className="w-32 h-10 mr-2" />
                        <img src="/images/playstore.png" alt="Play Store" className="w-32 h-10 mr-2" />
                    </div> */}
                    <h2 className="text-lg font-bold mb-2">Kết Nối Với Chúng Tôi</h2>
                    <div className="flex">
                        <img src="https://cdn1.concung.com/themes/desktop4.1/image/v40/style/facebook.png" alt="Facebook" className="w-10 h-10 mr-2" />
                        <img src="https://cdn1.concung.com/themes/desktop4.1/image/v40/style/zalo.png" alt="Zalo" className="w-10 h-10 mr-2" />
                        <img src="https://cdn1.concung.com/themes/desktop4.1/image/v40/style/youtube.png" alt="YouTube" className="w-10 h-10 mr-2" />
                    </div>
                </div>
            </div>
            <div className="container mx-auto mt-8">
                {' '}
                © {' '} {new Date().getFullYear()} - Milk Store
            </div>
        </Footer>
    );
};

export default MyFooter;
