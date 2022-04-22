import { Layout, Menu } from 'antd';
import Login from './Login';
import Register_btn from './Register_btn';
import { Link } from 'react-navi';
import Register from './Register';
const { Header } = Layout;


export default function Navmenu(props) {

    return (
        <Header className="header">
            <div className="logo" />

            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={props.selected}>

                <Menu.Item key="1"><Link href={'/'}>nav 1</Link></Menu.Item>
                <Menu.Item key="2"><Link href={'/Storelist'}>nav 2</Link></Menu.Item>
                <Menu.Item key="3">nav 3</Menu.Item>

            </Menu>
            <Login />
            <Register_btn />

        </Header>
    )
}