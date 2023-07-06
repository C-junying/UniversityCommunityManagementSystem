import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Tag, message, Form, Input, InputNumber } from 'antd';
import { dateFormat } from '@/utils/time';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

// 社团申请资金
function AuditCostApplyList() {
  // store
  const { costProcessStore } = useRootStore();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    costProcessStore.getAllApplyCostList();
  }, []);
  const columns = [
    {
      title: '社团名称',
      dataIndex: 'club_name',
      key: 'club_name',
      render: (key) => {
        return <b>{key}</b>;
      },
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
      title: '申请资金',
      dataIndex: 'apply_cost',
      key: 'apply_cost',
    },
    {
      title: '申请时间',
      dataIndex: 'apply_time',
      key: 'apply_time',
      render: (time) => {
        return dateFormat(time);
      },
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

  // 审核社团费用申请
  const handleAudit = () => {
    auditForm
      .validateFields()
      .then((values) => {
        values['apply_state'] = applyState;
        costProcessStore.auditClubCostApply(values).then((res) => {
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
  return (
    <div>
      {contextHolder}
      <Table
        id="table-antn-menu"
        columns={columns}
        rowKey="apply_id"
        pagination={{
          position: ['bottomCenter'],
          showQuickJumper: true,
          hideOnSinglePage: true,
          showSizeChanger: true,
          defaultPageSize: 5,
          total: costProcessStore.auditApplyList.length,
          showTotal: (total) => `总共：${total}个`,
        }}
        expandable={{
          expandedRowRender: (apply) => (
            <div style={{ margin: 0 }}>
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
        dataSource={costProcessStore.auditApplyList}
      />
      <Modal
        open={auditOpen}
        title="审核资金"
        okText="确认"
        cancelText="取消"
        onCancel={() => {
          setAuditOpen(false);
          setApplyState(0);
          auditForm.resetFields();
        }}
        onOk={() => handleAudit()}>
        <Form form={auditForm} layout="vertical" name="form_in_modal" validateTrigger={['onBlur', 'onChange']}>
          <Form.Item name="apply_id" label="申请编号" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="club_id" label="社团编号" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="apply_user" label="申请用户编号" hidden>
            <Input />
          </Form.Item>
          <Form.Item name="apply_cost" label="申请金额">
            <InputNumber disabled />
          </Form.Item>
          <Form.Item
            name="bill_name"
            label="账单名"
            hidden={applyState === 2}
            rules={[
              { type: 'string', max: 20, message: '账单名最多20个字符', validateTrigger: 'onBlur' },
              {
                required: applyState !== 2,
                message: '请输入账单名!',
                validateTrigger: 'onBlur',
              },
            ]}>
            <Input placeholder="请输入账单名" maxLength={21} />
          </Form.Item>
          <Form.Item
            name="reply"
            label="回复内容"
            rules={[
              {
                required: true,
                message: '请输入回复内容!',
                validateTrigger: 'onBlur',
              },
            ]}>
            <Input.TextArea showCount maxLength={130} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export default observer(AuditCostApplyList);
