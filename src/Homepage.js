import React, { useEffect, useContext } from 'react';
import { Layout, Breadcrumb, Carousel } from 'antd';
import { UserContext } from './context';
import Navmenu from './Navmenu';
import Sidermenu from './Sidermenu';

const contentStyle = {
  height: '660px',
  color: '#fff',
  lineHeight: '560px',
  textAlign: 'center',
  background: '#364d79',
  margin:0,
  padding:"0%"
};

const { Content } = Layout;

export default function Homepage() {

  const { user } = useContext(UserContext)
  // let route = useCurrentRoute()


  useEffect(() => {
    if (user) {

      // console.log(route);
    }
  }, [user])

  return (
    <Layout>
      <Navmenu selected={['1']} />
      <Layout>
        {/* <Sidermenu /> */}
        <Layout style={{ padding: '0 24px 24px' }}>
          {/* <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb> */}
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: "1%",
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
  );
}