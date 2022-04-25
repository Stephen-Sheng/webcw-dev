import React, { useContext } from 'react';
import { Menu, Dropdown, Button } from 'antd';
import { UserContext } from './context';
import { DownOutlined } from '@ant-design/icons';
import { useNavigation } from 'react-navi';
import './Logout.css'

export default function Usermenu() {

    const { user, dispatch } = useContext(UserContext)
      let navigation = useNavigation()



    const menu = (
        <Menu>
            <Menu.Item key='profile'>
                <Button className="dropItem" type="text">
                    User Profile
                </Button>
            </Menu.Item>
            <Menu.Item key='logout'>
                <Button className="dropItem" type="text" onClick={()=>{dispatch({type:'LOGOUT'})}}>
                    Log out
                </Button>
            </Menu.Item >
            {user.userType === 'STO' && <Menu.Item key='storedetail'><Button className='dropItem' type='text' onClick={()=>{navigation.navigate('/Store-details')}}>Store detail</Button></Menu.Item>}
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
