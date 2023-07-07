import React, { useEffect } from 'react';
import { Layout } from 'antd';
import SideMenu from '@/components/back-stage/SideMenu';
import TopHeader from '@/components/back-stage/TopHeader';
import BottomFooter from '@/components/back-stage/BottomFooter';
import './BackStage.css';
import { Outlet } from 'react-router-dom';
import { useRootStore } from '@/stores/RootStore';
const { Content } = Layout;
export default function BackStage() {
  // store
  const { styleStore } = useRootStore();
  useEffect(() => {
    // 修改宽度
    if (window.innerWidth === document.documentElement.clientWidth) {
      styleStore.setWidth(styleStore.maxWidth);
    } else {
      styleStore.setWidth(styleStore.defaultWidth);
    }
  }, [styleStore.width, document.documentElement.clientWidth]);
  return (
    <Layout>
      <SideMenu />
      <Layout style={{ marginLeft: 200 }}>
        <TopHeader />
        <Content
          style={{
            marginTop: '24px',
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
