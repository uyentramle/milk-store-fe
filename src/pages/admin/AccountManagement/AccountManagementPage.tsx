import React, { useState, useEffect } from 'react';
import { SearchOutlined, PlusOutlined, EditOutlined, EllipsisOutlined, BlockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Input, Select, Button, Table, Tag, Space, Avatar, Dropdown, Menu, Modal, Pagination } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { Form, Input, Button } from 'antd';
import { jwtDecode } from 'jwt-decode';
import UserDetailsForm from './UserDetailsForm'; // Đường dẫn đến component UserDetailsForm
import AddUserForm from './AddUserForm';

const { Option } = Select;

interface Account {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    phoneNumber: string;
    googleEmail: string;
    facebookEmail: string;
    gender: 'Male' | 'Female' | 'Unknown';
    status: 'Active' | 'Blocked';
    lastLogin: string;
    totalPoints: number;
    avatar: string;
    roles: string[];
    address: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
    deletedAt: Date;
    deletedBy: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    totalItemsCount: number;
    pageSize: number;
    totalPagesCount: number;
    pageIndex: number;
    next: boolean;
    previous: boolean;
    items: Account[];
  };
}

const mockFetchAccounts = async (pageIndex: number, pageSize: number): Promise<ApiResponse> => {
  const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        throw new Error('Access token not found.');
    }

  try {
    // const decodedToken: any = jwtDecode(accessToken);
    // const userId = decodedToken.userId; // Assuming 'userId' is the key in your accessToken payload

    const response = await axios.get<ApiResponse>('https://localhost:44329/api/Account/GetAllUsersForAdmin?', {
      params: {
        pageIndex,
        pageSize
      },
      headers: {
        'accept': '*/*',
        'authorization': `Bearer ${accessToken}`
      }
    });

    if (response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data.message);
    }  } catch (error) {
    console.error('Error fetching accounts:', error);
    throw error;
  }

  };
  

  const AccountManagementPage: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'Active' | 'Inactive' | 'Blocked' | 'All'>('All');
    const [editVisible, setEditVisible] = useState(false); // State để điều khiển hiển thị của modal
    const [selectedUser, setSelectedUser] = useState<Account | null>(null); // State để lưu trữ thông tin người dùng được chọn
    const [addVisible, setAddVisible] = useState(false); // State để điều khiển hiển thị của modal

    const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const [totalPagesCount, setTotalPagesCount] = useState(1);

    useEffect(() => {
      // mockFetchAccounts().then(data => setAccounts(data));
      mockFetchAccounts(pageIndex, pageSize).then(data => {
        setAccounts(data.data.items);
        setTotalItemsCount(data.data.totalItemsCount);
        setTotalPagesCount(data.data.totalPagesCount);
      });
    }, [pageIndex, pageSize]);
  
    const handlePageChange = (page: number, pageSize?: number) => {
      setPageIndex(page - 1); // Adjust for 0-based index
      if (pageSize) {
        setPageSize(pageSize);
      }
    };

    const filteredAccounts = accounts.filter((account) => {
      const matchesSearch =
        `${account.firstName} ${account.lastName} ${account.email} ${account.phoneNumber}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'All' || account.status === filterStatus;
      return matchesSearch && matchesStatus;
    });
  
    // Hàm mở modal chi tiết người dùng và thiết lập người dùng được chọn
    const showUserDetailsModal = (user: Account) => {
      setSelectedUser(user);
      setEditVisible(true);
    };

    // Hàm mở modal thêm người dùng
  const showAddUserModal = () => {
    setAddVisible(true);
  };

    // Hàm xử lý khi người dùng chọn một trong các mục trong dropdown menu
  const handleMenuClick = (key: React.Key, record: Account) => {
    if (key === 'details') {
      showUserDetailsModal(record);
    } else if (key === 'Blocked') {
      console.log(`Chặn người dùng: ${record.id}`);
      // Gọi hàm chặn người dùng ở đây
    } else if (key === 'Unblock') {
      console.log(`Bỏ chặn người dùng: ${record.id}`);
      // Gọi hàm bỏ chặn người dùng ở đây
    }
  };

    // Hàm đóng modal chi tiết người dùng
    const handleCancel = () => {
      setEditVisible(false);
    };
  
    // Hàm cập nhật thông tin người dùng sau khi chỉnh sửa
    const handleUpdateUser = (updatedUser: Account) => {
      // Thực hiện logic cập nhật người dùng ở đây, ví dụ: gọi API hoặc cập nhật state
      console.log('Updated user:', updatedUser);
      setEditVisible(false); // Đóng modal sau khi cập nhật thành công
    };

    const handleAddUser = (updatedUser: Account) => {
        // Thực hiện logic cập nhật người dùng ở đây, ví dụ: gọi API hoặc cập nhật state
        console.log('Added user:', updatedUser);
        setAddVisible(false); // Đóng modal sau khi cập nhật thành công
      };
  
    const columns = [
      {
        title: 'Tên người dùng',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: Account) => (
          <div className="flex items-center">
            <Avatar src={record.avatar} />
            <span className="ml-2">{`${record.firstName} ${record.lastName}`}</span>
          </div>
        ),
      },
      {
        title: 'Số điện thoại',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: 'Giới tính',
        dataIndex: 'gender',
        key: 'gender',
      },
      {
        title: 'Role',
        dataIndex: 'roles',
        key: 'roles',
        render: (roles: string[]) => roles.join(', '),
      },
      {
        title: 'Hoạt động gần đây',
        dataIndex: 'lastLogin',
        key: 'lastLogin',
        render: (text: string) => new Date(text).toLocaleString(),
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (status: 'Active' | 'Inactive' | 'Blocked') => (
          <Tag color={status === 'Active' ? 'green' : status === 'Inactive' ? 'orange' : 'red'}>
            {status}
          </Tag>
        ),
      },
      {
        title: 'Thao tác',
        key: 'action',
        render: (text: any, record: Account) => (
            <Space size="middle">
              <Dropdown
                overlay={
                  <Menu onClick={({ key }) => handleMenuClick(key, record)}>
                    <Menu.Item key="details" icon={<EditOutlined />}>Chi tiết</Menu.Item>
                    <Menu.Item key={record.status === 'Active' ? 'Blocked' : 'Unblock'} icon={record.status === 'Active' ? <BlockOutlined /> : <UnlockOutlined />}>
                      {record.status === 'Active' ? 'Chặn' : 'Bỏ chặn'}
                    </Menu.Item>
                  </Menu>
                }
                trigger={['click']}
              >
                <Button shape="default" icon={<EllipsisOutlined />} />
              </Dropdown>
            </Space>
          ),
      },
    ];
  
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-3xl font-bold">Quản lý Người dùng</h1>
        <div className="mb-4 flex justify-between">
          <div className="flex">
            <div className="relative mr-4">
              <Input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                suffix={<SearchOutlined />}
              />
            </div>
            <div>
              <Select
                id="status-filter"
                className='w-48'
                value={filterStatus}
                onChange={(value) => setFilterStatus(value as 'Active' | 'Inactive' | 'Blocked' | 'All')}
              >
                <Option value="All">Tất cả</Option>
                <Option value="Active">Hoạt động</Option>
                <Option value="Inactive">Không hoạt động</Option>
                <Option value="Blocked">Bị chặn</Option>
              </Select>
            </div>
          </div>
          <div>
            <Button
              className="inline-flex items-center rounded bg-pink-500 px-4 py-2 text-white hover:bg-pink-600"
              onClick={showAddUserModal}
            >
              <PlusOutlined className="mr-2" />
              Thêm người dùng
            </Button>
          </div>
        </div>
        <Table columns={columns} dataSource={filteredAccounts} rowKey="id" pagination={false} />
        <Pagination
        className="mt-4"
        current={pageIndex + 1}
        pageSize={pageSize}
        total={totalItemsCount}
        onChange={handlePageChange}
        showSizeChanger
      />

        <AddUserForm
        visible={addVisible}
        onCancel={() => setAddVisible(false)}
        onCreate={handleAddUser}
      />
      
        <UserDetailsForm
          visible={editVisible}
          onCancel={handleCancel}
          user={selectedUser}
          onUpdate={handleUpdateUser}
        />
      </div>
    );
  };

export default AccountManagementPage;



  