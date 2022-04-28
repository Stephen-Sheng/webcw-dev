import { Layout, List, Card, Spin, Tag, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { useResource } from "react-request-hook";
import { Content } from "antd/lib/layout/layout";
import Navmenu from "../Navmenu";
import { UserContext } from "../context";
import { useContext } from "react";
import { CarFilled, CreditCardOutlined, ClockCircleFilled } from '@ant-design/icons'
import { subscribeUserOrderLst, subscribeUserOrderItem } from "../utils";

export default function Orderwait() {

    const { user } = useContext(UserContext)
    const style = { padding: '8px 0' };
    const [cusOrderLst, setCusOrderLst] = useState([])
    // const [orderLst, getOrderLst] = useResource((username) => ({
    //     url: `/orderList?username=${username}`,
    //     method: 'GET'

    // }))
    useEffect(() => {
        subscribeUserOrderLst(user.username, (err, userOrderLst) => { setCusOrderLst(userOrderLst) });
        subscribeUserOrderItem("1651100545777238189",(err, userOrderItem) => { console.log(userOrderItem)})
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
                            <List.Item>
                                <Card title={` Order ID: ${item.orderId}  Store name: ${item.resName}`}>
                                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                        <Col className="gutter-row" span={6}>
                                            <div style={style}><CreditCardOutlined style={{ fontSize: '24px' }} /> {item.price}</div>
                                        </Col>
                                        <Col className="gutter-row" span={6}>
                                            <div style={style}><CarFilled style={{ fontSize: '24px' }} />  Your delivery by {item.riderName}</div>
                                        </Col>
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