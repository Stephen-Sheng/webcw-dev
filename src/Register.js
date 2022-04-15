import React, { useState, useContext } from 'react';
import './Register.css';
import { useInput } from 'react-hookedup';
import { Modal, Button, Input, Space, Alert, Radio } from 'antd';
import { UserContext } from './context';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined, PhoneOutlined, WechatOutlined } from '@ant-design/icons';

export default function Register() {

  const [isModalVisible, setIsModalVisible] = useState(false)
  const { user, dispatch } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [loginErr, setLoginErr] = useState(false)
  const usernameInfo = useInput('')
  const password1Info = useInput('')
  const password2Info = useInput('')
  const sexInfo = useInput('')
  const phoneInfo = useInput('')
  const emailInfo = useInput('')

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const username = usernameInfo.value
    const password1 = password1Info.value
    const password2 = password2Info.value
    const sex = sexInfo.value
    const phone = phoneInfo.value
    const email = emailInfo.value
    if (password1 !== password2) {
      console.log("mi ma bu yi zhi");
      setLoginErr(true)
    } else if (username === "" || password1 === "" || password2 === "" || sex === "" || phone === "" || email === "") {
      console.log("you kong");
      setLoginErr(true)
    } else {
      dispatch({ type: 'LOGIN', username, gender: sex })
      setLoading(true)
      setIsModalVisible(false)
      setLoading(false)
    }
  };

  const handleCancel = () => {
    setLoginErr(false)
    setIsModalVisible(false);
  };
  if (!user.username) {
    return (
      <>
        <Button id="register_btn" type="primary" onClick={showModal}>
          Register
        </Button>
        <Modal title="Register" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}
          footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
              Register
            </Button>
          ]}>
          {loginErr && <Alert
            message="Register error"
            description="fail!!!!"
            type="error"
            showIcon />
          }
          {loginErr && <br></br>}
          <Space direction="vertical">
            <Input placeholder="input username" value={usernameInfo.value} onChange={usernameInfo.onChange} prefix={<UserOutlined />} />
            <Input.Password
              placeholder="input password"
              prefix={<LockOutlined />}
              value={password1Info.value}
              onChange={password1Info.onChange}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            <Input.Password
              placeholder="input password again"
              prefix={<LockOutlined />}
              value={password2Info.value}
              onChange={password2Info.onChange}
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
            <Input placeholder="input phone" value={phoneInfo.value} onChange={phoneInfo.onChange} prefix={<PhoneOutlined />} />
            <Radio.Group onChange={sexInfo.onChange} value={sexInfo.value}>
              <Radio value={"M"}>Man</Radio>
              <Radio value={"W"}>Women</Radio>
            </Radio.Group>
            <Input placeholder="input email" value={emailInfo.value} onChange={emailInfo.onChange} prefix={<WechatOutlined />} />
          </Space>
        </Modal>
      </>
    );
  } else {
    return null
  }
}
