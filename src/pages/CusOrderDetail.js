import { Table, Layout, Row, Col, Typography,PageHeader } from 'antd';
import { useNavigation } from 'react-navi';
import Navmenu from '../Navmenu'
import React, { useState,useEffect } from 'react';
import { subscribeUserOrderItem } from '../utils';

const { Title } = Typography;
const { Content } = Layout;
export default function CusOrderDetail(){

    const [orderDetail, setOrderDetail] = useState({})
    const currOrderId = window.location.pathname.split('/')[2]
    let navigation = useNavigation()
    const columns = [
        {
            title: 'Name',
            dataIndex: 'itemName',
            key: 'name',
        },
        {
            title: 'Item price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Number',
            dataIndex: 'amount',
            key: 'number',
        }
    ];
    useEffect(() => {
        subscribeUserOrderItem(currOrderId, (err, orderDetail) => { setOrderDetail(orderDetail); console.log(orderDetail); });
    }, [currOrderId])
    return (
        <Layout>
            <Navmenu selected = {'3'}/>
            
            <Content style={{background: '#fff',margin:'0%'}}>
            <PageHeader
                onBack={() => navigation.goBack()}
                title="Order Detail"
                style={{margin:0}}
            />
            <Table className='order-table' title={() => { return <Title><Row>Order ID: {orderDetail.orderId}</Row> <Row>Store Name: {orderDetail.resName}</Row></Title> }} columns={columns} dataSource={orderDetail.menu} />
            <Row>
                <Col span={12} style={{right:'-30%'}}>
                    {orderDetail.date}
                </Col>
                <Col span={12} style={{right:'-10%'}}>
                    {orderDetail.price}
                </Col>
            </Row>
            <Row>
                <Col span={12} style={{right:'-30%'}}>
                    {orderDetail.orderStatus}
                </Col>
                <Col span={12} style={{right:'-10%'}}>
                    {orderDetail.riderName}
                </Col>
            </Row>
            </Content>
        </Layout>
    )
}