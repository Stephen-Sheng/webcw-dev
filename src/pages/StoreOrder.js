import React, { useState } from "react";
import { Link } from 'react-navi';
import { Layout, Breadcrumb, Typography, Divider, Row, Col, InputNumber, Form, Input, Button } from 'antd';
import Navmenu from "../Navmenu"
// import { UserContext } from "../context";
import './StoreOrder.css'

const { Content, Footer } = Layout;
const { Title } = Typography;


  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 20, offset: 4 },
    },
  };

export default function StoreOrder(props) {

    // const { user } = useContext(UserContext)
    const [orderInfo, setOrderInfo] = useState([])

    const onFinish = values => {
        console.log('Received values of form:', values);

      };
    return (
        <Layout>
            <Navmenu selected={['2']} />
            <Content className="site-layout" style={{ padding: '0 50px', marginTop: 10 }}>
                <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item ><Link href={'/'}>Home</Link></Breadcrumb.Item>
                    <Breadcrumb.Item><Link href={'/Storelist'}>Store list</Link></Breadcrumb.Item>
                    <Breadcrumb.Item>Order</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-background" style={{ padding: 24, minHeight: 780 }}>
                    <Title>Welcome to {props.menu.store_name}</Title>
                    <Divider dashed />
                    <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
                    {
                        props.menu.items.map(item=>{
                            return(
                                <span key = {item.name}>
                                {item.name}{item.description}{item.price}
                                <Form.Item  name = {item.name} initialValue={0}>
                                    <InputNumber min={0} max={10} />
                                </Form.Item>
                                </span>
                            )
                        })
                    }  
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                            
                    </Form>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    )
}