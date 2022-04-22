import { Table, Layout, Row, Col, Typography,Button } from 'antd';
import './Checkout.css'
import { useNavigation } from 'react-navi';
import Navmenu from '../Navmenu'

const { Title } = Typography;
const { Content } = Layout;

export default function Checkout(orderSummary) {
    let navigation = useNavigation()
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

    const handleOk = () => {
        navigation.navigate('/orders')
    } 
    const handleGoBack = () => {
        navigation.goBack()
    } 

    const data = orderSummary.orderSummary
    return (
        <Layout>
            <Navmenu selected = {'2'}/>
            <Content style={{background: '#fff',margin:'2%'}}>
            <Table className='order-table' title={() => { return <Title>Order Summary</Title> }} columns={columns} dataSource={data} />
            <Row>
                <Col span={12} style={{right:'-30%'}}>
                    <Button onClick={handleGoBack}>Back</Button>
                </Col>
                <Col span={12} style={{right:'-10%'}}>
                    <Button type="primary" onClick={handleOk}>Checkout</Button>
                </Col>
            </Row>
            </Content>
        </Layout>
    )
}