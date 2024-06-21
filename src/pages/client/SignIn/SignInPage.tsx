import React from 'react';
import { Form, Input, Button, Checkbox, } from 'antd';
import { GoogleOutlined, FacebookOutlined} from '@ant-design/icons';
import { GoogleOAuthProvider, useGoogleLogin, GoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';

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
                        {/* này là button của chị guột nè */}
                        {/* <Button
                            type="primary"
                            shape="circle"
                            icon={<i className="fab fa-facebook-f"><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png' /></i>}
                            className="mr-2 border-none"
                        /> */}

                        {/* này là xài button mặc định của fb login */}
                        {/* <FacebookLogin
                            appId="919838429945137"
                            onSuccess={(response) => {
                                console.log('Login Success!', response);
                            }}
                              onFail={(error) => {
                                  console.log('Login Failed!', error);
                                }}
                              onProfileSuccess={(response) => {
                                  console.log('Get Profile Success!', response);
                                }}
                        /> */}

                        {/* còn custom ở dưới cùng nè */}
                        <CustomFacebookLoginButton />
                        
                        {/* này là button của chị guột nè */}
                        {/* <Button
                            type="primary" 
                            shape="circle" 
                            icon={<i className="fab fa-google"><GoogleOutlined /></i>}
                        /> */}

                        <GoogleOAuthProvider clientId="733494164563-3udejeeopbq2b1ognt9sn7vr3qr4atm8.apps.googleusercontent.com">
                            {/* này là button mặc định của GoogleLogin nè */}
                            {/* <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                    // Handle successful login response here
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                    // Handle login failure here
                                }}
                                // custom mặc định của GoogleLogin
                                type='icon'
                                shape='circle'
                                useOneTap // Optional: Enable one-tap login
                                auto_select // Optional: Automatically select Google account                       
                            /> */}

                             {/* custom button ở dưới cùng nè */}
                             <CustomLoginButton /> 
                        </GoogleOAuthProvider>
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

export const CustomLoginButton = () => {
    const login = useGoogleLogin({
        onSuccess: (credentialResponse) => {
          console.log(credentialResponse);
          // Handle successful login response here
        },
        //flow: 'auth-code'
    });

    return (
        <Button
            onClick={() => login()}
            type="primary" 
            shape="circle"
            size='large' 
            icon={<i className="fab fa-google"><GoogleOutlined /></i>}
        />
    )
}

export const CustomFacebookLoginButton = () => {
    return (
        <FacebookLogin
            appId="919838429945137"
            onSuccess={(response) => {
                console.log('Login Success!', response);
            }}
            onFail={(error) => {
                console.log('Login Failed!', error);
            }}
            onProfileSuccess={(response) => {
                console.log('Get Profile Success!', response);
            }}
            render={({ onClick }) => (
                <Button
                onClick={onClick}
                type="primary"
                shape="circle"
                size='large'
                // style={{ width: '38px', height: '38px', marginTop: 1.5}}
                icon={<i className="fab fa-facebook-f"><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png' /></i>}
                className="mr-2 border-none"
            />
            )}
        />
    )
}