import React, { useEffect, useState } from 'react';
import { Steps, Form, Input, Button, message, GetProp, } from 'antd';
import {
    LockOutlined,
    MailOutlined,
    UserOutlined,
    LineOutlined,
    CheckCircleFilled,
    LoadingOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import type { OTPProps } from 'antd/es/input/OTP';


const { Step } = Steps;

const ForgotPasswordPage: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [form] = Form.useForm();

    const onFinish = (values: any) => {
        if (currentStep === 0) {
            // Handle username/email submission

            message.success('Tên người dùng đã gửi');
            setCurrentStep(1);
        } else if (currentStep === 1) {
            // Handle verification code submission

            message.success('Đã gửi mã xác minh');
            setCurrentStep(2);
        } else if (currentStep === 2) {
            // Handle password reset

            message.success('Đặt lại mật khẩu thành công');
            setCurrentStep(3);
        }
    };

    const [countdown, setCountdown] = useState(60);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const onChange: GetProp<typeof Input.OTP, 'onChange'> = (text) => {
        console.log('onChange:', text);
    };

    const sharedProps: OTPProps = {
        onChange,
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-100 mt-2">
            <div className="bg-white p-8 rounded w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-pink-500">Quên mật khẩu</h2>
                <Steps current={currentStep} className="mb-8 custom-steps">
                    <Step title={currentStep == 0 ? <>Nhập tài khoản <LineOutlined className="ml-4" /></> : <LineOutlined className="ml-4 text-pink-500" />} />
                    <Step title={currentStep == 1 ? <>Xác Minh Bảo Mật <LineOutlined className="ml-4 text-pink-500" /></> : <LineOutlined className="ml-4 text-pink-500" />} />
                    <Step title={currentStep == 2 ? "Thiết lập mật khẩu" : ""} />
                </Steps>

                <Form form={form} onFinish={onFinish}>
                    {currentStep === 0 && (
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Tài khoản không được để trống' }]}
                        >
                            <Input
                                prefix={<UserOutlined />}
                                placeholder="Tên Người Dùng/Số điện thoại/Email"
                                className=""
                            />
                        </Form.Item>
                    )}
                    {currentStep === 1 && (
                        <>
                            <p className="mb-4">Vui lòng nhập mã xác nhận email để xác minh danh tính</p>
                            <p className="mb-4">mi****02@gmail.com</p>
                            <Form.Item
                                name="verificationCode"
                                rules={[{ required: true, message: 'Mã xác nhận không được để trống' }]}
                            >
                                {/* <Input
                                    prefix={<MailOutlined />}
                                    placeholder="Mã Xác Nhận"
                                    className=""
                                /> */}
                                <Input.OTP length={6} {...sharedProps} className=''/>
                            </Form.Item>
                            <Button type="link" className=""><LoadingOutlined /> Gửi lại ({countdown}s)</Button>
                        </>
                    )}
                    {currentStep === 2 && (
                        <>
                            <p className="mb-4">Vui lòng thiết lập mật khẩu tương đối mạnh</p>
                            <Form.Item
                                name="newPassword"
                                rules={[{ required: true, message: 'Mật khẩu không được để trống' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Vui lòng nhập mật khẩu"
                                    className=""
                                />
                            </Form.Item>
                            <Form.Item
                                name="confirmPassword"
                                rules={[
                                    { required: true, message: 'Mật khẩu không được để trống' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('newPassword') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Mật khẩu không khớp!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined />}
                                    placeholder="Vui lòng nhập lại mật khẩu"
                                    className=""
                                />
                            </Form.Item>
                            <p className="text-xs">
                                - Mật khẩu bao gồm 8-30 số, chữ cái hoặc ký tự<br />
                                - Tối thiểu gồm 2 loại ký tự<br />
                                - Đảm bảo hai lần nhập mật khẩu giống nhau
                            </p>
                        </>
                    )}
                    {currentStep === 3 && (
                        <div className="text-center">
                            <CheckCircleFilled className='text-green-500 mb-2' style={{ fontSize: '40px' }} />
                            <p>Mật khẩu mới của bạn đã được thiết lập thành công</p>
                        </div>
                    )}
                    <Form.Item className="mt-6">
                        {/* <Button type="primary" htmlType="submit" className="w-full" disabled={currentStep === 3}> */}
                        <Button type="primary" htmlType="submit" className="w-full" >
                            {currentStep < 3 ? 'Tiếp' : <Link to="/sign-in">Đăng nhập ngay</Link>}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
