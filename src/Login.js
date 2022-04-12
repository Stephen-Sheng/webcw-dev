import React, { useState } from 'react';

import { Modal, Button, Input, Space } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'

export default function Login(){

  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)


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
                <Input placeholder="input username" prefix={<UserOutlined />} />
                <Input.Password
                    placeholder="input password"
                    prefix={<LockOutlined />}
                    iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                />
            </Space>
        </Modal>
      </>
    );
}

