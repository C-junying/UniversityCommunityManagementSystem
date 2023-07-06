import React from 'react';
import { Layout } from 'antd';
import SideMenu from '@/components/back-stage/SideMenu';
import TopHeader from '@/components/back-stage/TopHeader';
import BottomFooter from '@/components/back-stage/BottomFooter';
import './BackStage.css';
import { Outlet } from 'react-router-dom';
const { Content } = Layout;
export default function BackStage() {
  return (
    <Layout>
      <SideMenu />
      <Layout style={{ marginLeft: 200 }}>
        <TopHeader />
        <Content
          style={{
            marginTop: '24px',
            // overflow: 'auto',
            background: 'white',
          }}>
          <div
            style={{
              minHeight: '78vh',
              padding: 18,
              background: 'white',
            }}>
            {/* <BackStageRouter /> */}
            <Outlet />
          </div>
          <BottomFooter />
        </Content>
      </Layout>
    </Layout>
  );
}
