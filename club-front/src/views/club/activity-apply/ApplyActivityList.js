import React, { useEffect } from 'react';
import { Button, Modal, Table, Tag, message } from 'antd';
import { MyIcon } from '@/utils/MyIcon';
import { dateFormat } from '@/utils/time';
import { NavLink, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

const { confirm } = Modal;
// 申请活动的列表
function ApplyActivityList() {
  // store
  const { activityProcessStore } = useRootStore();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();
  // 获取链接数据
  const params = useParams();
  useEffect(() => {
    activityProcessStore.getClubApplyActivityList(params);
  }, [params]);
  const columns = [
    {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
      render: (key, item) => {
        return (
          <NavLink to={`preview/${item['activity_id']}`}>
            <b>{key}</b>
          </NavLink>
        );
      },
    },
    {
      title: '社团名称',
      dataIndex: 'club_name',
      key: 'club_name',
    },
    {
      title: '申请者',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (key) => {
        return <b>{key}</b>;
      },
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '申请状态',
      dataIndex: 'apply_state',
      key: 'apply_state',
      render: (state) => {
        if (state === 0) {
          return <Tag color="processing">审核中</Tag>;
        } else if (state === 1) {
          return <Tag color="success">已通过</Tag>;
        } else {
          return <Tag color="error">未通过</Tag>;
        }
      },
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (item) => (
        <div>
          {item['apply_state'] === 0 && (
            <Button danger shape="round" onClick={() => confirmMethod(item)}>
              撤销
            </Button>
          )}
          {item['apply_state'] === 1 && item['activity_state'] === 0 && (
            <Button danger shape="round" onClick={() => publishClub(item)}>
              发布
            </Button>
          )}
        </div>
      ),
    },
  ];
  // 撤销活动的确认框
  const confirmMethod = (item) => {
    confirm({
      title: '你确认撤销吗?',
      icon: MyIcon('ExclamationCircleFilled'),
      okText: '撤销',
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
  // 撤销申请活动操作
  const deleteMothed = (item) => {
    // 当前页面同步状态+后端同步
    activityProcessStore.deleteAppleActivity(item).then((res) => {
      if (res.data.code === 200) {
        messageApi.success(res.data.msg);
      } else {
        messageApi.error(res.data.msg);
      }
    });
  };
  // 发布活动
  const publishClub = (item) => {
    confirm({
      title: '你确认发布吗?',
      icon: MyIcon('ExclamationCircleFilled'),
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        item['activity_state'] = 1;
        activityProcessStore.updateClubApplyActivity(item).then((res) => {
          if (res.data.code === 200) {
            messageApi.success(res.data.msg);
          } else {
            messageApi.error(res.data.msg);
          }
        });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  return (
    <div>
      {contextHolder}
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
          total: activityProcessStore.clubApplyActivity.length,
          showTotal: (total) => `总共：${total}个`,
        }}
        expandable={{
          expandedRowRender: (apply) => (
            <div style={{ margin: 0 }}>
              <p>
                <b style={{ color: 'red' }}>申请时间：</b>
                {!!apply['apply_time'] && dateFormat(apply['apply_time'])}
              </p>
              <p>
                <b style={{ color: 'red' }}>申请理由：</b>
                {apply['apply_content']}
              </p>
              <p>
                <b style={{ color: 'red' }}>回复时间：</b>
                {!!apply['reply_time'] && dateFormat(apply['reply_time'])}
              </p>
              <p>
                <b style={{ color: 'red' }}>回复内容：</b>
                {apply.reply}
              </p>
            </div>
          ),
        }}
        dataSource={activityProcessStore.clubApplyActivity}
      />
    </div>
  );
}
export default observer(ApplyActivityList);
