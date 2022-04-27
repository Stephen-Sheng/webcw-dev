import { Layout, Menu, message } from 'antd';
import Login from '../../Login';
import Register_btn from '../../Register_btn';
import { Link } from 'react-navi';
import { UserContext } from '../../context';
import { useContext } from "react";

const { Header } = Layout;



export default function StoNavmenu(props) {

    const { user } = useContext(UserContext)
    const loginInfo = () => {
        message.info('Please login first and then check your nearby restaurants and orders');
    };

    return (
        <Header className="header">
            <div className="logo" />

            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={props.selected}>

                <Menu.Item key="1"><Link href={'/home'}>Homepage</Link></Menu.Item>

                {user ? <><Menu.Item key="2"><Link href={'/current-orders'}>Current Orders</Link></Menu.Item>
                    <Menu.Item key="3"><Link href={'/orders'}>History Orders</Link></Menu.Item>
                </> :
                    <>
                    <Menu.Item key="2"><Link href={'/current-orders'} onClick={loginInfo}>Current Orders</Link></Menu.Item>
                    <Menu.Item key="3"><Link href={'/orders'}><div onClick={loginInfo}>History Orders</div></Link></Menu.Item>
                    </>
                }


            </Menu>
            <Login />
            <Register_btn />

        </Header>
    )
}