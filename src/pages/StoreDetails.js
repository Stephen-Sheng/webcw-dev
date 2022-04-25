import React from "react";
import './StoreDetails.css'
// import { UserContext } from "../context";
import { Layout, PageHeader, Divider, Form, Input, Button, Space, Upload, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigation } from 'react-navi';

const { Content } = Layout;
const { TextArea } = Input;
const props = {
    name: 'file',
    action: 'http://localhost:5020/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
};
const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};

export default function StoreDetails() {

    // const { user } = useContext(UserContext)
    const [form] = Form.useForm();

    const onFinish = values => {
        console.log('Received values of form:', values);
        navigation.goBack()
    };
    let navigation = useNavigation()
    return (
        <Layout>
            <PageHeader
                onBack={() => navigation.goBack()}
                title="Store Details"
                subTitle="Please fill in all your store details!"
            />
            <Divider />
            <Content
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                }}
            >
                <Form form={form} id="detail_form" name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off" size="large">
                    <Divider orientation="left">Store details</Divider>

                    <Form.Item name="store_name" label="Store name" rules={[{ required: true, message: 'Missing area' }]}>
                        {/* <Select options={areas} onChange={handleChange} /> */}
                        <Input id="store_name" placeholder="Input your store name" />
                    </Form.Item>
                    <Divider orientation="left">Menu details</Divider>
                    <Form.List name="items">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <Space key={field.key} align="baseline">
                                        <Form.Item
                                            noStyle
                                            shouldUpdate={(prevValues, curValues) =>
                                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                            }
                                        >
                                            {() => (
                                                <Form.Item
                                                    {...field}
                                                    key="name"
                                                    label="Item Name"
                                                    name={[field.name, 'name']}
                                                    rules={[{ required: true, message: 'Missing Item' }]}
                                                >
                                                    <Input placeholder="Input your item name" />
                                                </Form.Item>
                                            )}
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            key="price"
                                            label="Price"
                                            name={[field.name, 'price']}
                                            rules={[{ required: true, message: 'Missing price' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            key="desc"
                                            label="Description"
                                            name={[field.name, 'description']}
                                            rules={[{ required: true, message: 'Missing description' }]}
                                        >
                                            <TextArea
                                                placeholder="Item description"
                                                autoSize={{ minRows: 2, maxRows: 6 }}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            key="figure"
                                            label="Figure"
                                            name={[field.name, 'figure']}
                                            valuePropName="fileList"
                                            getValueFromEvent={normFile}
                                            rules={[{ required: true, message: 'Missing figure' }]}
                                        >
                                            <Upload {...props} maxCount={1}>
                                                <Button icon={<UploadOutlined />}>Click to Upload</Button>
                                            </Upload>
                                        </Form.Item>

                                        <MinusCircleOutlined onClick={() => remove(field.name)} />
                                    </Space>
                                ))}

                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add Items
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Content>
        </Layout>
    )
}