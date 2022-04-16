import React, { useState, useContext } from 'react';
import './Register.css';
import { useInput } from 'react-hookedup';
import { Select, Modal, Button, Input, Space, Alert, Radio } from 'antd';
import { UserContext } from './context';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';

export default function Register() {

  const [isModalVisible, setIsModalVisible] = useState(false)
  const { user, dispatch } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [loginErr, setLoginErr] = useState(false)
  const { Option } = Select;
  const identityInfo = useInput('')
  const usernameInfo = useInput('')
  const password1Info = useInput('')
  const password2Info = useInput('')
  const sexInfo = useInput('')
  const phoneInfo = useInput('')
  const emailInfo = useInput('')

  const [errorMessage, setErrorMessage] = useState("");
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const identity = identityInfo.value
    const username = usernameInfo.value
    const password1 = password1Info.value
    const password2 = password2Info.value
    const sex = sexInfo.value
    const phone = phoneInfo.value
    const email = emailInfo.value
    console.log(identity)
    if (password1 !== password2) {
      setLoginErr(true)
      setErrorMessage("The two passwords do not match")
    } else if (username === "" || password1 === "" || password2 === "" || sex === "" || phone === "" || email === "") {
      setLoginErr(true)
      setErrorMessage("Please fill in the complete information")
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
            description={ errorMessage }
            type="error"
            showIcon />
          }
          {loginErr && <br></br>}
          <Space direction="vertical">
            <Select defaultValue="merchant"  >
               <Option value="merchant">Merchant</Option>
               <Option value="customer">Customer</Option>
            </Select>
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
            <Input placeholder="input email" value={emailInfo.value} onChange={emailInfo.onChange} prefix={<MailOutlined />} />
          </Space>
        </Modal>
      </>
    );
  } else {
    return null
  }
}
