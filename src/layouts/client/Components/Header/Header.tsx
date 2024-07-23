import React from 'react';
import { Menu, Dropdown, Badge, Avatar } from 'antd';
import {
    DownOutlined,
    ShoppingCartOutlined,
    BellOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const linkClass = "text-pink-500 hover:text-pink-800";
const menuStyle = "text-pink-500 hover:text-pink-800 font-medium";

const Header: React.FC = () => {
    const navigate = useNavigate();

    const isUserLoggedIn = () => {
        const accessToken = localStorage.getItem('accessToken');
        return !!accessToken;
    };

    const getUserRole = () => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const decoded: any = jwtDecode(accessToken);
            return decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        }
        return null;
    };

    const handleMenuClick = (e: any) => {
        const key = e.key;
        if (key === "1") {
            navigate('/product-list/type/3');
        } else if (key === "2") {
            navigate('/product-list/type/1');
        } else if (key === "3") {
            navigate('#');
        } else if (key === "4") {
            navigate('#');
        }
    };

    const handleAvatarMenuClick = (e: any) => {
        const key = e.key;
        if (key === "profile") {
            navigate('/user-profile');
        } else if (key === "logout") {
            localStorage.removeItem('accessToken');
            navigate('/sign-in');
        } else if (key === "admin") {
            navigate('/admin');
        } else if (key === "sign-in") {
            navigate('/sign-in');
        } else if (key === "sign-up") {
            navigate('/sign-up');
        }
    };

    const productMenu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">Sữa bột cao cấp</Menu.Item>
            <Menu.Item key="2">Sữa tươi các loại</Menu.Item>
            <Menu.Item key="3">Sữa cho bé theo tuổi</Menu.Item>
            <Menu.Item key="4">Sữa cho mẹ</Menu.Item>
        </Menu>
    );

    const getAvatarMenu = () => {
        const role = getUserRole();
        if (isUserLoggedIn()) {
            return (
                <Menu onClick={handleAvatarMenuClick}>
                    <Menu.Item key="profile">Thông tin cá nhân</Menu.Item>
                    {role === 'Admin' || role === 'Staff' ? (
                        <Menu.Item key="admin">Đi tới trang admin</Menu.Item>
                    ) : null}
                    <Menu.Item key="logout">Đăng xuất</Menu.Item>
                </Menu>
            );
        } else {
            return (
                <Menu onClick={handleAvatarMenuClick}>
                    <Menu.Item key="sign-in">Đăng nhập</Menu.Item>
                    <Menu.Item key="sign-up">Đăng ký</Menu.Item>
                </Menu>
            );
        }
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md fixed w-full top-0 z-50 mx-auto">
            <a href="/">
                <div className="flex items-center">
                    {/* <img src="https://marketplace.canva.com/EAE8wGDEkQU/1/0/1600w/canva-pink-cute-calf-illustration-organic-milk-and-dairy-logo-oTfX7cOvpos.jpg" style={{height:'50px'}} alt="Logo" className="mr-4" /> */}
                    <img src="/logo.png" style={{ height: '50px' }} alt="Logo" className="mr-4" />
                    <span className="text-xl font-bold text-pink-500">MILK STORE</span>
                </div>
            </a>
            <div className="flex items-center space-x-6">
                <a href="/" className={menuStyle}>Trang chủ</a>
                <Dropdown overlay={productMenu}>
                    <a className={`ant-dropdown-link flex items-center ${menuStyle}`}
                        onClick={(e) => e.preventDefault()}>
                        Sản phẩm <DownOutlined className="ml-1" />
                    </a>
                </Dropdown>

                <a href="/promotion" className={menuStyle}>Khuyến mãi</a>
                <a href="/blog" className={menuStyle}>Blog</a>
                {/* <a href="#" className={menuStyle}>Liên hệ</a>*/}
                <a href="/contact" className={menuStyle}>CSKH</a>

                <Badge>
                    <a href='/cart' className={linkClass}><ShoppingCartOutlined style={{ fontSize: '25px' }} /> </a>
                </Badge>
                {/* <Badge count={8}>
                    <BellOutlined className={linkClass} style={{ fontSize: '24px' }} />
                </Badge> */}
                {/* <a href="/sign-in" className="" >
                    <Avatar
                        style={{ backgroundColor: '#e83c7e' }}
                        icon={<UserOutlined />}
                    />
                </a> */}
                <Dropdown overlay={getAvatarMenu()} trigger={['click']}>
                    <a onClick={e => e.preventDefault()}>
                        <Avatar
                            style={{ backgroundColor: '#e83c7e' }}
                            icon={<UserOutlined />}
                        />
                    </a>
                </Dropdown>
                {/* <Button type="primary" className="ml-4 bg-pink-500 hover:bg-pink-800">Đăng nhập</Button> */}
            </div>
        </div>
    );
};

export default Header;
