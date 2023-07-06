import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form, Tag, message, Input } from 'antd';
import { dateFormat } from '@/utils/time';
import { NavLink } from 'react-router-dom';
import AuditApplyComponent from '@/components/activity/AuditApplyComponent';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

// 审核活动的操作
function AuditActivityApplyList() {
  // store
  const { activityProcessStore } = useRootStore();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    activityProcessStore.getApplyActivityList();
  }, []);
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
            <>
              <Button type="primary" onClick={() => handleState(item, 1)}>
                通过
              </Button>
              <Button danger onClick={() => handleState(item, 2)}>
                驳回
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];
  // 处理状态
  const handleState = (item, state) => {
    setApplyState(state);
    setAuditOpen(true);
    auditForm.setFieldsValue(item);
  };
  // 审核状态
  const [applyState, setApplyState] = useState(0);
  const [auditForm] = Form.useForm();
  // 回复内容弹出框
  const [auditOpen, setAuditOpen] = useState(false);

  // 审核社团
  const handleAudit = () => {
    auditForm
      .validateFields()
      .then((values) => {
        values['apply_state'] = applyState;
        activityProcessStore.auditActivity(values).then((res) => {
          setApplyState(0);
          setAuditOpen(false);
          auditForm.resetFields();
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
      activityProcessStore.getApplyActivityList(true);
    } else {
      activityProcessStore.getSearch(value);
    }
  };
  return (
    <div>
      {contextHolder}
      <div id="user_top">
        <div></div>
        <Input.Search
          className="user_search"
          placeholder="活动名称 申请者 电话"
          allowClear
          enterButton="查询"
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
          total: activityProcessStore.applyActivityList.length,
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
        dataSource={activityProcessStore.applyActivityList}
      />
      <Modal
        open={auditOpen}
        title="审核活动申请"
        okText="确认"
        cancelText="取消"
        onCancel={() => {
          setAuditOpen(false);
          setApplyState(0);
          auditForm.resetFields();
        }}
        onOk={() => handleAudit()}>
        <AuditApplyComponent form={auditForm} />
      </Modal>
    </div>
  );
}
export default observer(AuditActivityApplyList);
