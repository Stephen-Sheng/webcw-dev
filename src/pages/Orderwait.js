import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import Navmenu from "../Navmenu";
import { UserContext } from "../context";
import { useContext } from "react";


export default function Orderwait(){

    const { user } = useContext(UserContext)
    if (user){
        return (
            <Layout>
                <Navmenu selected = {'3'} />
                <Content style={{margin:'2%',background:'#fff'}}>
                    Here are ur order list
                </Content>
            </Layout>
        )
    }else{
        return(
            <Layout>
                <Navmenu selected = {'3'} />
                <Content style={{margin:'2%',background:'#fff'}}>
                    Please login first and then check your orders
                </Content>
            </Layout>
        )
    }
    
}