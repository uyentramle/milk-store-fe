import React from 'react';
import { Menu, Dropdown, Button, Input } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';

const { Search } = Input;

const productMenu = (
    <Menu>
        <Menu.Item key="1">Sữa bột</Menu.Item>
        <Menu.Item key="2">Sữa tươi</Menu.Item>
        <Menu.Item key="3">Sữa cho bé</Menu.Item>
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
                <a href="/" className="hover:text-blue-500">Trang chủ</a>
                <Dropdown overlay={productMenu}>
                    <a className="ant-dropdown-link flex items-center hover:text-blue-500" onClick={(e) => e.preventDefault()}>
                        Sản phẩm <DownOutlined className="ml-1" />
                    </a>
                </Dropdown>
                <a href="#" className="hover:text-blue-500">Khuyến mãi</a>
                <a href="#" className="hover:text-blue-500">Blog</a>
                <a href="#" className="hover:text-blue-500">Liên hệ</a>
                <a href="#" className="hover:text-blue-500">CSKH</a>
                <Button type="primary" className="ml-4">Đăng nhập</Button>
            </div>
        </div>
    );
};

export default Header;
