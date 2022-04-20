import { Table, Layout } from 'antd';
import { Typography } from 'antd';
import './Checkout.css'

const { Title } = Typography;

export default function Checkout(orderSummary) {

    console.log(orderSummary);
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Item price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Number',
            dataIndex: 'num',
            key: 'number',
        },
        {
            title: 'Total',
            key: 'total',
            dataIndex: 'total',
        }
    ];

    const data = orderSummary.orderSummary
    return (
    <Layout>
    <Table className='order-table' title={()=>{return <Title>Order Summary</Title>}} columns={columns} dataSource={data} />
    </Layout>
    )
}