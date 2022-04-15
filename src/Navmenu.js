import { Layout, Menu } from 'antd';
import Login from './Login';
import { Link } from 'react-navi';
import Register from './Register';
const { Header } = Layout;


export default function Navmenu() {

    return (
        <Header className="header">
            <div className="logo" />

            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                <Menu.Item key="1"><Link href={'/page1'}>nav 1</Link></Menu.Item>
                <Menu.Item key="2">nav 2</Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>

            </Menu>
            <Login />
            <Register />

        </Header>
    )
}