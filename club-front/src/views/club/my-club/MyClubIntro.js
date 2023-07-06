import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import { MyIcon } from '@/utils/MyIcon';
import HeanderTitle from '@/components/other/HeanderTitle';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

function MyClubIntro() {
  // store
  const {
    tokenStore,
    clubStore,
    clubMemberStore,
    clubReportStore,
    activityStore,
    activityProcessStore,
    costStore,
    costProcessStore,
  } = useRootStore();
  //   获取链接数据
  const params = useParams();
  useEffect(() => {
    // 用户担任职位
    clubStore.getUserBearPosition(params);
  }, []);
  useEffect(() => {
    clubStore.currentClubDesciption(params);
  }, []);
  // 清除数据
  useEffect(() => {
    return () => {
      clubStore.reset();
      clubMemberStore.reset();
      clubReportStore.reset();
      activityStore.reset();
      activityProcessStore.reset();
      costStore.reset();
      costProcessStore.reset();
    };
  }, []);
  // 社团信息
  const [clubInfo, setClubInfo] = useState({});
  // 社团名称
  const [title, setTitle] = useState('');
  useEffect(() => {
    const club = clubStore.currentClub;
    setClubInfo(club);
    setTitle(club['club_name']);
  }, [clubStore.currentClub]);
  const items = [];
  if (tokenStore.userInfo) {
    if (JSON.stringify(clubStore.userPosition) === '{}' && tokenStore.userInfo.userId !== '000000') {
      items.push({
        label: '社团信息',
        key: 'information',
        icon: MyIcon('HomeOutlined'),
      });
    } else {
      items.push(
        {
          label: '社团信息',
          key: 'information',
          icon: MyIcon('HomeOutlined'),
        },
        {
          label: '社团成员',
          key: 'member',
          icon: MyIcon('UserOutlined'),
        },
        {
          label: '社团活动',
          key: 'activity',
          icon: MyIcon('AppstoreOutlined'),
        },
        {
          label: '社团学期报告',
          key: 'report',
          icon: MyIcon('SolutionOutlined'),
        }
      );
    }
    if (
      (clubStore.userPosition['bear_name'] === '社长' || clubStore.userPosition['bear_name'] === '副社长') &&
      clubInfo.state !== 2
    ) {
      items.push(
        {
          label: '申请活动',
          key: 'apply-activity',
          icon: MyIcon('AppstoreAddOutlined'),
        },
        {
          label: '申请活动列表',
          key: 'apply-activity-list',
          icon: MyIcon('UnorderedListOutlined'),
        }
      );
    }
    if (clubStore.userPosition['bear_name'] === '社长' && clubInfo.state !== 2) {
      items.push({
        label: '申请资金',
        key: 'apply-money',
        icon: MyIcon('MoneyCollectOutlined'),
      });
    }
    if (
      clubStore.userPosition['bear_name'] === '社长' ||
      clubStore.userPosition['bear_name'] === '副社长' ||
      tokenStore.userInfo.userId === '000000'
    ) {
      items.push({
        label: '费用清单',
        key: 'cost-list',
        icon: MyIcon('MoneyCollectOutlined'),
      });
    }
    if (clubStore.userPosition['bear_name'] === '社长') {
      items.push({
        label: '社团解散',
        key: 'club-disband',
        icon: MyIcon('DeleteOutlined'),
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
export default observer(MyClubIntro);
