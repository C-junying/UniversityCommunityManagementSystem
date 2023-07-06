import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { MyIcon } from '@/utils/MyIcon';
import HeanderTitle from '@/components/other/HeanderTitle';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';
function ActivityInfo() {
  // store
  const { tokenStore, activityStore, activityMemberStore, activityStageStore } = useRootStore();
  //   获取链接数据
  const params = useParams();
  // 获取用户职位
  useEffect(() => {
    activityStore.getUserBearPosition(params);
  }, [params]);
  // 获取活动信息
  useEffect(() => {
    activityStore.currentActivityDesciption(params);
  }, []);
  // 活动名称
  const [title, setTitle] = useState('');
  // 更新
  useEffect(() => {
    const activity = activityStore.currentActivity;
    setTitle(activity['activity_title']);
  }, [activityStore.currentActivity]);
  // 清除副作用
  useEffect(() => {
    return () => {
      activityStore.reset();
      activityMemberStore.reset();
      activityStageStore.reset();
    };
  }, []);
  const items = [];
  if (tokenStore.userInfo) {
    if (JSON.stringify(activityStore.userPosition) === '{}' && tokenStore.userInfo.userId !== '000000') {
      items.push({
        label: '活动信息',
        key: 'information',
        icon: MyIcon('HomeOutlined'),
      });
    } else {
      items.push(
        {
          label: '活动信息',
          key: 'information',
          icon: MyIcon('HomeOutlined'),
        },
        {
          label: '活动成员',
          key: 'member',
          icon: MyIcon('UserOutlined'),
        },
        {
          label: '活动阶段',
          key: 'activity-stage',
          icon: MyIcon('AppstoreOutlined'),
        }
      );
    }
    if (
      activityStore.userPosition['bear_name'] === '活动负责人' ||
      activityStore.currentActivity['activity_state'] === 2
    ) {
      items.push({
        label: '活动总结',
        key: 'report',
        icon: MyIcon('SolutionOutlined'),
      });
    }
  }
  // 跳转
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname.split('/');
  // 设置顶部菜单的选中
  const [current, setCurrent] = useState(path[path.length - 1]);
  useEffect(() => {
    const currentPath = location.pathname.split('/');
    setCurrent(currentPath[currentPath.length - 1]);
  }, [location.pathname]);

  // 顶部菜单点击响应
  const onClick = (e) => {
    setCurrent(e.key);
    navigate(e.key, { replace: true });
  };

  return (
    <>
      <HeanderTitle title={title} onBack={() => navigate(-2)} />
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
        style={{ marginBottom: 20 }}
      />
      <Outlet />
    </>
  );
}
export default observer(ActivityInfo);
