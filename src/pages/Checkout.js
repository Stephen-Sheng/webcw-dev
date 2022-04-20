import { Table, Tag, Space } from 'antd';
import Title from 'antd/lib/skeleton/Title';

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
    return <Table columns={columns} dataSource={data} />
}