import { Layout, Menu, message } from 'antd';
import Login from './Login';
import { Link } from 'react-navi';
import Register from './Register';
import { UserContext } from './context';
import { useContext } from "react";

const { Header } = Layout;



export default function Navmenu(props) {

    const { user } = useContext(UserContext)
    const loginInfo = () => {
        message.info('Please login first and then check your nearby restaurants and orders');
    };

    return (
        <Header className="header">
            <div className="logo" />

            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={props.selected}>

                <Menu.Item key="1"><Link href={'/'}>Homepage</Link></Menu.Item>

                {user ? <><Menu.Item key="2"><Link href={'/Storelist'}>Nearby restaurants</Link></Menu.Item>
                    <Menu.Item key="3"><Link href={'/orders'}>Orders</Link></Menu.Item>
                </> :
                    <>
                    <Menu.Item key="2"><div onClick={loginInfo}>Nearby restaurants</div></Menu.Item>
                    <Menu.Item key="3"><div onClick={loginInfo}>Orders</div></Menu.Item>
                    </>
                }


            </Menu>
            <Login />
            <Register />

        </Header>
    )
}