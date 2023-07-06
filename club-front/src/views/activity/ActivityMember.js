import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form, Input, message } from 'antd';
import { MyIcon } from '@/utils/MyIcon';
import { useParams } from 'react-router-dom';
import ActivityMemberConponent from '@/components/activity/ActivityMemberConponent';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

const { confirm } = Modal;
const { Search } = Input;

// 活动成员
function ActivityMember() {
  // store
  const { activityMemberStore, activityStore } = useRootStore();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();
  // 当前用户
  const [myUser, setMyUser] = useState({});
  // 活动信息
  const [activityInfo, setActivityInfo] = useState({});
  //   获取链接数据
  const params = useParams();
  // 当前用户信息
  useEffect(() => {
    setMyUser(activityStore.userPosition);
  }, [activityStore.userPosition]);
  // 获取当前活动信息
  useEffect(() => {
    setActivityInfo(activityStore.currentActivity);
  }, [activityStore.currentActivity]);
  // 获取活动成员
  useEffect(() => {
    activityMemberStore.getAllMemberList(params);
  }, [params]);
  const columns = [
    {
      title: '姓名',
      dataIndex: 'user_name',
      key: 'user_name',
      render: (key) => {
        return <b>{key}</b>;
      },
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '职位',
      dataIndex: 'bear_name',
      key: 'bear_name',
    },
    {
      title: '头像',
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
        <div>
          <Button
            danger
            shape="circle"
            icon={MyIcon('DeleteOutlined')}
            onClick={() => confirmMethod(item)}
            hidden={
              (myUser['bear_name'] === '活动负责人' ? false : true) ||
              item['bear_name'] === '指导老师' ||
              item['bear_name'] === '活动负责人' ||
              activityInfo['activity_state'] === 2
            }
          />
          <Button
            type="primary"
            shape="circle"
            icon={MyIcon('UnorderedListOutlined')}
            onClick={() => {
              setMemberBearOpen(true);
              memberBearForm.setFieldsValue(item);
            }}
            hidden={
              (myUser['bear_name'] === '活动负责人' ? false : true) ||
              item['bear_name'] === '指导老师' ||
              item['bear_name'] === '活动负责人' ||
              activityInfo['activity_state'] === 2
            }
          />
        </div>
      ),
    },
  ];
  const confirmMethod = (item) => {
    confirm({
      title: '你确认删除吗?',
      icon: MyIcon('ExclamationCircleFilled'),
      // content: 'Some descriptions',
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
  // 删除用户操作
  const deleteMothed = (item) => {
    // 当前页面同步状态+后端同步
    activityMemberStore.deleteMember(item).then((res) => {
      if (res.data.code === 200) {
        messageApi.success(res.data.msg);
      } else {
        messageApi.error(res.data.msg);
      }
    });
  };
  // 添加活动成员
  const [memberOpen, setMemberOpen] = useState(false);
  const [memberForm] = Form.useForm();
  // 添加操作
  const addMemberFormOk = () => {
    memberForm
      .validateFields()
      .then((values) => {
        values.activityId = params.activityId;
        activityMemberStore.captainAddActivityMember(values).then((res) => {
          setMemberOpen(false);
          memberForm.resetFields();
          if (res.data.code === 200) {
            messageApi.success(res.data.msg);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            messageApi.error(res.data.msg);
          }
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  // 分配职位
  const [memberBear, setMemberBearOpen] = useState(false);
  const [memberBearForm] = Form.useForm();

  const memberBearFormOk = () => {
    memberBearForm
      .validateFields()
      .then((values) => {
        activityMemberStore.updateMemberBear(values).then((res) => {
          setMemberBearOpen(false);
          memberBearForm.resetFields();
          if (res.data.code === 200) {
            messageApi.success(res.data.msg);
          } else {
            messageApi.error(res.data.msg);
          }
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  // 搜索
  const onSearch = (value) => {
    if (value === '') {
      activityMemberStore.getAllMemberList(params);
    } else {
      activityMemberStore.getSearch({ ...params, keywords: value });
    }
  };
  return (
    <>
      {contextHolder}
      <div id="user_top" style={{ justifyContent: 'space-between' }}>
        <div>
          <Button
            type="primary"
            shape="round"
            onClick={() => setMemberOpen(true)}
            hidden={(myUser['bear_name'] === '活动负责人' ? false : true) || activityInfo['activity_state'] === 2}>
            添加成员
          </Button>
        </div>
        <Search
          className="user_search"
          placeholder="姓名 电话"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <Table
        id="table-antn-menu"
        columns={columns}
        rowKey="user_id"
        pagination={{
          position: ['bottomCenter'],
          showQuickJumper: true,
          hideOnSinglePage: true,
          showSizeChanger: true,
          defaultPageSize: 5,
          total: activityMemberStore.memberList.length,
          showTotal: (total) => `总共：${total}个`,
        }}
        dataSource={activityMemberStore.memberList}
      />
      <Modal
        open={memberOpen}
        title="添加活动成员"
        okText="添加"
        cancelText="取消"
        onCancel={() => {
          setMemberOpen(false);
          memberForm.resetFields();
        }}
        onOk={() => addMemberFormOk()}>
        <ActivityMemberConponent form={memberForm} />
      </Modal>
      <Modal
        open={memberBear}
        title="分配职位"
        okText="分配"
        cancelText="取消"
        onCancel={() => {
          setMemberBearOpen(false);
          memberBearForm.resetFields();
        }}
        onOk={() => memberBearFormOk()}>
        <ActivityMemberConponent form={memberBearForm} isDisabled={true} />
      </Modal>
    </>
  );
}
export default observer(ActivityMember);
