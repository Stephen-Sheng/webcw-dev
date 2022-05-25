import { Layout, List, Card, Row, Col, Divider, Button, message, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { useRequest, useResource } from "react-request-hook";
import { Content } from "antd/lib/layout/layout";
import StoNavmenu from "./StoNavMenu";
import { UserContext } from "../../context";
import { useContext } from "react";
import { CreditCardOutlined, ClockCircleFilled } from '@ant-design/icons'
import { subscribeUncompletedOrderLst } from "../../utils";

const { Option } = Select;


export default function CurrentOrders() {


    const { user } = useContext(UserContext)
    const [isDropLoading, setIsDropLoading] = useState(false)
    const [rider, setRider] = useState('')
    const [orderLst, setOrderLst] = useState([])
    const [riderListData, setRiderListData] = useState([])
    const style = { padding: '8px 0' };
    const [, getChangeOrderStatus] = useRequest((orderId, status, rider) => ({
        url: '/changeOrderStatus',
        method: 'POST',
        data: { orderId, status, rider }
    }))
    const [riderList, getRiderList] = useRequest(() => ({
        url: '/riderList',
        method: 'GET'
    }))
    const handleSubmit = async (orderId, index) => {
        // if(rider === ''){
        //     setRider(riderListData[0].riderName)
        // }
        const { ready } = getChangeOrderStatus(orderId, "in delivery", rider)
        const msg = await ready()
        console.log(msg);
        if (msg === 'Status changed!') {
            message.success('Distributing a delivery staff');
            setRider('')
        }

    }

    function handleChange(value) {
        setRider(value)
        console.log(`selected ${value}`);
    }
    async function handleKeyDown() {
        setIsDropLoading(true)
        const { ready } = getRiderList()
        const data = await ready()
        console.log(data);
        setRiderListData(data.filter((item)=>item.riderName !== "null"))
        setIsDropLoading(false)
    }
    useEffect(() => {
        subscribeUncompletedOrderLst(user.username, (err, orderLst) => { setOrderLst(orderLst); console.log(orderLst); });
    }, [user.username])

    if (user) {
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
                        dataSource={orderLst}
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

                                    <Button type="primary" onClick={() => handleSubmit(item.orderId, index)} style={{marginRight:"1%",marginTop:"1%"}}>Orders Ready</Button>
                                    <Select style={{ width: 120 }} onChange={handleChange} onDropdownVisibleChange={handleKeyDown} loading={isDropLoading}>
                                        {riderListData.map((item) => {
                                            return <Option key={item.riderName} value={item.riderName}>{item.riderName}</Option>
                                        })}
                                    </Select>
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
                <StoNavmenu selected={'2'} />
                <Content style={{ margin: '2%', background: '#fff' }}>
                    Please login first and then check your upcoming orders
                </Content>
            </Layout>
        )
    }

}