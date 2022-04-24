import React, { useEffect } from "react";
import { Link } from "react-navi";
import { Layout, Button, Result, Spin } from 'antd';
import Navmenu from "../Navmenu";
import { useResource } from "react-request-hook";

const { Content } = Layout;

export default function OrderSuccess(props) {

    const [orderId, getOrderId] = useResource((order) => ({
        url: '/checkInfo',
        method: 'POST',
        data:{orderInfo: order}
    }))
    useEffect(() => {
        getOrderId(props.orderInfo)
    }, [getOrderId, props.orderInfo])

    if (orderId.isLoading || !orderId.data) {
        return <Spin />
    } else {
        return (
            <Layout>
                <Navmenu selected={'2'} />
                <Content style={{ background: '#fff', margin: '2%' }}>
                    <Result
                        status="success"
                        title="Successfully Ordered!"
                        subTitle={`Order number: ${orderId.data.orderId}. Good staff is working for your order, please wait.`}
                        extra={[
                            <Button type="primary" key="another-order">
                                <Link href={'/Storelist'}>
                                    Another order
                                </Link>
                            </Button>,
                            <Button key="check-order">
                                <Link href={'/orders'}>
                                    Go to check orders
                                </Link>
                            </Button>,
                        ]}
                    />
                </Content>
            </Layout>
        )
    }



}