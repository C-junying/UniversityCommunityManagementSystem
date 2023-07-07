import { Layout, Menu } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.css';
import { http } from '@/utils/http';
import { setItems, setPath } from '@/utils/menuTree';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';
const { Sider } = Layout;

let items = [];

function SideMenu() {
  // store 信息
  const { menuStore } = useRootStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [selectKey, setSelectKey] = useState(
    setPath(location.pathname === '/backstage' ? '/backstage/home' : location.pathname)
  );
  useEffect(() => {
    menuStore.tokenMenuList();
  }, []);
  useEffect(() => {
    setSelectKey(setPath(location.pathname));
  }, [location.pathname]);
  items = setItems(menuStore.selfMenu);
  // console.log(menuStore.selfMenu);
  return (
    <Sider
      style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100 }}>
      <div className="logo">高校社团管理系统</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={selectKey}
        defaultOpenKeys={selectKey}
        onClick={({ key, keyPath, domEvent }) => {
          // console.log(key, keyPath, domEvent)
          navigate(key);
        }}
        items={items}
      />
    </Sider>
  );
}
export default observer(SideMenu);
