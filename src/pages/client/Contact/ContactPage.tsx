import React from "react";
import { Typography } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ContactPage: React.FC = () => {
    return (
        <div className="bg-white flex flex-col items-center justify-center p-4">
            <div className="p-8 rounded-lg max-w-4xl w-full mx-4">
                <div className="flex flex-col md:flex-row items-center py-4">
                    <div className="md:w-1/2 p-4">
                        <Title level={2} className="text-pink-500">Liên hệ</Title>
                        <p>
                            Chúng tôi mở cửa từ 8 giờ đến 22 giờ các ngày trong tuần.
                        </p>
                        <p className="text-lg mt-4 text-pink-500">
                            <PhoneOutlined style={{ color: '#e83c7e', marginRight: '8px' }} /> 099 999 9999
                        </p>
                    </div>

                    <div className="md:w-1/2 p-4 relative">
                        <div className="relative w-full h-64 flex items-center justify-center">
                            <img src="https://en.cofarts.uobaghdad.edu.iq/wp-content/uploads/sites/79/2022/09/images-6.png" alt="Contact" className="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactPage;