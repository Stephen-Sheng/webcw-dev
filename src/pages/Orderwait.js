import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import Navmenu from "../Navmenu";


export default function Orderwait(){

    return (
        <Layout>
            <Navmenu selected = {'3'} />
            <Content style={{margin:'2%',background:'#fff'}}>
                Here are ur order list
            </Content>
        </Layout>
    )
}