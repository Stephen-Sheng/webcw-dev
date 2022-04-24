import React, { useState, useContext } from 'react';
import { useInput } from 'react-hookedup';
import { Form, Modal, Button, Input, Space, Alert, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import { UserContext } from './context';
import Usermenu from './Usermenu';
import { Link } from 'react-navi';
import { useRequest } from 'react-request-hook';
import { useNavigation } from 'react-navi';

export default function Login() {

  const { user, dispatch } = useContext(UserContext)
  const [, getUserReq] = useRequest((username, password) => ({
    url: '/login',
    method: 'POST',
    data:{username, password}
  }))
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginErr, setLoginErr] = useState(false)
  const usernameInfo = useInput('')
  const passwordInfo = useInput('')
  let navigation = useNavigation()

  const showModal = () => {
    setVisible(true)
  };
  const listData = [];
  for (let i = 0; i < 23; i++) {
    listData.push({
      href: `/Store/${i}`,
      title: `ant design part ${i}`,
      avatar: 'https://joeschmoe.io/api/v1/random',
      description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    });
  }

  const handleOk = async () => {
    const username = usernameInfo.value
    const password = passwordInfo.value
    const { ready } = getUserReq(username, password);
    const data = await ready()
    dispatch({ type: 'LOGIN', username: data.name, userType: 'STO', storeList: listData })
    setLoading(true)
    setVisible(false)
    setLoading(false)
    navigation.navigate('/')

    // })
    // } else {
    //   console.log("error");
    //   setLoginErr(true)
    // }


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

            <Form>
              <Form.Item>
                <Form.Item name="remember" valuePropName='checked' noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Link className="login-form-forgot" href="/">
                  Forgot password
                </Link>
              </Form.Item>
              <Form.Item>
                New to here?<Link href="Register">register now!</Link>
              </Form.Item>
            </Form>
          </Space>
        </Modal>
      </>
    );
  } else {
    return (<Usermenu />)
  }

}


