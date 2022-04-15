import React, { useContext } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { UserContext } from './context';
import { DownOutlined } from '@ant-design/icons';
import './Logout.css'

export default function Logout() {

    const { user, dispatch } = useContext(UserContext)


    const menu = (
        <Menu>
            <Menu.Item>
                <Button className="dropItem" type="text">
                    User Profile
                </Button>
            </Menu.Item>
            <Menu.Item>
                <Button className="dropItem" type="text" onClick={()=>{dispatch({type:'LOGOUT'})}}>
                    Log out
                </Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Button type="text" id="dropMenu_btn" > Hello,{user.username}!{user.userType} <DownOutlined /> </Button>
            </Dropdown>
        </>
    )
}
