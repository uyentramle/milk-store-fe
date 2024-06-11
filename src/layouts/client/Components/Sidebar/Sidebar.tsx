import React from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { SubMenu } = Menu;

const Sidebar: React.FC = () => {
  return (
    // <aside className="bg-white shadow-md p-4 space-y-4">
    //   <a href="#" className="block">Sữa bột cao cấp</a>
    //   <a href="#" className="block">Sữa tươi các loại</a>
    //   <a href="#" className="block">Chăm sóc gia đình</a>
    //   <a href="#" className="block">Đồ dùng mẹ & bé</a>
    //   <a href="#" className="block">Thời trang & Phụ kiện</a>
    //   <a href="#" className="block">Đồ chơi, học tập</a>
    //   <a href="#" className="block">Ứng dụng Mẹ & Bé</a>
    // </aside>
    <div className="h-screen bg-white">
      <Menu
        mode="vertical"
        defaultSelectedKeys={['1']}
        // defaultOpenKeys={['sub1']}
        style={{ width: 256 }}
      >
        <SubMenu
          key="sub1"
          icon={<MailOutlined />}
          title="Sữa bột cao cấp"
          // className='hover:text-pink-500 active:text-pink-500'
        >
          <Menu.Item key="1">Sữa Mỹ</Menu.Item>
          <Menu.Item key="2">Sữa Nhật</Menu.Item>
          <Menu.Item key="3">Sữa Úc</Menu.Item>
          <Menu.Item key="4">Châu Âu</Menu.Item>
          <Menu.Item key="5">Sữa Khác</Menu.Item>
        </SubMenu>
        <Menu.Item key="sub3" icon={<SettingOutlined />}>
          Sữa tươi các loại
        </Menu.Item>

        <Menu.Item key="sub10" icon={<AppstoreOutlined />}>
          Ứng dụng Mẹ & Bé
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;