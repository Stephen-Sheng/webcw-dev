import { Layout, List, Card, Spin, Row, Col } from "antd";
import { useEffect } from "react";
import { useResource } from "react-request-hook";
import { Content } from "antd/lib/layout/layout";
import StoNavmenu from "./StoNavMenu";
import { UserContext } from "../../context";
import { useContext } from "react";
import { CreditCardOutlined, ClockCircleFilled } from '@ant-design/icons'


export default function CurrentOrders() {

    const { user } = useContext(UserContext)
    const style = { padding: '8px 0' };
    const [orderLst, getOrderLst] = useResource((username,status) => ({
        url: `/resGetOrder?username=${username}&status=${status}`,
        method: 'GET'

    }))
    useEffect(() => {
        getOrderLst(user.username, "uncompleted")
    }, [getOrderLst, user.username])

    if (user) {
        if (orderLst.isLoading || !orderLst.data) {
            return <Spin />
        } else {
            console.log(orderLst.data);
            return (
                <Layout>
                    <StoNavmenu selected={'2'} />
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
                            dataSource={orderLst.data}
                            renderItem={item => (
                                <List.Item>
                                    <Card title={` Order ID: ${item.orderId}  Store name: ${item.resName}`}>
                                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                            <Col className="gutter-row" span={6}>
                                                <div style={style}><CreditCardOutlined style={{fontSize:'24px'}} /> {item.price}</div>
                                            </Col>
                                            <Col className="gutter-row" span={6}>
                                                <div style={style}><ClockCircleFilled style={{fontSize:'24px'}}/> {item.date}</div>
                                            </Col>
                                        </Row>
                                        {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                            
                                            <Col className="gutter-row" span={6}>
                                                <div style={style}>
                                                    
                                                </div>
                                            </Col>
                                        </Row> */}
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