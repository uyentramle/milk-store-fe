import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Button, Steps, message, Checkbox, } from 'antd';
// import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import {
  LineOutlined,
  UserOutlined,
  LockOutlined,
  CheckCircleFilled,
  CheckOutlined,
  LoadingOutlined,
  GoogleOutlined,
} from '@ant-design/icons';

const { Step } = Steps;

const SignUpPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();
  const [phoneNumberOrEmail, setPhoneNumberOrEmail] = useState<string>('');
  const [registerToken, setRegisterToken] = useState<string>('');


  // const navigate = useNavigate();

  // const onFinish = (values: any) => {
  //   console.log('Success:', values);

  //   if (currentStep === 0) {
  //     // Handle username/email submission
  //     message.success('Đã gửi mã xác minh');
  //     setCurrentStep(1);
  //   } else if (currentStep === 1) {
  //     // Handle verification code submission
  //     message.success('Xác minh thành công');
  //     setCurrentStep(2);
  //   } else if (currentStep === 2) {
  //     // Handle password reset
  //     message.success('Đăng ký tài khoản thành công');
  //     setCurrentStep(3);
  //   }
  // };

  // const navigateToSignInPage = () => {
  //   navigate('/sign-in');
  // };

  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    else {
      setCanResend(true); // Khi hết thời gian đếm ngược, cho phép gửi lại
    }
  }, [countdown]);

  const sendVerificationCode = async (phoneNumberOrEmail: any) => {
    try {
      const response = await axios.post('https://localhost:44329/api/Auth/SendRegisterVerificationCode', {
        phoneNumberOrEmail,
      });
      if (response.data.success) {
        message.success('Đã gửi mã xác minh');
        setCurrentStep(1);
      } else {
        message.error(response.data.message);
      }
    } catch (error: any) {
      // message.error('Đã xảy ra lỗi khi gửi mã xác minh.');
      // Xử lý các trường hợp lỗi cụ thể
      switch (error.response.data.message) {
        case 'Email already in use.':
          message.error('Email đã được sử dụng.');
          break;
        case 'Phone number already in use.':
          message.error('Số điện thoại đã được sử dụng.');
          break;
        case 'Invalid phone number or email format.':
          message.error('Định dạng số điện thoại hoặc email không hợp lệ.');
          break;
        default:
          message.error('Đã xảy ra lỗi khi gửi mã xác minh.');
          break;
      }
    }
  };

  const handleResendVerificationCode = () => {
    if (phoneNumberOrEmail) {
      sendVerificationCode(phoneNumberOrEmail);
      setCountdown(60); // Đặt lại đếm ngược về 60 giây
      setCanResend(false); // Vô hiệu hóa nút gửi lại
    } else {
      message.error('Vui lòng nhập số điện thoại hoặc email trước khi gửi lại.');
    }
  };

  const verifyRegisterCode = async (phoneNumberOrEmail: any, verificationCode: any) => {
    try {
      const response = await axios.post('https://localhost:44329/api/Auth/VerifyRegisterCode', {
        phoneNumberOrEmail,
        verificationCode
      });
      if (response.data.success) {
        message.success('Xác minh thành công');
        // form.setFieldsValue({ registerToken: response.data.data.token });
        setRegisterToken(response.data.data.token);
        setPhoneNumberOrEmail(phoneNumberOrEmail);
        // console.log(response.data.data.token);
        // console.log(phoneNumberOrEmail);
        setCurrentStep(2);
      } else {
        message.error(response.data.message);
      }
    } catch (error: any) {
      // message.error('Failed to verify code');
      switch (error.response.data.message) {
        case 'Invalid verification code.':
          message.error('Mã xác minh không hợp lệ.');
          break;
        default:
          message.error('Đã xảy ra lỗi. Vui lòng thử lại.');
          break;
      }
    }
  };

  const registerUser = async (values: any) => {
    try {
      const response = await axios.post('https://localhost:44329/api/Auth/Register', {
        registerToken: registerToken,
        phoneNumberOrEmail: phoneNumberOrEmail,
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        password: values.password,
      });
      if (response.data.success) {
        message.success('Đăng ký tài khoản thành công');
        setCurrentStep(3);
      } else {
        message.error(response.data.message);
      }
    } catch (error: any) {
      // message.error('Failed to register');
      switch (error.response.data.message) {
        case 'Invalid or expired email registration token.':
        case 'Invalid or expired phone registration token.':
          message.error('Phiên đăng ký không hợp lệ hoặc đã hết hạn. Vui lòng đăng ký lại tài khoản.');
          // trở về bước đầu tiên
          setCurrentStep(0);
          break;
        case `${phoneNumberOrEmail} already exists`:
          message.error(`${phoneNumberOrEmail} đã tồn tại.`);
          break;
        case 'Invalid phone number or email format.':
          message.error('Định dạng số điện thoại hoặc email không hợp lệ.');
          break;
        case `${values.username} already exists`:
          message.error(`Tên đăng nhập ${values.username} đã tồn tại.`);
          break;
        case 'Username must be at least 6 characters long.':
          message.error('Tên đăng nhập phải có ít nhất 6 ký tự.');
          break;
        case 'Password is not in correct format.':
          if (error.response.data.errors && error.response.data.errors.length > 0) {
            error.response.data.errors.forEach((err: string) => {
              const errorMessage = translateErrorToVietnamese(err);
              message.error(errorMessage);
            });
          }
          break;
        default:
          message.error('Đã xảy ra lỗi, vui lòng thử lại sau.');
          break;
      }
    }
  };

  const translateErrorToVietnamese = (error: string) => {
    switch (error) {
      case 'Passwords must be at least 6 characters.':
        return 'Mật khẩu phải có ít nhất 6 ký tự.';
      case 'Passwords must have at least one non alphanumeric character.':
        return 'Mật khẩu phải có ít nhất một ký tự đặc biệt.';
      case 'Passwords must have at least one digit (\'0\'-\'9\').':
        return 'Mật khẩu phải có ít nhất một chữ số (\'0\'-\'9\').';
      case 'Passwords must have at least one uppercase (\'A\'-\'Z\').':
        return 'Mật khẩu phải có ít nhất một ký tự viết hoa (\'A\'-\'Z\').';
        case 'Passwords must have at least one lowercase (\'a\'-\'z\').':
                return 'Mật khẩu phải có ít nhất một ký tự viết thường (\'a\'-\'z\').';
      default:
        return error; // Hoặc trả về lỗi gốc nếu không có bản dịch
    }
  };

  const onFinish = (values: any) => {
    console.log('Success:', values);

    if (currentStep === 0) {
      // Handle username/email submission
      // message.success('Đã gửi mã xác minh');
      // setCurrentStep(1);
      setPhoneNumberOrEmail(values.phoneNumberOrEmail);
      sendVerificationCode(values.phoneNumberOrEmail);
    } else if (currentStep === 1) {
      // Handle verification code submission
      // message.success('Xác minh thành công');
      // setCurrentStep(2);
      verifyRegisterCode(phoneNumberOrEmail, values.verificationCode);
    } else if (currentStep === 2) {
      // Handle password reset
      // message.success('Đăng ký tài khoản thành công');
      // setCurrentStep(3);
      registerUser(values);
    }
  };


  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 mt-2">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-500">Đăng ký</h2>

        <Steps current={currentStep} className="mb-8 custom-steps">
          <Step title={currentStep === 0 ? <LineOutlined className="ml-4 text-pink-500" /> : <LineOutlined className="ml-4 text-pink-500" />} />
          <Step title={currentStep === 1 ? <LineOutlined className="ml-4 text-pink-500" /> : <LineOutlined className="ml-4 text-pink-500" />} />
          <Step title={currentStep === 2 ? " " : ""} />
        </Steps>

        <Form
          form={form}
          name="sign_up"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {currentStep === 0 && (
            <>
              <Form.Item
                name="phoneNumberOrEmail"
                rules={[
                  // { required: true, message: 'Vui lòng nhập số điện thoại hoặc email' },
                  // { type: 'string', pattern: new RegExp(/^[0-9]+$/), message: 'Số điện thoại chưa hợp lệ' },
                  {
                    validator: (_, value) => {
                      if (!value) {
                        return Promise.reject('Vui lòng nhập số điện thoại hoặc email');
                      }
                      const isPhone = /^[0-9]+$/.test(value) || /^\+84\s?\d{9,10}$/.test(value);
                      const isEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);
                      if (!isPhone && !isEmail) {
                        return Promise.reject('Định dạng số điện thoại hoặc email không hợp lệ');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
                style={{ display: 'inline-block', width: 'calc(85% - 8px)', marginRight: '10px' }}
              >
                <Input placeholder="Số điện thoại hoặc email" />
              </Form.Item>
              <Form.Item
                style={{ display: 'inline-block', width: 'calc(15% - 8px)' }}>
                <Button type="primary" htmlType="submit" className="w-full"

                >
                  Gửi
                </Button>
              </Form.Item>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('Bạn phải đồng ý với các điều khoản của Milk Store') }]}
                style={{ marginBottom: '10px' }}

              >
                <Checkbox>Tôi đã đọc và đồng ý với các <a href='#'>Điều khoản</a> của Milk Store</Checkbox>
              </Form.Item>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('Bạn phải đồng ý với chính sách bảo vệ thông tin cá nhân của Milk Store') }]}
                style={{ marginBottom: '10px' }}
              >
                <Checkbox>Tôi đã đọc và đồng ý với <a href='#'>Chính sách bảo vệ thông tin cá nhân</a> của Milk Store</Checkbox>
              </Form.Item>
              <div className="text-center mt-4">
                <LineOutlined className='mx-2' />
                {/* <span> Hoặc </span> */}
                <span>Hoặc đăng nhập bằng</span>
                <LineOutlined className='mx-2' />
                <div className="flex justify-center mt-2">
                  <CustomFacebookLoginButton />
                  <GoogleOAuthProvider clientId="733494164563-3udejeeopbq2b1ognt9sn7vr3qr4atm8.apps.googleusercontent.com">
                    <CustomLoginButton />
                  </GoogleOAuthProvider>
                </div>
              </div>
              <div className="text-center mt-4">
                <p>Bạn đã có tài khoản? <Button type="link" href="/sign-in">Đăng nhập</Button></p>
              </div>
            </>
          )}
          {currentStep === 1 && (
            <>
              <p className="mb-4 text-center">Vui lòng nhập mã xác nhận số điện thoại hoặc email để xác minh danh tính</p>
              {/* <p className="mb-4">mi****02@gmail.com</p> */}
              <Form.Item
                name="verificationCode"
                className="mb-10"
                rules={[{ required: true, message: 'Mã xác nhận không được để trống' }]}
                style={{ display: 'inline-block', width: 'calc(68% - 8px)', marginRight: '10px' }}
              >
                <Input
                  placeholder="Mã Xác Nhận"
                  maxLength={6}
                  className=""
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </Form.Item>
              <Button type="text"
                className={`border border-gray-300 text-gray-500`}

                style={{ display: 'inline-block', width: 'calc(32% - 2px)' }}
                onClick={handleResendVerificationCode}
                disabled={!canResend}>
                {canResend ? <><CheckOutlined /> Gửi lại </> : <><LoadingOutlined /> Gửi lại ({countdown}s)</>}
              </Button>
              <Form.Item
              // style={{ display: 'inline-block', width: 'calc(15% - 2px)' }}
              >
                <Button type="primary" htmlType="submit" className="w-full"
                >
                  Tiếp
                </Button>
              </Form.Item>
            </>
          )}
          {currentStep === 2 && (
            <>
              {/* <p className="mb-4">Vui lòng thiết lập mật khẩu tương đối mạnh</p> */}
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginRight: '16px' }}
              >
                <Input placeholder="Họ" />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="Tên" />
              </Form.Item>

              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
              >
                <Input placeholder="Tên đăng nhập" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Mật khẩu không được để trống' }]}
              >
                <Input.Password
                  // prefix={<LockOutlined />}
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
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Mật khẩu không khớp!'));
                    },
                  }),
                ]}
              >
                <Input.Password
                  // prefix={<LockOutlined />}
                  placeholder="Vui lòng nhập lại mật khẩu"
                  className=""
                />
              </Form.Item>
              <p className="text-sm mb-5">
                - Mật khẩu bao gồm 6-30 số, chữ cái và ký tự đặc biệt<br />
                - Tối thiểu gồm 2 loại ký tự<br />
                - Đảm bảo hai lần nhập mật khẩu giống nhau
              </p>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full">
                  Đăng ký
                </Button>
              </Form.Item>
            </>
          )}
          {currentStep === 3 && (
            <div className="text-center">
              <CheckCircleFilled className='text-green-500 mb-2' style={{ fontSize: '40px' }} />
              <p>Tài khoản của bạn đã được thiết lập thành công</p>
              <Button type="link" className="block mx-auto text-center" style={{ maxWidth: 'max-content' }} href="/sign-in">Trở về Đăng nhập</Button>
            </div>

          )}
        </Form>
      </div>
    </div>
  );
};

export default SignUpPage;

export const CustomLoginButton = () => {
  const login = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
      // Handle successful login response here
    },
    flow: 'auth-code'
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
