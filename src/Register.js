import React, { useState, useContext } from 'react';
import './Register.css';
import { Select, Button, Input, Row, Form, Checkbox, Modal, Upload, message } from 'antd';
import { UserContext } from './context';
import { Link } from 'react-navi';
import { HomeOutlined, UploadOutlined } from '@ant-design/icons';
import { useRequest } from 'react-request-hook';
import { useNavigation } from 'react-navi';

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
  let navigation = useNavigation()
  const [, getRegisterSubmit] = useRequest((data) => ({
    url: '/register',
    method: 'POST',
    data
  }))

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const { ready } = getRegisterSubmit(values)
    try {
      const msg = await ready()
      console.log("msg", msg);
      if(msg === "Waiting for verification"){
        message.success("You have registered successfully, but you can't login until you've been approved by the admin! ");
      }else{
        message.success("You have registered successfully! ");
      }
      navigation.goBack()
    } catch (error) {
      console.log(error);
      if(error.code === 530){
        message.error(error.data);
      }
    }
    
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


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
                <Option value="merchant">Merchant</Option>
                <Option value="customer">Customer</Option>
              </Select>
            </Form.Item>
            {/* <Form.Item
              name="gender"
              label="Gender"
              rules={[
                {
                  required: true,
                  message: 'Please select gender!',
                },
              ]}
            >
              <Select placeholder="select your gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item> */}
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
              <Button id="back_btn"> <Link href="/">Back</Link>
              </Button>
              <Button type="primary" htmlType="submit">
                Register
              </Button>
            </Form.Item>
          </Form>
          <Modal title="Registered successfully" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Link href="/">Click here to login now </Link>
          </Modal>
        </Row>
      </>
    );
  } else {
    return null
  }
}
