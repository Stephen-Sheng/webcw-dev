import React from "react";
import { Link } from 'react-navi';
import { Layout, Breadcrumb } from 'antd';

import Navmenu from "../Navmenu"
// import { UserContext } from "../context";
import './StoreOrder.css'

const { Content, Footer } = Layout;

export default function StoreOrder(props){
    
    // const { user } = useContext(UserContext)

    return (
        <Layout>
    <Navmenu selected = {['2']} />
    <Content className="site-layout" style={{ padding: '0 50px', marginTop: 10 }}>
      <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
        <Breadcrumb.Item ><Link href={'/'}>Home</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link href={'/Storelist'}>Store list</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Order</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-background" style={{ padding: 24, minHeight: 780 }}>
        Content
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>
      )
}