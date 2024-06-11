import React from 'react';
import { Menu, Dropdown, Button, Badge } from 'antd';
import { DownOutlined, ShoppingCartOutlined, BellOutlined, } from '@ant-design/icons';


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
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
            <a href="/">
                <div className="flex items-center">
                    <img src="https://via.placeholder.com/50" alt="Logo" className="mr-4" />
                    <span className="text-xl font-bold">MILK STORE</span>
                </div>
            </a>
            {/* <div className="flex-grow mx-4">
                <Search
                    placeholder="Tìm kiếm sản phẩm..."
                    enterButton={<SearchOutlined />}
                    size="large"
                    onSearch={(value) => console.log(value)}
                />
            </div> */}
            <div className="flex items-center space-x-6">
                <a href="/" className="hover:text-pink-500">Trang chủ</a>
                <Dropdown overlay={productMenu}>
                    <a className="ant-dropdown-link flex items-center hover:text-pink-500" onClick={(e) => e.preventDefault()}>
                        Sản phẩm <DownOutlined className="ml-1" />
                    </a>
                </Dropdown>
                <a href="#" className="hover:text-pink-500">Khuyến mãi</a>
                <a href="#" className="hover:text-pink-500">Blog</a>
                <a href="#" className="hover:text-pink-500">Liên hệ</a>
                <a href="#" className="hover:text-pink-500">CSKH</a>
                <Badge count={8}>
                    <a href='#' className="hover:text-pink-500"><ShoppingCartOutlined style={{ fontSize: '25px' }} /> </a>
                </Badge>
                <Badge count={8}>
                    <BellOutlined className="hover:text-pink-500" style={{ fontSize: '24px' }} />
                </Badge>
                <Button type="primary" className="ml-4">Đăng nhập</Button>
            </div>
        </div>
    );
};

export default Header;
