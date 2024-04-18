import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { DesktopOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import './index.scss';
const { Header, Content, Footer, Sider } = Layout;

/**
 * @description
 */

const LayoutComponent: React.FC = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectKey, setSelectKey] = useState(location.pathname);
  const navigate = useNavigate();
  const items: unknown[] = [{ label: '首页', title: '', key: '/home', icon: <DesktopOutlined />, children: undefined }];
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigateToRoute = (route: string = '/home') => {
    setSelectKey(route);
    navigate(route);
  };
  const getRouteAbout = () => {
    return items.filter((item) => item.key === location.pathname)[0];
  };
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logoWrapper">
          <h1 className="logo">广告位</h1>
        </div>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          selectedKeys={[selectKey]}
          defaultSelectedKeys={[selectKey]}
          mode="inline"
          items={items}
          onClick={(e) => {
            navigateToRoute(e.key);
          }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item onClick={() => navigateToRoute()}>首页</Breadcrumb.Item>
            {getRouteAbout()?.['title'].length ? <Breadcrumb.Item>{getRouteAbout()?.['title']}</Breadcrumb.Item> : null}
          </Breadcrumb>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>xx科技 ©{new Date().getFullYear()}</Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutComponent;
