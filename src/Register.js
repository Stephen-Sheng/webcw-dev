import React, { useState, useContext } from 'react';
import './Register.css';
import { useInput } from 'react-hookedup';
import { Select, Button, Input, Row, Form, Checkbox, Modal, Upload, message, Alert } from 'antd';
import { UserContext } from './context';
import { Link, useNavigation } from 'react-navi';
import { HomeOutlined, UploadOutlined } from '@ant-design/icons';
import { useRequest } from 'react-request-hook';
import { BigScreen, Mobile, Retina } from './responsive';

const { TextArea } = Input;
const props = {
  name: 'file',
  action: 'http://localhost:5020/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      console.log(info.file, info.fileList);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    console.log("error");
    return e;
  }

  return e.file.response;
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
export default function Register() {

  const { user } = useContext(UserContext)
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const usertypeInput = Form.useWatch('usertype', form)
  const [usernameCode, setUsernameCode] = useState('')
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [successResend, setSuccessResend] = useState(false)
  const [failResend, setFailResend] = useState(false)
  let navigation = useNavigation()
  const verifyCode = useInput('')
  const [, getRegisterSubmit] = useRequest((data) => ({
    url: '/register',
    method: 'POST',
    data
  }))
  const [, getCheckCode] = useRequest((username, verifyCode) => ({
    url: '/checkCode',
    method: 'POST',
    data: { username, verCode: verifyCode }
  }))
  const [, getResendCode] = useRequest((username) => ({
    url: '/resendCode',
    method: 'POST',
    data: { username }
  }))

  const onFinish = async (values) => {
    // trigger button loading status
    setIsSubmitLoading(true)
    console.log('Received values of form: ', values);
    // submit form to server
    const { ready } = getRegisterSubmit(values)
    try {
      // if successful, do the email verification
      setUsernameCode(values.username)
      const msg = await ready()
      setIsSubmitLoading(false)
      showModal()
    } catch (error) {
      // give the errors info if failed
      console.log(error);
      setIsSubmitLoading(false)
      if (error.code === 530) {
        message.error(error.data);
      }
      if (error.code === 903) {
        message.error(error.data)
      }
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const { ready } = getCheckCode(usernameCode, verifyCode.value)
    try {
      await ready()
      setIsModalVisible(false);
      navigation.navigate('/')
      message.success("You have successfully registered!")
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleResendClick = async () => {
    const { ready } = getResendCode(usernameCode)
    try {
      await ready()
      setSuccessResend(true)
    } catch (error) {
      setFailResend(true)
      console.log(error);
    }
  }
  if (!user.username) {
    return (
      <>
        <h1 id="header">Register</h1>
        <Row id="box">
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
          >
            <Form.Item
              name="username"
              label="Username"
              tooltip="What do you want others to call you?"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                  whitespace: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                {
                  required: true,
                  message: 'Please input your phone number!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="postcode"
              label="Postcode"
              rules={[
                {
                  required: true,
                  message: 'Please input your postcode!',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="usertype"
              label="Usertype"
              rules={[
                {
                  required: true,
                  message: 'Please select your usertype!',
                },
              ]}
            >
              <Select placeholder="select your usertype"  >
                <Option value="merchant">Restaurant Owner</Option>
                <Option value="customer">Customer</Option>
              </Select>
            </Form.Item>
            <Form.Item name="email" label="Email Address" required={true}>
              <Input placeholder="example@example.com" />
            </Form.Item>
            {usertypeInput === 'merchant' ? <><Form.Item name="resName" label="Store Name" required={true}>
              <Input
                placeholder="Enter your store name"
                prefix={<HomeOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
              <Form.Item name={"description"} label="Store Description" required={true}>
                <TextArea placeholder="Autosize height based on content lines" autoSize />
              </Form.Item>
              <Form.Item
                label="Store Figure"
                name="resImg"
                valuePropName='file'
                getValueFromEvent={normFile}
                rules={[{ required: true, message: 'Missing figure' }]}
              >
                <Upload {...props} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </>
              : null}

            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                },
              ]}
              {...tailFormItemLayout}
            >
              <Checkbox>
                I have read the <Link href="">agreement</Link>
              </Checkbox>
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Mobile>
                <Button id="back_btn" className='mobile' > <Link href="/">Back</Link>
                </Button>
                <Button id="reg_btn" type="primary" htmlType="submit" className='mobile' loading={isSubmitLoading}>
                  Register
                </Button>
              </Mobile>
              <BigScreen>
                <Button id="back_btn" > <Link href="/">Back</Link>
                </Button>
                <Button type="primary" htmlType="submit" loading={isSubmitLoading}>
                  Register
                </Button>
              </BigScreen>
              <Retina>
                <Button id="back_btn"> <Link href="/">Back</Link>
                </Button>
                <Button id="reg_btn" type="primary" htmlType="submit" loading={isSubmitLoading}>
                  Register
                </Button>
              </Retina>
            </Form.Item>
          </Form>
          <Modal title="Email Verification" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            {successResend && <Alert message="Successfully resend!" type="success" showIcon closable />}
            {failResend && <Alert message="Resend failed" type="error" showIcon closable />}
            <p>We have sent a code to your email, please check your inbox and submit the code!</p>
            <Input placeholder="verification code" value={verifyCode.value} onChange={verifyCode.onChange} />
            <p style={{ marginTop: "2%" }}>Don't receive the code?<Button type='link' onClick={handleResendClick}> Click here to resend the code</Button></p>
          </Modal>
        </Row>
      </>
    );
  } else {
    return null
  }
}
