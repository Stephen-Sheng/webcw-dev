import React, { useState, useContext } from 'react';
import { useInput } from 'react-hookedup';
import { Form,Modal, Button, Input, Space, Alert, Checkbox } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import { UserContext } from './context';
import Usermenu from './Usermenu';
import { Link } from 'react-navi';
import { useResource } from 'react-request-hook';
// import { useNavigation } from 'react-navi';

export default function Login() {

  const { user, dispatch } = useContext(UserContext)
  const {userReq, getUserReq } = useResource((username,password)=>({
    url:`/login?username=${username}&password=${password}`,
    method:'GET'
  }))
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginErr, setLoginErr] = useState(false)
  const usernameInfo = useInput('')
  const passwordInfo = useInput('')
  // let navigation = useNavigation()


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

  const handleOk = () => {
    const username = usernameInfo.value
    const password = passwordInfo.value
    // if (username === 'Yutong' && password === "123") {
      getUserReq(username, password).then(console.log(userReq.data)).then(
        dispatch({ type: 'LOGIN', username: userReq.data.username, userType: 'STO', storeList: listData}),
        setLoading(true),
        setVisible(false),
        setLoading(false)
      )
      
      // navigation.navigate('/admin')
      

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
            <Form.Item>
              <Form.Item name="remember" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>
            <Form.Item>
                New to here?<Link href="/">register now!</Link>
            </Form.Item>

          </Space>
        </Modal>
      </>
    );
  } else {
    return (<Usermenu />)
  }

}

