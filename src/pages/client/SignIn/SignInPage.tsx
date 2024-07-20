import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, message, } from 'antd';
import { GoogleOutlined, LineOutlined } from '@ant-design/icons';
import {
    GoogleOAuthProvider,
    useGoogleLogin,
    // GoogleLogin
} from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';

// useEffect(() => {
//     document.title = "Đăng nhập";
// }, []);

// Giả lập API đăng nhập
// const fakeLoginApi = async (username: string, password: string): Promise<{ success: boolean, message?: string }> => {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             if (username === 'admin' && password === 'password') {
//                 resolve({ success: true });
//             } else {
//                 resolve({ success: false, message: 'Tên đăng nhập hoặc mật khẩu không đúng' });
//             }
//         }, 1000);
//     });
// };

interface ApiResponse {
    success: boolean;
    message: string;
    accessToken: string | null;
    refreshToken: string | null;
}

const loginApi = async (username: string, password: string): Promise<ApiResponse> => {
    try {
        const response = await axios.post('https://localhost:44329/api/Auth/Login', {
            username,
            password,
        }, {
            headers: {
                'accept': '*/*', // xem trong api yêu cầu gì thì copy vào
                'content-Type': 'application/json' // xem trong api yêu cầu gì thì copy vào
            }
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            return { success: false, message: error.response.data.message, accessToken: null, refreshToken: null || 'Đã xảy ra lỗi, vui lòng thử lại sau.' };
        }
        return { success: false, message: 'Đã xảy ra lỗi, vui lòng thử lại sau.', accessToken: null, refreshToken: null };
    }
};

const SignInPage: React.FC = () => {
    // const onFinish = (values: any) => {
    //     console.log('Success:', values);
    // };

    // const onFinishFailed = (errorInfo: any) => {
    //     console.log('Failed:', errorInfo);
    // };

    const navigate = useNavigate();

    const onFinish = async (values: any) => {
        try {
            const response = await loginApi(values.username, values.password);

            if (response.success) {
                console.log('Login Success');
                message.success('Đăng nhập thành công');
                
                // Lưu trữ accessToken vào localStorage
                if (response.accessToken && response.refreshToken) {
                    localStorage.setItem('accessToken', response.accessToken);
                    localStorage.setItem('refreshToken', response.refreshToken);
                    navigate('/'); // Điều hướng đến trang chủ sau khi đăng nhập thành công
                } else {
                    message.error('Không có accessToken trong phản hồi.');
                }
            } else {
                console.error('Login Failed:', response.message);
                // alert(response.message);
                // message.error('Đăng nhập thất bại')
                switch (response.message) {
                    case 'Wrong password!':
                        message.error('Mật khẩu không đúng.');
                        break;
                    case 'User not found by username, email, or phone number':
                        message.error('Tên đăng nhập không chính xác');
                        break;
                    // message.error('Mật khẩu phải có ít nhất 6 ký tự và bao gồm ít nhất một ký tự viết hoa và một ký tự đặc biệt.');
                    // break;
                    default:
                        message.error('Đã xảy ra lỗi, vui lòng thử lại sau.');
                        break;
                }
            }
        } catch (error) {
            console.error('Login Error:', error);
            message.error('Đã xảy ra lỗi, vui lòng thử lại sau.');
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Login Failed:', errorInfo);
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
                    <LineOutlined className='mx-2' />

                    <span>Hoặc đăng nhập bằng</span>
                    <LineOutlined className='mx-2' />

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
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    const login = useGoogleLogin({
        onSuccess: (credentialResponse) => {
            console.log(credentialResponse);
            // Handle successful login response here
            callGoogleLoginApi(credentialResponse.code); // Gọi hàm để gửi tokenId đến server
        },
        flow: 'auth-code'
    });

    const callGoogleLoginApi = async (googleToken: string) => {
        try {
            const response = await fetch('https://localhost:44329/api/Auth/GoogleLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    googleToken: googleToken,
                    isCredential: false
                })
            });

            if (!response.ok) {
                throw new Error('Google Login failed');
            }

            const data = await response.json();
            console.log('Google Login API Response:', data);
            console.log('Login Success');
            message.success('Đăng nhập thành công');

            // Lưu trữ access token vào localStorage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            // Chuyển hướng đến trang chủ sau khi đăng nhập thành công bằng useNavigate
            navigate('/'); // Điều hướng đến trang chủ
        } catch (error) {
            console.error('Google Login API Error:', error);
            message.error('Đăng nhập qua Google thất bại. Vui lòng thử lại sau.');
        }
    };

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
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    const handleFacebookResponse = async (response: any) => {
        try {
            if (response.accessToken) {
                console.log('Facebook Login Success:', response);
                await callFacebookLoginApi(response.accessToken); // Gọi hàm để gửi accessToken đến server
            } else {
                console.error('Facebook Login failed');
                message.error('Đăng nhập qua Facebook thất bại.');
            }
        } catch (error) {
            console.error('Facebook Login Error:', error);
            message.error('Đăng nhập qua Facebook thất bại. Vui lòng thử lại sau.');
        }
    };

    const callFacebookLoginApi = async (accessToken: string) => {
        try {
            const response = await fetch('https://localhost:44329/api/Auth/FacebookLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    accessToken: accessToken
                })
            });

            if (!response.ok) {
                throw new Error('Facebook Login failed');
            }

            const data = await response.json();
            
            console.log('Facebook Login API Response:', data);
            console.log('Login Success');
            message.success('Đăng nhập thành công');

            // Lưu trữ access token vào localStorage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            // Chuyển hướng đến trang chủ sau khi đăng nhập thành công bằng useNavigate
            navigate('/'); // Điều hướng đến trang chủ
        } catch (error) {
            console.error('Facebook Login API Error:', error);
            message.error('Đăng nhập qua Facebook thất bại. Vui lòng thử lại sau.');
        }
    };

    return (
        <FacebookLogin
            appId="919838429945137"
            // onSuccess={(response) => {
            //     console.log('Login Success!', response);
            // }}
            onSuccess={handleFacebookResponse}
            onFail={(error) => {
                console.log('Login Failed!', error);
                message.error('Đăng nhập qua Facebook thất bại.');
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