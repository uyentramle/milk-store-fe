import React from 'react';
import { Menu, Dropdown, Badge, Input, Avatar } from 'antd';
import {
    DownOutlined,
    ShoppingCartOutlined,
    BellOutlined,
    UserOutlined,
} from '@ant-design/icons';

const linkClass = "text-pink-500 hover:text-pink-800";

const productMenu = (
    <Menu>
        <Menu.Item key="1">Sữa bột cao cấp</Menu.Item>
        <Menu.Item key="2">Sữa tươi các loại</Menu.Item>
        <Menu.Item key="3">Sữa cho bé theo tuổi</Menu.Item>
        <Menu.Item key="4">Sữa cho mẹ</Menu.Item>
    </Menu>
);

const Header: React.FC = () => {
    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md fixed w-full top-0 z-50">
            <a href="/">
                <div className="flex items-center">
                    <img src="https://via.placeholder.com/50" alt="Logo" className="mr-4" />
                    <span className="text-xl font-bold text-pink-500">MILK STORE</span>
                </div>
            </a>
            {/* <div className="hidden md:block">
                <Input.Search
                    placeholder="Tìm kiếm sản phẩm"
                    style={{ width: 300, color: 'pink', borderColor: 'pink' }}
                    enterButton
                />
            </div> */}
            <div className="flex items-center space-x-6">
                <a href="/" className="text-pink-500 hover:text-pink-80 font-medium">Trang chủ</a>
                <Dropdown overlay={productMenu}>
                    <a className="ant-dropdown-link flex items-center text-pink-500 hover:text-pink-800 font-medium"
                        onClick={(e) => e.preventDefault()}>
                        Sản phẩm <DownOutlined className="ml-1" />
                    </a>
                </Dropdown>
                <a href="#" className={linkClass}>Khuyến mãi</a>
                <a href="#" className={linkClass}>Blog</a>
                <a href="#" className={linkClass}>Liên hệ</a>
                <a href="#" className={linkClass}>CSKH</a>
                <Badge count={8}>
                    <a href='#' className={linkClass}><ShoppingCartOutlined style={{ fontSize: '25px' }} /> </a>
                </Badge>
                <Badge count={8}>
                    <BellOutlined className={linkClass} style={{ fontSize: '24px' }} />
                </Badge>
                <a href="#" className="">
                    <Avatar style={{ backgroundColor: '#e83c7e' }} icon={<UserOutlined />} />
                </a>
                {/* <Button type="primary" className="ml-4 bg-pink-500 hover:bg-pink-800">Đăng nhập</Button> */}
            </div>
        </div>
    );
};

export default Header;
