import { TagsOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';

import { Layout, Menu, theme } from 'antd';
import * as React from 'react';
import { useNavigate } from "react-router-dom";



const { Header, Content, Sider } = Layout;

const items1 = [
  {
    key: '1',
    label: 'Home'
  },
  {
    key: '2',
    label: 'Link'
  },
  {
    key: '3',
    label: 'About'
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
    key: `event`,
    icon: React.createElement(TagsOutlined),
    label: `Event`,
  },
]





export default function AdminLayout({ children }) {
  let navigate = useNavigate();

  const onClick = (e) => {
    console.log('click ', e);
    navigate("/admin/"+e.key);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark"  mode="horizontal"   items={items1} />
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
