import React, { useContext } from "react";
import Navmenu from "../Navmenu"
import Sidermenu from "../Sidermenu"
import { UserContext } from "../context";
import { Layout, Breadcrumb } from 'antd';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';

const { Content } = Layout;

export default function Page1() {

  const { user } = useContext(UserContext)

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );
  const restList = (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={user.storeList}
      footer={
        <div>
          <b>ant design</b> footer part
        </div>
      }
      renderItem={item => (
        <List.Item
          key={item.title}
          actions={[
            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
          ]}
          extra={
            <img
              width={272}
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          }
        >
          <List.Item.Meta
            avatar={<Avatar src={item.avatar} />}
            title={<a href={item.href}>{item.title}</a>}
            description={item.description}
          />
          {item.content}
        </List.Item>
      )}
    />
  )

  return (
    <Layout>
      <Navmenu selected = {['2']}/>
      <Layout>
        <Sidermenu />
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Page1</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {user.storeList && restList}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  )
}





