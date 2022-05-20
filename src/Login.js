import React, { useState, useContext } from 'react';
import { useInput } from 'react-hookedup';
import { Form, Modal, Button, Input, Space, Alert, Checkbox, notification } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import { UserContext } from './context';
import Usermenu from './Usermenu';
import { Link } from 'react-navi';
import { useRequest } from 'react-request-hook';
import { useNavigation } from 'react-navi';
import { BigScreen, Mobile, Retina } from './responsive';
import { GoogleLogin } from 'react-google-login';

const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};

const openNotification = (info) => {
  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" onClick={() => notification.close(key)}>
      Confirm
    </Button>
  );
  notification.open({
    message: 'Notification Title',
    description:
      info,
    btn,
    key,
    onClose: close,
  });
};

export default function Login() {

  const { user, dispatch } = useContext(UserContext)
  const [, getUserReq] = useRequest((username, password, flag) => ({
    url: '/login',
    method: 'POST',
    data: { username, password, flag }
  }))
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loginErr, setLoginErr] = useState(false)
  const [alreadyRegErr, setAlreadyRegErr] = useState(false)
  const [pendingRej, setPendingRej] = useState(false)
  const usernameInfo = useInput('')
  const passwordInfo = useInput('')
  let navigation = useNavigation()

  const showModal = () => {
    setVisible(true)
  };
  const handleOk = async () => {
    const username = usernameInfo.value
    const password = passwordInfo.value
    const { ready } = getUserReq(username, password);
    try {
      const data = await ready()
      dispatch({ type: 'LOGIN', username: data.userInfo.name, userType: data.userInfo.userType, storeList: [] })
      setLoading(true)
      setVisible(false)
      setLoading(false)
      if (data.store.length !== 0) {
        openNotification(data.store)
      }
      if (data.userInfo.userType === "STO") {
        navigation.navigate('/home')
      } else {
        navigation.navigate('/')
      }
    } catch (error) {
      if (error.code === 530) {
        setLoginErr(true)
      } else if (error.code === 911) {
        setAlreadyRegErr(true)
      } else if (error.code === 912) {
        setPendingRej(true)
      }
    }
  };

  const handleCancel = () => {
    setLoginErr(false)
    setVisible(false)
    setAlreadyRegErr(false)
    setPendingRej(false)

  };
  const responseGoogle = async (response) => {
    console.log(response);
    const { ready } = getUserReq(response.profileObj.name, "googlelogin", "google");
    try {
      const data = await ready()
      dispatch({ type: 'LOGIN', username: data.userInfo.name, userType: data.userInfo.userType, storeList: [] })
      setLoading(true)
      setVisible(false)
      setLoading(false)

      if (data.store.length !== 0) {
        openNotification(data.store)
      }
      if (data.userInfo.userType === "STO") {
        navigation.navigate('/home')
      } else {
        navigation.navigate('/')
      }

    } catch (error) {
      console.log(error);
      if (error.code === 530) {
        navigation.navigate('/google-reg', { body: response })

      }
    }


  }
  if (!user.username) {
    return (
      <>
        <BigScreen>
          <Button className='big-screen' id="login_btn" type="primary" onClick={showModal}>
            Login
          </Button>
        </BigScreen>
        <Mobile>
          <Button className='mobile' id="login_btn" type="primary" onClick={showModal}>
            Login
          </Button>
        </Mobile>
        <Retina>
          <Button id="login_btn" type="primary" onClick={showModal}>
            Login
          </Button>
        </Retina>


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
          {alreadyRegErr && <Alert
            message="Login error"
            description="Your account is still being pended, please wait!"
            type="error"
            showIcon />
          }
          {alreadyRegErr && <br></br>}
          {pendingRej && <Alert
            message="Login error"
            description="Your account application is rejected by the admin."
            type="error"
            showIcon />
          }
          {pendingRej && <br></br>}
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
                New to here?<Link href="Register">register now!</Link>
              </Form.Item>
            </Form>
            <GoogleLogin
              clientId="529729795538-rqabdhqfgvhg3lcjuoj8mc7muhakn92m.apps.googleusercontent.com"
              buttonText="Google Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </Space>
        </Modal>
      </>
    );
  } else {
    return (<Usermenu />)
  }

}
