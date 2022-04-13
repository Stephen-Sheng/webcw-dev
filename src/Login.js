import React, { useState, useContext } from 'react';
import { useInput } from 'react-hookedup';
import { Modal, Button, Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import { UserContext } from './context';

export default function Login(){

  const user = useContext(UserContext)
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const {username, changeUsername} = useInput('')
  const {password, changePassword} = useInput('')


  const showModal = () => {
    setVisible(true)
  };

  const handleOk = () => {
    
    setLoading(true)
    setTimeout(() => {
      setVisible(false)
      setLoading(false)
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false)
  };

    // const { visible, loading } = this.state;
    if (!user.username){
      return (
        <>
          <Button id = "login_btn" type="primary" onClick={showModal}>
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
              <Space direction="vertical">
                  <Input placeholder="input username" value = {username} onChange = {changeUsername} prefix={<UserOutlined />} />
                  <Input.Password
                      placeholder="input password"
                      value={password}
                      onChange = {changePassword}
                      prefix={<LockOutlined />}
                      iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
              </Space>
          </Modal>
        </>
      );
    }else{
      return(<Button id = "login_btn" type="primary">
      {"Hello! " + user.username}
    </Button>)
    }
    
}

