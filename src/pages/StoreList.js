import React, { useContext, useEffect } from "react";
import { Layout, Breadcrumb, List, Spin } from 'antd';
import { Link } from "react-navi";
import { useResource } from 'react-request-hook';

import Navmenu from "../Navmenu"
import Sidermenu from "../Sidermenu"
import { UserContext } from "../context";

const { Content } = Layout;

export default function StoreList() {

  const { user } = useContext(UserContext)
  const [storeList, getStoreList] = useResource(() => ({
    url: `/resList?username=${user.username}`,
    method: 'GET',
  }))
  useEffect(() => {
    if(user){
      getStoreList()
    }
  }, [user, getStoreList])

  if (storeList.isLoading) {
    return (
      <Layout>
          <Navmenu selected={['2']} />
          <Layout>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link href={'/'}>Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Store list</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <Spin size="large" tip="Loading..."/>
              </Content>
            </Layout>
          </Layout>
        </Layout>
    )
  } else {
    if (user) {
      console.log(storeList);
      return (
        <Layout>
          <Navmenu selected={['2']} />
          <Layout>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link href={'/'}>Home</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Store list</Breadcrumb.Item>
              </Breadcrumb>
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                }}
              >
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    onChange: page => {
                      console.log(page);
                    },
                    pageSize: 3,
                  }}
                  dataSource={storeList.data}
                  footer={
                    <div>
                      <b>ant design</b> footer part
                    </div>
                  }
                  renderItem={item => (
                    <List.Item
                      key={item.resName}
                      extra={
                        <img
                          width={172}
                          height={172}
                          alt="logo"
                          src={item.resImg}
                        />
                      }
                    >
                      <List.Item.Meta
                        title={<Link href={`/Store/${item.resId}`}>{item.resName}</Link>}
                        description={item.description}
                      />
                      {item.location}
                    </List.Item>
                  )}
                />
              </Content>
            </Layout>
          </Layout>
        </Layout>
      )
    }else{
      return (
          <Layout>
            <Navmenu selected={['2']} />
            <Layout>
              <Layout style={{ padding: '0 24px 24px' }}>
                <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item><Link href={'/'}>Home</Link></Breadcrumb.Item>
                  <Breadcrumb.Item>Store list</Breadcrumb.Item>
                </Breadcrumb>
                <Content
                  className="site-layout-background"
                  style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                  }}
                >
                  Please login first
                </Content>
              </Layout>
            </Layout>
          </Layout>
      )
    }

  }


}





