import React, { useEffect } from 'react';
import { Table, Input, Tag } from 'antd';
import { NavLink } from 'react-router-dom';
import HeanderTitle from '@/components/other/HeanderTitle';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

const { Search } = Input;
// 活动列表
function ActivityList() {
  // store
  const { activityStore } = useRootStore();
  useEffect(() => {
    // 获取活动列表
    activityStore.getAllActivityList();
  }, []);
  const columns = [
    {
      title: '活动名称',
      dataIndex: 'activity_title',
      key: 'activity_title',
      render: (key, item) => {
        return (
          <NavLink to={`/activity/list/${item['activity_id']}/intro`}>
            <b>{key}</b>
          </NavLink>
        );
      },
    },
    {
      title: '举办方',
      dataIndex: 'club_name',
      key: 'club_name',
      render: (key) => {
        return <b>{key}</b>;
      },
    },
    {
      title: '活动类型',
      dataIndex: 'type_name',
      key: 'type_name',
    },
    {
      title: '活动场地',
      dataIndex: 'area_name',
      key: 'area_name',
    },
    {
      title: '代表图',
      dataIndex: 'picture',
      key: 'picture',
      render: (pic) => {
        return pic !== null && pic !== '' ? <img src={pic} alt="无" style={{ width: 50 }} /> : '';
      },
    },
    {
      title: '活动状态',
      dataIndex: 'activity_state',
      key: 'activity_state',
      render: (state) => {
        return state === 1 ? <Tag color="success">正在进行中</Tag> : <Tag color="default">已结束</Tag>;
      },
    },
  ];
  // 搜索
  const onSearch = (value) => {
    if (value === '') {
      activityStore.getAllActivityList(true);
    } else {
      // 查询活动
      activityStore.getSearch(value);
    }
  };
  return (
    <>
      <div id="user_top" style={{ justifyContent: 'space-between' }}>
        <HeanderTitle title="活动列表" />
        <div></div>
        <Search
          className="user_search"
          placeholder="活动名称 活动类型 社团名称"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <Table
        id="table-antn-menu"
        columns={columns}
        rowKey="activity_id"
        pagination={{
          position: ['bottomCenter'],
          showQuickJumper: true,
          hideOnSinglePage: true,
          showSizeChanger: true,
          defaultPageSize: 5,
          total: activityStore.activityList.length,
          showTotal: (total) => `总共：${total}个`,
        }}
        dataSource={activityStore.activityList}
      />
    </>
  );
}
export default observer(ActivityList);
