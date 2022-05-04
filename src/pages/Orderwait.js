import { Layout, List, Card, Tag, Row, Col, Button, message } from "antd";
import { useEffect, useState } from "react";
import { useRequest } from "react-request-hook";
import { Content } from "antd/lib/layout/layout";
import Navmenu from "../Navmenu";
import { UserContext } from "../context";
import { useContext } from "react";
import { CarFilled, CreditCardOutlined, ClockCircleFilled } from '@ant-design/icons'
import { subscribeUserOrderLst } from "../utils";
import { useNavigation } from "react-navi";

export default function Orderwait() {

    const { user } = useContext(UserContext)
    const style = { padding: '8px 0' };
    const [cusOrderLst, setCusOrderLst] = useState([])
    let navigation = useNavigation()
    const [, getChangeOrderStatus] = useRequest((orderId, status, rider) => ({
        url: '/changeOrderStatus',
        method: 'POST',
        data: { orderId, status, rider }
    }))

    const handleOk = async (orderId, rider) => {
        console.log(orderId);
        const { ready } = getChangeOrderStatus(orderId, "completed", rider )
        const msg = await ready()
        console.log(msg);
        if (msg === 'Status changed!') {
            message.success('Enjoy your food!');
        }

    };
    const handleNavigateToDetail = (orderId)=>{
        navigation.navigate(`/Order/${orderId}`)

    }

    useEffect(() => {
        subscribeUserOrderLst(user.username, (err, userOrderLst) => { setCusOrderLst(userOrderLst); console.log(userOrderLst); });
    }, [user.username])

    if (user) {
        return (
            <Layout>
                <Navmenu selected={'3'} />
                <Content style={{ margin: '2%', background: '#fff' }}>
                    <List
                        grid={{
                            gutter: 16,
                            xs: 1,
                            sm: 1,
                            md: 1,
                            lg: 1,
                            xl: 1,
                            xxl: 1,
                        }}
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={cusOrderLst}
                        renderItem={item => (
                            <List.Item >
                                <Card title={<Button type="text" onClick={()=>handleNavigateToDetail(item.orderId)}>Order ID: {item.orderId}  Store name: {item.resName}</Button>}

                                >
                                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                        <Col className="gutter-row" span={6}>
                                            <div style={style}><CreditCardOutlined style={{ fontSize: '24px' }} /> {item.price}</div>
                                        </Col>
                                        {item.orderStatus === "in delivery" || item.orderStatus === "completed" ? <Col className="gutter-row" span={6}>
                                            <div style={style}><CarFilled style={{ fontSize: '24px' }} />  Your delivery by {item.riderName}</div>
                                        </Col>: <Col className="gutter-row" span={6}><div style={style}><CarFilled style={{ fontSize: '24px' }} /> Not Assigned</div></Col>}
                                    </Row>
                                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                        <Col className="gutter-row" span={6}>
                                            <div style={style}><ClockCircleFilled style={{ fontSize: '24px' }} /> {item.date}</div>
                                        </Col>
                                        <Col className="gutter-row" span={6}>
                                            <div style={style}>
                                                {item.orderStatus === 'completed' ? <Tag color="#87d068">{item.orderStatus}</Tag> :
                                                    <Tag color="#108ee9">processing</Tag>}
                                            </div>
                                        </Col>
                                    </Row>
                                    {item.orderStatus === 'in delivery' ? <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                        <Col className="gutter-row" span={6}> <Button type="primary" onClick={() => handleOk(item.orderId, item.riderName)}> Food Received</Button></Col>
                                    </Row> : <div></div>}
                                </Card>
                            </List.Item>
                        )}
                    />
                </Content>
            </Layout>
        )
    } else {
        return (
            <Layout>
                <Navmenu selected={'3'} />
                <Content style={{ margin: '2%', background: '#fff' }}>
                    Please login first and then check your orders
                </Content>
            </Layout>
        )
    }

}