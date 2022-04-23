import React from "react";
import { Link } from "react-navi";
import { Layout, Button, Result } from 'antd';
import Navmenu from "../Navmenu";

const { Content } = Layout;

export default function OrderSuccess(props) {
    const orderNumber = '129038129381787123'
    return (
        <Layout>
            <Navmenu selected={'2'} />
            <Content style={{ background: '#fff', margin: '2%' }}>
                <Result
                    status="success"
                    title="Successfully Ordered!"
                    subTitle={`Order number: ${orderNumber}. Good staff is working for your order, please wait.`}
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