import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, message } from 'antd';
import { dateFormat } from '@/utils/time';
import { MyIcon } from '@/utils/MyIcon';
import { NavLink, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

const { confirm } = Modal;
// 学期报告
function ClubReport() {
  // store
  const { clubReportStore, clubStore } = useRootStore();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();
  // 获取链接数据
  const params = useParams();
  // user
  const [myUser, setMyUser] = useState({});
  // 社团信息
  const [clubInfo, setClubInfo] = useState({});
  // 当前用户职位
  useEffect(() => {
    setMyUser(clubStore.userPosition);
  }, [clubStore.userPosition]);
  // 更新社团数据
  useEffect(() => {
    setClubInfo(clubStore.currentClub);
  }, [clubStore.currentClub]);
  // 获取社团报告
  useEffect(() => {
    clubReportStore.getAllClubReportList(params);
  }, [params]);

  const columns = [
    {
      title: '总结主题',
      dataIndex: 'report_title',
      key: 'report_title',
      render: (key, item) => {
        return (
          <NavLink to={`preview/${item['report_id']}`}>
            <b>{key}</b>
          </NavLink>
        );
      },
    },
    {
      title: '发起者',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (key) => {
        return <b>{key}</b>;
      },
    },
    {
      title: '阶段名称',
      dataIndex: 'stage_name',
      key: 'stage_name',
    },
    {
      title: '上传时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (key) => {
        return dateFormat(key);
      },
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
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (item) => (
        <Button
          danger
          shape="circle"
          icon={MyIcon('DeleteOutlined')}
          onClick={() => confirmMethod(item)}
          hidden={
            ((myUser['bear_name'] === '社长' ? false : true) &&
              (myUser['bear_name'] === '副社长' ? false : true)) ||
            clubInfo.state === 2
          }
        />
      ),
    },
  ];
  // 删除报告的确认框
  const confirmMethod = (item) => {
    confirm({
      title: '你确认删除吗?',
      icon: MyIcon('ExclamationCircleFilled'),
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        deleteMothed(item);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  // 删除报告操作
  const deleteMothed = (item) => {
    // 当前页面同步状态+后端同步
    clubReportStore.deleteClubReport(item).then((res) => {
      if (res.data.code === 200) {
        messageApi.success(res.data.msg);
      } else {
        messageApi.error(res.data.msg);
      }
    });
  };
  return (
    <div>
      {contextHolder}

      <Button
        type="primary"
        shape="round"
        style={{ marginBottom: 5 }}
        hidden={
          ((myUser['bear_name'] === '社长' ? false : true) && (myUser['bear_name'] === '副社长' ? false : true)) ||
          clubInfo.state === 2
        }>
        <NavLink to={`${myUser['user_id']}`}>添加报告</NavLink>
      </Button>
      <Table
        id="table-antn-menu"
        columns={columns}
        rowKey="report_id"
        pagination={{
          position: ['bottomCenter'],
          showQuickJumper: true,
          hideOnSinglePage: true,
          showSizeChanger: true,
          defaultPageSize: 5,
          total: clubReportStore.clubReportList.length,
          showTotal: (total) => `总共：${total}个`,
        }}
        dataSource={clubReportStore.clubReportList}
      />
    </div>
  );
}
export default observer(ClubReport);
