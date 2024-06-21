import React from 'react';
import { Form, Input, Button, Checkbox, } from 'antd';
import { GoogleOutlined, } from '@ant-design/icons';

// useEffect(() => {
//     document.title = "Đăng nhập";
// }, []);

const SignInPage: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-pink-100 mt-2">
            <div className="bg-white p-8 rounded w-full max-w-md shadow-md ">
                <h2 className="text-2xl font-bold mb-6 text-center text-pink-500">Đăng nhập</h2>
                <Form
                    name="sign_in"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
                    >
                        <Input placeholder="Email/Số điện thoại/Tên đăng nhập" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
                    >
                        <Input.Password placeholder="Mật khẩu" />
                    </Form.Item>

                    <div className='grid grid-cols-2 justify-items-stretch'>
                        <Form.Item name="remember" valuePropName="checked">
                            <Checkbox>Ghi nhớ tài khoản</Checkbox>
                        </Form.Item>
                        <div className="justify-self-end text-right mb-4">
                            <Button type="link" href="/forgot-password">Quên mật khẩu?</Button>
                        </div>
                    </div>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="w-full">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>

                <div className="text-center mt-4">
                    <span>Hoặc đăng nhập bằng</span>
                    <div className="flex justify-center mt-2">
                        <Button
                            type="primary"
                            shape="circle"
                            icon={<i className="fab fa-facebook-f"><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png' /></i>}
                            className="mr-2 border-none"
                        />
                        <Button type="primary" shape="circle" icon={<i className="fab fa-google"><GoogleOutlined /></i>} />
                    </div>
                </div>

                <div className="text-center mt-4">
                    <span>Chưa có tài khoản?</span>
                    <Button type="link" href="/sign-up">Đăng ký</Button>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;