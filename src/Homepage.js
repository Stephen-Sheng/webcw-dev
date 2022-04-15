import React, { useEffect, useContext } from 'react';
import { Layout, Breadcrumb } from 'antd';
import { UserContext } from './context';
import Navmenu from './Navmenu';
import Sidermenu from './Sidermenu';

const { Content } = Layout;

export default function Homepage() {

  const { user } = useContext(UserContext)


  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user])

  return (
    <Layout>
      <Navmenu />
      <Layout>
        <Sidermenu />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}