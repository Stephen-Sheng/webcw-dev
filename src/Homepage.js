import React, { useEffect, useContext } from 'react';
import { Layout, Carousel } from 'antd';
import { UserContext } from './context';
import Navmenu from './Navmenu';

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
                <h3 style={contentStyle}>< img style={{width:'100%',height:'100%'}} src={require("./images/51.jpg")}/></h3>
              </div>
              <div>
                <h3 style={contentStyle}>< img style={{width:'100%',height:'100%'}} src={require("./images/52.jpg")}/></h3>
              </div>
              <div>
                <h3 style={contentStyle}>< img style={{width:'100%',height:'100%'}} src={require("./images/53.jpg")}/></h3>
              </div>
              <div>
                <h3 style={contentStyle}>< img style={{width:'100%',height:'100%'}} src={require("./images/54.jpg")}/></h3>
              </div>
            </Carousel>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}