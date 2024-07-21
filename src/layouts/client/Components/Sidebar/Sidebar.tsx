import React, { useState, useEffect, } from 'react';
import { Menu } from 'antd';
import {
  // AppstoreOutlined,
  // MailOutlined,
  // SettingOutlined,
  StarOutlined,
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';

// const { SubMenu } = Menu;
const linkClass = "hover:text-pink-500 font-medium text-lg";

interface ProductType {
  id: number;
  name: string;
  description: string;
  active: boolean;
  isDeleted: boolean;
}

const Sidebar: React.FC = () => {
  const { typeId } = useParams<{ typeId: string }>();
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>('1');

  useEffect(() => {
    fetch('https://localhost:44329/api/ProductType/GetAllProductType')
      .then(response => response.json())
      .then(data => setProductTypes(data.data.filter((productType: ProductType) => productType.active)))
      .catch(error => console.error('Error fetching product types:', error));
  }, []);

  useEffect(() => {
    if (typeId) {
      setSelectedKey(typeId);
    }
  }, [typeId]);

  return (
    <div className="h-screen bg-white sticky top-0 left-0 fixed-sidebar">
      <Menu
        selectedKeys={[selectedKey]}
        mode="vertical"
        style={{ width: 256 }}
      >
        {productTypes.map(productType => (
          <Menu.Item
            key={productType.id}
            icon={
              <StarOutlined style={{ color: '#111827' }} />
            }
          >
            {/* <span className={linkClass}>{productType.name}</span> */}
            <Link to={`/product-list/type/${productType.id}`} className={linkClass}>
              {productType.name}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default Sidebar;