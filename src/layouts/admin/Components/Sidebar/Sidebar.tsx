import {
    MenuOutlined,
    GiftOutlined,
    ProductOutlined,
    TruckOutlined,
    BuildOutlined,
    FormOutlined,
    SnippetsOutlined,
    DatabaseOutlined,
    SmileOutlined,
} from '@ant-design/icons';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import { Menu, MenuProps } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img from '/logo.jpg';


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

export default function MySider() {
    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(window.innerWidth < 1280);

    useEffect(() => {
        const handleResize = () => {
            setCollapsed(window.innerWidth < 1280);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getConditionalItems = (): MenuItem[] => {
        return [
            getItem('Bảng thống kê', '1', <AnalyticsOutlinedIcon />),
            getItem('Quản lý tài khoản', '2', <ManageAccountsOutlinedIcon />),
            getItem('Quản lý sản phẩm', '3', <ProductOutlined />),
            getItem('Quản lý độ tuổi sử dụng', '10', <SmileOutlined />),
            getItem('Quản lý danh mục sản phẩm', '9', <DatabaseOutlined />),
            getItem('Quản lý đơn hàng', '4', <TruckOutlined />),
            getItem('Quản lý thương hiệu', '5', <BuildOutlined />),
            getItem('Quản lý voucher', '6', <GiftOutlined />),
            getItem('Quản lý bài viết', '7', <FormOutlined />),
            getItem('Quản lý danh mục bài viết', '8', <SnippetsOutlined />),
        ];
    };
    const navUrl = new Map<string, string>();
    navUrl
        .set('1', '/admin/')
        .set('2', '/admin/manage-users')
        .set('3', '/admin/products')
        .set('4', '/admin/orders')
        .set('5', '/admin/brands')
        .set('6', '/admin/vouchers')
        .set('7', '/admin/blogs')
        .set('8', '/admin/categories')
        .set('9', '/admin/product-types')
        .set('10', '/admin/age-ranges');
    return (
        <>
            <Sider
                theme="light"
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                className="overflow-hidden border-r-[1px] "
                trigger={
                    <div className="w-full border-r-[1px] border-t-[1px]">
                        <MenuOutlined></MenuOutlined>
                    </div>
                }
                width={256}
            >
                <div className="demo-logo-vertical border-r-[1px] border-gray-200 pl-2 my-2">
                    <a href='/'><img src={img} alt="Logo" className="h-16 w-16" /></a>
                </div>
                <Menu
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={getConditionalItems()}
                    onSelect={(e) => {
                        const link = navUrl.get(e.key);
                        if (link) {
                            navigate(link);
                        }
                    }}
                ></Menu>
            </Sider>
        </>
    );
}
