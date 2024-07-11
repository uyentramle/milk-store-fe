import React, { useState } from 'react';
import { Modal, Button, Input, message } from 'antd';
import {
    UserOutlined,
    SettingOutlined,
    EnvironmentOutlined,
    FileTextOutlined,
    RetweetOutlined,
    LogoutOutlined,
    MailOutlined,
    PhoneOutlined,
    KeyOutlined,
    TwitterOutlined,
    GoogleOutlined,
    // FacebookFilled,
} from '@ant-design/icons';

interface LinkedAccountProps {
    username: string;
}

interface LinkedEmailProps {
    email: string;
    setEmail: (newEmail: string) => void; // Hàm để cập nhật email mới, dòng này có thể bỏ do dùng để test
}

interface LinkedPhoneProps {
    phoneNumber: string;
    setPhoneNumber: (newPhoneNumber: string) => void; // Hàm để cập nhật số điện thoại mới, dòng này có thể bỏ do dùng để test
}

const AccountSettingsPage: React.FC = () => {
    // const username = 't****du';
    const username = '';
    // const email = 'minht****02@gmail.com';
    const [email, setEmail] = useState('minht****02@gmail.com'); // Sử dụng useState để quản lý giá trị email, dòng này có thể bỏ do dùng để test

    const [phoneNumber, setPhoneNumber] = useState('(+**)397****07'); // Sử dụng useState để quản lý giá trị số điện thoại, dòng này có thể bỏ do dùng để test

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
                                className="flex items-center rounded bg-pink-500 p-2 text-white"
                            >
                                {/* <i className="fa-solid fa-location-dot mr-2"></i> */}
                                <SettingOutlined className="mr-2" />
                                <b>Thiết lập tài khoản</b>
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
                        <nav className="mb-4 flex">
                            <b className="inline-flex items-center rounded-t border-l border-r border-t border-pink-500 px-4 py-2 pb-1.5 text-pink-500">
                                <span className="mr-2">Thiết lập an toàn tài khoản</span>
                            </b>
                            <div className="flex-grow border-b border-pink-500"></div>
                        </nav>
                        <div className="space-y-4">
                            {/* <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="rounded-full bg-pink-400 p-2 text-xs text-white">
                                        <UserOutlined style={{ fontSize: '20px' }} />
                                    </div>
                                    <div>
                                        <div className="text-gray-700">Tên Người Dùng</div>
                                        <div className="text-gray-500">t****du</div>
                                    </div>
                                </div>
                                <button className="rounded bg-gray-300 px-3 py-1 text-sm text-gray-700">
                                    Đã Liên Kết
                                </button>
                            </div> */}
                            <LinkedAccount username={username} />

                            {/* <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="rounded-full bg-pink-400 p-2 text-xs text-white">
                                        <MailOutlined style={{ fontSize: '20px' }} />
                                    </div>
                                    <div>
                                        <div className="text-gray-700">Email</div>
                                        <div className="text-gray-500">minht****02@gmail.com</div>
                                    </div>
                                </div>
                                <button className="rounded bg-gray-300 px-3 py-1 text-sm text-gray-700">
                                    Đổi Liên Kết
                                </button>
                            </div> */}
                            {/* <LinkedEmail email={email} /> */}

                            <LinkedEmail email={email} setEmail={setEmail} /> {/* Thêm dòng này để test */}

                            {/* <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="rounded-full bg-pink-400 p-2 text-xs text-white">
                                        <PhoneOutlined style={{ fontSize: '20px' }} />
                                    </div>
                                    <div>
                                        <div className="text-gray-700">Số điện thoại</div>
                                        <div className="text-gray-500">(+**)397****07</div>
                                    </div>
                                </div>
                                <button className="rounded bg-gray-300 px-3 py-1 text-sm text-gray-700">
                                    Hủy Liên Kết
                                </button>
                            </div> */}
                            {/* <LinkedPhone phoneNumber={phoneNumber} /> */}

                            <LinkedPhone phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} /> {/* Thêm dòng này để test */}

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="rounded-full bg-pink-400 p-2 text-xs text-white">
                                        <KeyOutlined style={{ fontSize: '20px' }} />
                                    </div>
                                    <div>
                                        <div className="text-gray-700">Đổi Mật Khẩu</div>
                                    </div>
                                </div>
                                <a
                                    href="/change-password"
                                    className="rounded bg-gray-300 px-3 py-1 text-sm text-gray-700"
                                >
                                    Đổi
                                </a>
                            </div>
                        </div>
                        <h6 className="mb-4 mt-8 border-t pt-5 text-xl">Tài khoản liên kết</h6>
                        <div className="flex items-center justify-between">
                            <div className="">
                                <div className="flex items-center space-x-2">
                                    {/* <div className="bg-blue-600 text-white rounded-full p-2" >
                        <FacebookFilled style={{ fontSize: '24px' }} />
                    </div> */}
                                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-blue-600">
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                                            alt="Facebook"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="text-gray-700">Facebook</div>
                                        <div className="text-gray-500">Phạm Tum</div>
                                    </div>
                                </div>
                                <button className="mt-1 rounded bg-gray-300 px-2 py-1 text-sm text-gray-700">
                                    Hủy liên kết
                                </button>
                            </div>

                            <div className="">
                                <div className="flex items-center space-x-2">
                                    <div className="rounded-full bg-blue-400 p-2 text-white">
                                        <TwitterOutlined style={{ fontSize: '24px' }} />
                                    </div>
                                    <div>
                                        <div className="text-gray-700">Twitter</div>
                                        <div className="text-red-500">Chưa liên kết</div>
                                    </div>
                                </div>
                                <button className="mt-1 rounded bg-gray-300 px-2 py-1 text-sm text-gray-700">
                                    Liên Kết
                                </button>
                            </div>

                            <div className="">
                                <div className="flex items-center space-x-2">
                                    <div className="rounded-full bg-red-500 p-2 text-white">
                                        <GoogleOutlined style={{ fontSize: '24px' }} />
                                    </div>
                                    <div>
                                        <div className="text-gray-700">Google</div>
                                        <div className="text-gray-500">Ngô Bá Tô</div>
                                    </div>
                                </div>
                                <button className="mt-1 rounded bg-gray-300 px-2 py-1 text-sm text-gray-700">
                                    Hủy liên kết
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettingsPage;

