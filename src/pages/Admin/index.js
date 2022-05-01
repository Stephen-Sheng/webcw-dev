import { Col, Card, Row, Divider, Button, } from "antd";
import { useRequest } from "react-request-hook";
import React, { useEffect, useState } from "react";
import { List, Spin } from 'antd';
import { useNavigation } from "react-navi";

const style = { padding: '8px 0' };
export default function Admin() {

    let navigation = useNavigation()
    const [pendingData, setPendingData] = useState([])
    const [, getPendingList] = useRequest(() => ({
        url: '/verifyPage',
        method: 'GET'
    }))
    const [, getPendingSubmit] = useRequest((username, result) => ({
        url: '/verify',
        method: 'POST',
        data: { username, result }
    }))

    const handleReject = async (username) => {
        const { ready } = getPendingSubmit(username, "reject")
        const msg = await ready()
        setPendingData(pendingData.filter(item => item.name !== username))
        console.log(pendingData);


    }

    const handleApproved = async (username) => {
        const { ready } = getPendingSubmit(username, "approve")
        const msg = await ready()
        setPendingData(pendingData.filter(item => item.name !== username))
        console.log(pendingData);
    }

    useEffect(() => {
        async function fetchData() {
            const { ready } = getPendingList()
            const data = await ready()
            setPendingData(data)
        }
        fetchData()
    }, [getPendingList])

    if (!pendingData) {
        return <Spin size="large" />
    } else {
        return (
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
                dataSource={pendingData}
                renderItem={(item, index) => (
                    <List.Item>
                        <Card title={`ID: ${item.id}  Store name: ${item.resName}`}>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col className="gutter-row" span={6}>
                                    <div style={style}>{item.location}</div>
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <div style={style}>{item.date}</div>
                                </Col>
                            </Row>
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col className="gutter-row" span={6}>
                                    <img
                                        width={172}
                                        height={172}
                                        alt="logo"
                                        src={item.resImg} />
                                </Col>
                            </Row>
                            <Divider style={{ margin: 0 }} />
                            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                                <Col className="gutter-row" span={6}>
                                    <Button danger onClick={() => { handleReject(item.name) }}>Reject</Button>
                                </Col>
                                <Col className="gutter-row" span={6}>
                                    <Button type="primary" onClick={() => { handleApproved(item.name) }}>Approved</Button>
                                </Col>
                            </Row>

                        </Card>
                    </List.Item>
                )}
            />
        )
    }

}