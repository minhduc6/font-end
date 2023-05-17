import { TagsOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Avatar } from 'antd';
import { Layout, Menu, theme } from 'antd';
import * as React from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurrentUser, setIsLoggin } from "../../Store/index";

const { Header, Content, Sider } = Layout;

const items1 = [
  {
    key: '1',
    label: 'Home'
  }
]


const items2 = [
  {
    key: ``,
    icon: React.createElement(NotificationOutlined),
    label: `Home`,
  },
  {
    key: `user`,
    icon: React.createElement(UserOutlined),
    label: `User`,
  },
  {
    key: `category`,
    icon: React.createElement(TagsOutlined),
    label: `Category`,
  },
  {
    key: `organizers`,
    icon: React.createElement(TagsOutlined),
    label: `Organizers`,
  },
  {
    key: `event`,
    icon: React.createElement(TagsOutlined),
    label: `Event`,
  },
  {
    key: `blog`,
    icon: React.createElement(TagsOutlined),
    label: `Blog`,
  },
  {
    key: `invoice`,
    icon: React.createElement(TagsOutlined),
    label: `Invoice`,
  }
]





export default function AdminLayout({ children }) {
  const user = useSelector((state) => state.profile.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setCurrentUser({}))
    dispatch(setIsLoggin(false))
    localStorage.removeItem("ACCESS_TOKEN")
    navigate("/")
  }

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="/profile">
          Profile
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={logout}>
          Đăng Xuất
        </a>
      ),
    },
  ];

  const onClick = (e) => {
    console.log('click ', e);
    navigate("/admin/" + e.key);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: 'space-between' }} className="header">
        <Menu theme="dark" mode="horizontal" items={items1} />
        <Dropdown menu={{ items }} placement="bottomLeft">
          <Avatar style={{ marginTop: '15px' }} src={<img src={user.imgUrl} alt="avatar" />} />
        </Dropdown>
      </Header>

      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            onClick={onClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items2}
          />
        </Sider>

        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
