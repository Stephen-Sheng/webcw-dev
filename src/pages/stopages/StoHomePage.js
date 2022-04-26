import React, { useEffect, useContext } from 'react';
import { Layout } from 'antd';
// import { useCurrentRoute } from 'react-navi';
import { UserContext } from '../../context';
import StoNavmenu from './StoNavMenu';
const { Content } = Layout;

export default function StoHomePage() {

  const { user } = useContext(UserContext)
  useEffect(() => {
    if (user) {

      // console.log(route);
    }
  }, [user])

  return (
    <Layout>
      <StoNavmenu selected = {['1']} />
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: '2%',
              minHeight: 280,
              background: 'white'
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}