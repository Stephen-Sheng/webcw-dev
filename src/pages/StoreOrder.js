import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigation } from 'react-navi';
import { useResource } from 'react-request-hook';
import { Layout, Breadcrumb, Typography, Divider, Row, Col, InputNumber, Form, Button, Spin } from 'antd';
import Navmenu from "../Navmenu"
import { UserContext } from "../context";
import './StoreOrder.css'

const { Content, Footer } = Layout;
const { Title } = Typography;

export default function StoreOrder() {

    const { user } = useContext(UserContext)
    const [, setItemPrice] = useState(0)
    const [form] = Form.useForm()
    const navigation = useNavigation()
    const [storeInfo, getStoreInfo] = useResource((id) => ({
        url: `/resInfo?resId=${id}`,
        method: 'GET',
    }))
    const resId = window.location.pathname.split('/')[2]
    useEffect(() => {
        getStoreInfo(resId)
    }, [resId, getStoreInfo])
    const onFinish = values => {
        let orderSummary = []
        let total = 0
        storeInfo.data.menu.forEach((item, index) => {
            if (values[item.itemName] !== 0) {
                let obj = { 'key': index, 'name': item.itemName, 'price': `￡${item.price}`, 'num': values[item.itemName], 'total': item.price * values[item.itemName] }
                total += obj.total
                obj['total'] = `￡${obj['total']}`
                orderSummary.push(obj)
            }
        })
        orderSummary.push({ 'key': 'total', 'name': 'Total', 'num': '', 'total': `￡${total}` })
        const orderObj = { resId, username: user.username, menu:orderSummary }
        navigation.navigate('/checkout', { body: orderObj })

    };
    const onChange = (value) => {
        setItemPrice(value)
    }
    if (storeInfo.isLoading || !storeInfo.data) {
        return <Spin />
    } else {
        const data = storeInfo.data
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
                        <Title>Welcome to {data.resName}</Title>
                        <Divider dashed />
                        <Form form={form} name="dynamic_form_item" onFinish={onFinish}>
                            {
                                data.menu.map(item => {
                                    return (
                                        <Row key={item.itemName}>
                                            <Col span={4}>
                                                <img
                                                    width={150}
                                                    alt="logo"
                                                    src={item.figure}
                                                />
                                            </Col>
                                            <Col span={4}>
                                                <Title level={5}>{item.itemName}</Title>
                                                {item.description}
                                            </Col>
                                            <Col span={4}>
                                                £{item.price}
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item name={item.itemName} initialValue={0}>
                                                    <InputNumber min={0} max={10} onChange={onChange} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                £{form.getFieldValue(item.itemName) ? item.price * form.getFieldValue(item.itemName) : 0}
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

}