import React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';

const SignUpPage: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 mt-2">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Đăng ký</h2>
        <Form
          name="sign_up"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập' }]}
          >
            <Input placeholder="Tên đăng nhập" />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              { type: 'string', pattern: new RegExp(/^[0-9]+$/), message: 'Số điện thoại chưa hợp lệ' },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
          >
            <Input.Password placeholder="Mật khẩu" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Nhập lại mật khẩu' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Mật khẩu chưa trùng khớp')
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Nhập lại mật khẩu" />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[{ validator:(_, value) => value ? Promise.resolve() : Promise.reject('Bạn phải đồng ý với các điều khoản của Milk Store') }]}
          >
            <Checkbox>Tôi đã đọc và đồng ý với các <a href='#'>Điều khoản</a> của Milk Store</Checkbox>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[{ validator:(_, value) => value ? Promise.resolve() : Promise.reject('Bạn phải đồng ý với chính sách bảo vệ thông tin cá nhân của Milk Store') }]}
          >
            <Checkbox>Tôi đã đọc và đồng ý với <a href='#'>Chính sách bảo vệ thông tin cá nhân</a> của Milk Store</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-4">
          <span>Đã có tài khoản?</span> 
          <Button type="link" href="/login">Đăng nhập</Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
