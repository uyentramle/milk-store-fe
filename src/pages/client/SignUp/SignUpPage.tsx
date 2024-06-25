import React, { useState } from 'react';
import { Form, Input, Button, Steps, message } from 'antd';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from '@greatsumini/react-facebook-login';
import {
  LineOutlined,
  UserOutlined,
  LockOutlined,
  CheckCircleFilled,
  LoadingOutlined,
  GoogleOutlined,
} from '@ant-design/icons';

const { Step } = Steps;

const SignUpPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);

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

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-100 mt-2">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>

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
                name="username"
                rules={[{ required: true, message: 'Tài khoản không được để trống' }]}
              >
                <Input
                  prefix={<UserOutlined />}
                  placeholder="Số điện thoại/Email"
                  className=""
                />
              </Form.Item>
              <div className="text-center mt-4">
                <LineOutlined className='mx-4' />
                <span> Hoặc </span>
                <LineOutlined className='mx-4' />
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
              <p className="mb-4">Vui lòng nhập mã xác nhận email để xác minh danh tính</p>
              <p className="mb-4">mi****02@gmail.com</p>
              <Form.Item
                name="verificationCode"
                rules={[{ required: true, message: 'Mã xác nhận không được để trống' }]}
              >
                <Input
                  placeholder="Mã Xác Nhận"
                  className=""
                />
              </Form.Item>
              <Button type="link" className=""><LoadingOutlined /> Gửi lại </Button>
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

// import React from 'react';
// import { Form, Input, Button, Checkbox } from 'antd';
// import { LineOutlined } from '@ant-design/icons';

// // useEffect(() => {
// //   document.title = "Đăng ký";
// // }, []);

// const SignUpPage: React.FC = () => {
//   const onFinish = (values: any) => {
//     console.log('Success:', values);
//   };

//   const onFinishFailed = (errorInfo: any) => {
//     console.log('Failed:', errorInfo);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-pink-100 mt-2">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
//         <Form
//           name="sign_up"
//           initialValues={{ remember: true }}
//           onFinish={onFinish}
//           onFinishFailed={onFinishFailed}
//           autoComplete="off"
//         >
//           <Form.Item
//             name="username"
//             rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
//           >
//             <Input placeholder="Tên đăng nhập" />
//           </Form.Item>

//           <Form.Item
//             name="phone"
//             rules={[
//               { required: true, message: 'Vui lòng nhập số điện thoại' },
//               { type: 'string', pattern: new RegExp(/^[0-9]+$/), message: 'Số điện thoại chưa hợp lệ' },
//             ]}
//           >
//             <Input placeholder="Số điện thoại" />
//           </Form.Item>

//           <Form.Item
//             name="password"
//             rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
//           >
//             <Input.Password placeholder="Mật khẩu" />
//           </Form.Item>

//           <Form.Item
//             name="confirm"
//             dependencies={['password']}
//             hasFeedback
//             rules={[
//               { required: true, message: 'Nhập lại mật khẩu' },
//               ({ getFieldValue }) => ({
//                 validator(_, value) {
//                   if (!value || getFieldValue('password') === value) {
//                     return Promise.resolve();
//                   }
//                   return Promise.reject(
//                     new Error('Mật khẩu chưa trùng khớp')
//                   );
//                 },
//               }),
//             ]}
//           >
//             <Input.Password placeholder="Nhập lại mật khẩu" />
//           </Form.Item>

//           <Form.Item
//             name="agreement"
//             valuePropName="checked"
//             rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('Bạn phải đồng ý với các điều khoản của Milk Store') }]}
//           >
//             <Checkbox>Tôi đã đọc và đồng ý với các <a href='#'>Điều khoản</a> của Milk Store</Checkbox>
//           </Form.Item>

//           <Form.Item
//             name="agreement"
//             valuePropName="checked"
//             rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('Bạn phải đồng ý với chính sách bảo vệ thông tin cá nhân của Milk Store') }]}
//           >
//             <Checkbox>Tôi đã đọc và đồng ý với <a href='#'>Chính sách bảo vệ thông tin cá nhân</a> của Milk Store</Checkbox>
//           </Form.Item>

//           <Form.Item>
//             <Button type="primary" htmlType="submit" className="w-full">
//               Đăng ký
//             </Button>
//           </Form.Item>
//         </Form>

//         <div className="text-center mt-4">
//           <LineOutlined className='' />
//           <p>Đã có tài khoản? <Button type="link" href="/sign-in">Đăng nhập</Button></p>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
