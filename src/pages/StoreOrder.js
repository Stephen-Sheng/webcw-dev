import React, { useState } from "react";
import { Link, useNavigation } from 'react-navi';
import { Layout, Breadcrumb, Typography, Divider, Row, Col, InputNumber, Form, Button } from 'antd';
import Navmenu from "../Navmenu"
// import { UserContext } from "../context";
import './StoreOrder.css'

const { Content, Footer } = Layout;
const { Title } = Typography;

export default function StoreOrder(props) {

    // const { user } = useContext(UserContext)
    const [, setItemPrice] = useState(0)
    const [form] = Form.useForm()
    const navigation = useNavigation()

    const onFinish = values => {
        console.log('Received values of form:', values);
        console.log(props.menu.items);
        const menuInfo = props.menu.items
        let orderSummary = []
        let total = 0
        menuInfo.forEach((item, index ) => {
            let obj = {'key':index, 'name':item.name,'price':`￡${item.price}`, 'num':values[item.name],'total':item.price*values[item.name]}
            total += obj.total
            obj['total'] = `￡${obj['total']}`
            orderSummary.push(obj)

        })
        orderSummary.push({'key':'total', 'name':'Total','num':'','total':`￡${total}`})
        
        navigation.navigate('/checkout',{body:orderSummary})

    };
    const onChange = (value) => {
        setItemPrice(value)
    }
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
                    <Form form={form} name="dynamic_form_item" onFinish={onFinish}>
                        {
                            props.menu.items.map(item => {
                                return (
                                    <Row key={item.name}>
                                        <Col span={4}>
                                            <img
                                                width={150}
                                                alt="logo"
                                                src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                            />
                                        </Col>
                                        <Col span={4}>
                                            <Title level={5}>{item.name}</Title>
                                            {item.description}
                                        </Col>
                                        <Col span={4}>
                                            £{item.price}
                                        </Col>
                                        <Col span={4}>
                                            <Form.Item name={item.name} initialValue={0}>
                                                <InputNumber min={0} max={10} onChange={onChange} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={4}>
                                        £{form.getFieldValue(item.name) ? item.price * form.getFieldValue(item.name) : 0}
                                        </Col>
                                        <Divider />
                                    </Row>
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