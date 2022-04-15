import React, { useState, useContext } from 'react';
import { useInput } from 'react-hookedup';
import { Modal, Button, Input, Space, Alert } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import { UserContext } from './context';
import Logout from './Logout';
import { useNavigation } from 'react-navi';

export default function Login() {

  const { user, dispatch } = useContext(UserContext)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginErr, setLoginErr] = useState(false)
  const usernameInfo = useInput('')
  const passwordInfo = useInput('')
  let navigation = useNavigation()


  const showModal = () => {
    setVisible(true)
  };

  const handleOk = () => {
    const username = usernameInfo.value
    const password = passwordInfo.value
    if (username === 'Yutong' && password === "123") {
      dispatch({ type: 'LOGIN', username, userType: 'ADMIN' })
      localStorage.setItem("userInfo",user)
      // navigation.navigate('/admin')
      setLoading(true)
      setVisible(false)
      setLoading(false)

    } else {
      console.log("error");
      setLoginErr(true)
    }


    // setTimeout(() => {

    // }, 1000);
  };

  const handleCancel = () => {
    setLoginErr(false)
    setVisible(false)
  };

  // const { visible, loading } = this.state;
  if (!user.username) {
    return (
      <>
        <Button id="login_btn" type="primary" onClick={showModal}>
          Login
        </Button>
        <Modal
          visible={visible}
          title="Login"
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              Submit
            </Button>
          ]}
        >
          {loginErr && <Alert
            message="Login error"
            description="Invalid username or password"
            type="error"
            showIcon />
          }
          {loginErr && <br></br>}
          <Space direction="vertical">
            <Input placeholder="input username" value={usernameInfo.value} onChange={usernameInfo.onChange} prefix={<UserOutlined />} />
            <Input.Password
              placeholder="input password"
              value={passwordInfo.value}
              onChange={passwordInfo.onChange}
              prefix={<LockOutlined />}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Space>
        </Modal>
      </>
    );
  } else {
    return (<Logout />)
  }

}

