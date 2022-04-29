import { Layout, List, Card, Row, Col, Divider, Spin } from "antd";
import { useEffect } from "react";
import { useResource } from "react-request-hook";
import { Content } from "antd/lib/layout/layout";
import StoNavmenu from "./StoNavMenu";
import { UserContext } from "../../context";
import { useContext } from "react";
import { CreditCardOutlined, ClockCircleFilled } from '@ant-design/icons'

export default function StoHistoryOrders() {

    const style = { padding: '8px 0' };
    const { user } = useContext(UserContext)
    const [ historyOrders, getHistoryOrders ] = useResource((username, status)=>({
        url:`/resGetOrder?username=${username}&status=${status}`,
        method:'GET'
    }))
    useEffect(() => {
        getHistoryOrders(user.username, "completed")
    }, [user.username, getHistoryOrders])


    if (user) {
        if (historyOrders.isLoading || !historyOrders.data) {
            return <Spin size="large"/>
        }else{
            console.log(historyOrders.data);
            return (
                <Layout>
                    <StoNavmenu selected={'3'} />
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
                            dataSource={historyOrders.data}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <Card title={` Order ID: ${item.orderId}  Store name: ${item.resName}`}>
                                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                            <Col className="gutter-row" span={6}>
                                                <div style={style}><CreditCardOutlined style={{ fontSize: '24px' }} /> {item.price}</div>
                                            </Col>
                                            <Col className="gutter-row" span={6}>
                                                <div style={style}><ClockCircleFilled style={{ fontSize: '24px' }} /> {item.date}</div>
                                            </Col>
                                        </Row>
                                        <Divider style={{ margin: 0 }} />
                                        <List
                                            header={<div>Dishes List</div>}
                                            bordered={false}
                                            dataSource={item.dish}
                                            renderItem={item1 =>
                                                <List.Item>
                                                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                                        <Col className="gutter-row" span={12}>
                                                            <div style={style}>
                                                                {item1.itemName}
                                                            </div>
                                                        </Col>
                                                        <Col className="gutter-row" span={6}>
                                                            <div style={style}>
                                                                x{item1.amount}
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </List.Item>}
                                        />    
                                    </Card>
                                </List.Item>
                            )}
                        />
                    </Content>
                </Layout>
            )
        }
    } else {
        return (
            <Layout>
                <StoNavmenu selected={'3'} />
                <Content style={{ margin: '2%', background: '#fff' }}>
                    Please login first and then check your upcoming orders
                </Content>
            </Layout>
        )
    }

}