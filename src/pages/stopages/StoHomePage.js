import React, { useEffect, useContext } from 'react';
import { Layout, Carousel } from 'antd';
// import { useCurrentRoute } from 'react-navi';
import { UserContext } from '../../context';
import StoNavmenu from './StoNavMenu';
const { Content } = Layout;
const contentStyle = {
  height: '660px',
  color: '#fff',
  lineHeight: '560px',
  textAlign: 'center',
  background: '#364d79',
  margin:0,
  padding:"0%"
};

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
            }}
          >
           <Carousel autoplay={true}>
              <div>
                <h3 style={contentStyle}>1</h3>
              </div>
              <div>
                <h3 style={contentStyle}>2</h3>
              </div>
              <div>
                <h3 style={contentStyle}>3</h3>
              </div>
              <div>
                <h3 style={contentStyle}>4</h3>
              </div>
            </Carousel>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}