export const LinkedAccount: React.FC<LinkedAccountProps> = ({ username }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const isLinked = username !== '';

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-pink-400 p-2 text-xs text-white">
                        <UserOutlined style={{ fontSize: '20px' }} />
                    </div>
                    <div>
                        <div className="text-gray-700">Tên Người Dùng</div>
                        <div className="text-gray-500">{isLinked ? username : 'Chưa liên kết'}</div>
                    </div>
                </div>
                <Button
                    className={`rounded px-3 py-1 text-sm ${isLinked ? 'cursor-not-allowed bg-gray-300 text-gray-700' : 'bg-pink-500 text-white'}`}
                    onClick={!isLinked ? showModal : undefined}
                    disabled={isLinked}
                >
                    {isLinked ? 'Đã liên kết' : 'Liên kết'}
                </Button>
            </div>

            <Modal
                title="Liên Kết Tài Khoản"
                className="text-center"
                visible={isModalVisible}
                okText="Lưu"
                cancelText="Hủy"
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <form className="mt-5 space-y-4">
                    <div className="flex items-center">
                        <label
                            htmlFor="username"
                            className="w-1/4 whitespace-nowrap pr-4 text-left"
                        >
                            Tên người dùng
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-3/4 rounded border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center">
                        <label
                            htmlFor="password"
                            className="w-1/4 whitespace-nowrap pr-4 text-left"
                        >
                            Mật khẩu{' '}
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="w-3/4 rounded border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center">
                        <label
                            htmlFor="confirmPassword"
                            className="w-1/4 whitespace-nowrap pr-4 text-left"
                        >
                            Nhập lại mật khẩu
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-3/4 rounded border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                        />
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export const LinkedEmail: React.FC<LinkedEmailProps> = ({ email, setEmail }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [emailError, setEmailError] = useState('');


    const showModal = () => {
        setIsModalVisible(true);
        setEmailSent(false); // Reset state khi mở modal
        setVerificationCode(['', '', '', '', '', '']); // Reset state khi mở modal
        setEmailError(''); // Reset state khi mở modal

        setNewEmail('');
    };

    const handleOk = () => {
        if (!emailSent) {
            if (!validateEmail(newEmail)) {
                setEmailError('Địa chỉ email không hợp lệ.');
                return;
            }
            // Gửi yêu cầu xác thực email mới
            console.log('Gửi yêu cầu xác thực cho email:', newEmail);
            setEmailSent(true);
        } else {
            // Xử lý khi người dùng nhập xong mã xác thực và ấn nút xác nhận
            const code = verificationCode.join('');
            if (code === '123456') {
                console.log('Xác nhận mã xác thực thành công:', code);
                setIsModalVisible(false);
                // Thực hiện đổi email ở đây
                // Ví dụ:
                // setEmail(newEmail);
                setEmail(newEmail);

                message.success('Liên kết email thành công');
            } else {
                message.error('Mã xác thực không đúng. Vui lòng thử lại.');
            }
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChangeCode = (index: number, value: string) => {
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);
    };

    // Hàm Test, có thể bỏ
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-pink-400 p-2 text-xs text-white">
                        <MailOutlined style={{ fontSize: '20px' }} />
                    </div>
                    <div>
                        <div className="text-gray-700">Email</div>
                        <div className="text-gray-500">{email ? email : 'Chưa liên kết'}</div>
                    </div>
                </div>
                <Button
                    className={`rounded px-3 py-1 text-sm ${email ? 'bg-gray-300 text-gray-700' : 'bg-pink-500 text-white'}`}
                    onClick={showModal}
                >
                    {email ? 'Đổi liên kết' : 'Liên kết'}
                </Button>
            </div>

            <Modal
                title={emailSent ? 'Xác nhận Mã Xác Thực' : 'Liên Kết Email'}
                className="text-center"
                visible={isModalVisible}
                okText={emailSent ? 'Xác nhận' : 'Gửi mã xác thực'}
                cancelText="Hủy"
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {!emailSent ? (
                    <form className="mt-5 space-y-4">
                        <div className="flex items-center">
                            <label
                                htmlFor="newEmail"
                                className="w-1/4 whitespace-nowrap pr-4 text-left"
                            >
                                Nhập Email
                            </label>
                            <input
                                type="email"
                                id="newEmail"
                                name="newEmail"
                                value={newEmail}
                                // onChange={(e) => setNewEmail(e.target.value)}
                                onChange={(e) => {
                                    setNewEmail(e.target.value);
                                    setEmailError('');
                                }}
                                className="w-3/4 rounded border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                            />
                        </div>
                        {emailError && (
                            <div className="text-red-500 text-sm text-center w-full mt-1">
                                {emailError}
                            </div>
                        )}
                    </form>
                ) : (
                    <form className="mt-5 space-y-4">
                        <div className="flex items-center space-x-2">
                            {verificationCode.map((digit, index) => (
                                <Input
                                    key={index}
                                    className="w-1/6 text-center"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChangeCode(index, e.target.value)}
                                />
                            ))}
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};

export const LinkedPhone: React.FC<LinkedPhoneProps> = ({ phoneNumber, setPhoneNumber }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [phoneNumberSent, setPhoneNumberSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [phoneNumberError, setPhoneNumberError] = useState('');


    const showModal = () => {
        setIsModalVisible(true);
        setPhoneNumberSent(false); // Reset state khi mở modal
        setVerificationCode(['', '', '', '', '', '']); // Reset state khi mở modal
        setPhoneNumberError(''); // Reset state khi mở modal

        setNewPhoneNumber('');
    };

    const handleOk = () => {
        if (!phoneNumberSent) {
            if (!validatePhoneNumber(newPhoneNumber)) {
                setPhoneNumberError('Số điện thoại không hợp lệ.');
                return;
            }
            // Gửi yêu cầu xác thực email mới
            console.log('Gửi yêu cầu xác thực cho số điện thoại:', newPhoneNumber);
            setPhoneNumberSent(true);
        } else {
            // Xử lý khi người dùng nhập xong mã xác thực và ấn nút xác nhận
            const code = verificationCode.join('');
            if (code === '123456') {
                console.log('Xác nhận mã xác thực thành công:', code);
                setIsModalVisible(false);
                // Thực hiện đổi email ở đây
                // Ví dụ:
                // setEmail(newEmail);
                setPhoneNumber(newPhoneNumber);

                message.success('Liên kết số điện thoại thành công');
            } else {
                message.error('Mã xác thực không đúng. Vui lòng thử lại.');
            }
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleChangeCode = (index: number, value: string) => {
        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);
    };

    // Hàm Test, có thể bỏ
    const validatePhoneNumber = (phoneNumber: string) => {
        // Số điện thoại bắt đầu bằng dấu + hoặc số 0, theo sau là các chữ số, dấu cách, dấu chấm hoặc dấu gạch ngang
        const re = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,4}$/;
        return re.test(String(phoneNumber).trim());
    };

    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-pink-400 p-2 text-xs text-white">
                        <PhoneOutlined style={{ fontSize: '20px' }} />
                    </div>
                    <div>
                        <div className="text-gray-700">Số điện thoại</div>
                        <div className="text-gray-500">{phoneNumber ? phoneNumber : 'Chưa liên kết'}</div>
                    </div>
                </div>
                <Button
                    className={`rounded px-3 py-1 text-sm ${phoneNumber ? 'bg-gray-300 text-gray-700' : 'bg-pink-500 text-white'}`}
                    onClick={showModal}
                >
                    {phoneNumber ? 'Đổi số điện thoại' : 'Liên kết'}
                </Button>
            </div>

            <Modal
                title={phoneNumberSent ? 'Xác nhận Mã Xác Thực' : 'Liên Kết Số Điện Thoại'}
                className="text-center"
                visible={isModalVisible}
                okText={phoneNumberSent ? 'Xác nhận' : 'Gửi mã xác thực'}
                cancelText="Hủy"
                onOk={handleOk}
                onCancel={handleCancel}
            >
                {!phoneNumberSent ? (
                    <form className="mt-5 space-y-4">
                        <div className="flex items-center gap-4">
                            <label
                                htmlFor="newEmail"
                                className="w-1/4 whitespace-nowrap pr-4 text-left"
                            >
                                Nhập số điện thoại
                            </label>
                            <input
                                type="phone"
                                id="newPhoneNumber"
                                name="newPhoneNumber"
                                value={newPhoneNumber}
                                // onChange={(e) => setNewEmail(e.target.value)}
                                onChange={(e) => {
                                    setNewPhoneNumber(e.target.value);
                                    setPhoneNumberError('');
                                }}
                                className="w-3/4 rounded border border-gray-300 px-3 py-2 focus:border-pink-500 focus:outline-none"
                            />
                        </div>
                        {phoneNumberError && (
                            <div className="text-red-500 text-sm text-center w-full mt-1">
                                {phoneNumberError}
                            </div>
                        )}
                    </form>
                ) : (
                    <form className="mt-5 space-y-4">
                        <div className="flex items-center space-x-2">
                            {verificationCode.map((digit, index) => (
                                <Input
                                    key={index}
                                    className="w-1/6 text-center"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChangeCode(index, e.target.value)}
                                />
                            ))}
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};
