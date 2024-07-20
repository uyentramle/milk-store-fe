import { useState } from 'react';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Dropdown, MenuProps, Modal, Spin } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Link, useNavigate } from 'react-router-dom';

export default function MyHeader() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        setLoading(true);
        localStorage.removeItem('accessToken'); // Remove token from localStorage
        setTimeout(() => {
            setLoading(false);
            navigate('/sign-in');
        }, 1000); // Simulate an async operation, e.g., network request
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            icon: <UserOutlined></UserOutlined>,
            label: <Link to={`/user-profile`}>Thông tin cá nhân</Link>,
        },
        {
            key: '2',
            icon: <LogoutOutlined></LogoutOutlined>,
            label: <div onClick={handleLogout}>Đăng xuất</div>,
        },
    ];

    return (
        <Header className="fixed z-50 flex w-full justify-between border-b border-gray-200 bg-white px-5">
            {/* <Breadcrumb className='my-4' items={headerTitle} itemRender={itemRender}></Breadcrumb> */}
            <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']} arrow>
                <Avatar
                    className="fixed right-4 top-3 cursor-pointer"
                    size={'large'}
                    icon={<UserOutlined />}
                />
            </Dropdown>
            <Modal footer={null} closable={false} visible={loading} centered>
                <div className="flex flex-col items-center justify-center p-10">
                    <Spin size="large"></Spin>
                    <span>Đang đăng xuất...</span>
                </div>
            </Modal>
        </Header>
    );
}
