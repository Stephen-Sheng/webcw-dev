import { Layout, Menu } from 'antd';
import Login from './Login';
import { Link } from 'react-navi';
import Register from './Register';
const { Header } = Layout;


export default function Navmenu(props) {

    return (
        <Header className="header">
            <div className="logo" />

            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={props.selected}>

                <Menu.Item key="1"><Link href={'/'}>Homepage</Link></Menu.Item>
                <Menu.Item key="2"><Link href={'/Storelist'}>Nearby restaurants</Link></Menu.Item>
                <Menu.Item key="3"><Link href={'/orders'}>Orders</Link></Menu.Item>

            </Menu>
            <Login />
            <Register />

        </Header>
    )
}