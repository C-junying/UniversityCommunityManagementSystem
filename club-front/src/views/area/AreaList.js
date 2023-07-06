import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form, Input, Tag, message } from 'antd';
import { MyIcon } from '@/utils/MyIcon';
import { dateFormat } from '@/utils/time';
import AreaUpdate from '@/components/area/AreaUpdate';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

const { confirm } = Modal;
const { Search } = Input;

// 场地列表
function AreaList() {
  // store
  const { areaStore } = useRootStore();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    areaStore.getAllAreaList();
  }, []);
  const columns = [
    {
      title: '场地名称',
      dataIndex: 'area_name',
      key: 'area_name',
      render: (key) => {
        return <b>{key}</b>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (item) => {
        if (item === 0) {
          return <Tag color="error">禁用</Tag>;
        } else if (item === 1) {
          return <Tag color="processing">未使用</Tag>;
        } else {
          return <Tag color="success">使用中</Tag>;
        }
      },
    },
    {
      title: '注册时间',
      dataIndex: 'regist_time',
      key: 'regist_time',
      render: (item) => {
        return dateFormat(item);
      },
    },
    {
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      dataIndex: '',
      key: 'x',
      render: (item) => (
        <div>
          <Button danger shape="circle" icon={MyIcon('DeleteOutlined')} onClick={() => confirmMethod(item)} />
          <Button type="primary" shape="circle" icon={MyIcon('EditOutlined')} onClick={() => handleUpdate(item)} />
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
  // 删除操作
  const deleteMothed = (item) => {
    console.log(item);
    // 当前页面同步状态+后端同步
    areaStore.deleteArea(item).then((res) => {
      if (res.data.code === 200) {
        messageApi.success(res.data.msg);
      } else {
        messageApi.error(res.data.msg);
      }
    });
  };
  // 添加场地弹出框
  const [addOpen, setAddOpen] = useState(false);
  const [addForm] = Form.useForm();

  const addFormOk = () => {
    addForm
      .validateFields()
      .then((values) => {
        areaStore.addArea(values).then((res) => {
          setAddOpen(false);
          addForm.resetFields();
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

  // 更新场地弹出框
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateForm] = Form.useForm();

  // 弹出更新场地
  const handleUpdate = (item) => {
    setUpdateOpen(true);
    updateForm.setFieldsValue(item);
    updateForm.setFieldValue('regist_time', dateFormat(item['regist_time']));
  };
  const updateFormOk = () => {
    updateForm
      .validateFields()
      .then((values) => {
        areaStore.updateArea(values).then((res) => {
          // console.log(res.data)
          setUpdateOpen(false);
          updateForm.resetFields();
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
  // 模糊查询
  const onSearch = (value) => {
    if (value === '') {
      areaStore.getAllAreaList(true);
    } else {
      areaStore.getSearch(value);
    }
  };
  return (
    <div>
      {contextHolder}
      <div id="user_top">
        <Button type="primary" shape="round" onClick={() => setAddOpen(true)}>
          添加场地
        </Button>
        <Search
          className="user_search"
          placeholder="名称 备注"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <Table
        id="table-antn-menu"
        columns={columns}
        rowKey="area_id"
        pagination={{
          position: ['bottomCenter'],
          showQuickJumper: true,
          hideOnSinglePage: true,
          showSizeChanger: true,
          defaultPageSize: 5,
          total: areaStore.areaList.length,
          showTotal: (total) => `总共：${total}个`,
        }}
        dataSource={areaStore.areaList}
      />
      <Modal
        open={addOpen}
        title="添加场地"
        okText="添加"
        cancelText="取消"
        onCancel={() => {
          setAddOpen(false);
          addForm.resetFields();
        }}
        onOk={() => addFormOk()}>
        <AreaUpdate form={addForm} flag={true} />
      </Modal>
      <Modal
        open={updateOpen}
        title="更新场地"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setUpdateOpen(false);
          updateForm.resetFields();
        }}
        onOk={() => updateFormOk()}>
        <AreaUpdate form={updateForm} flag={false} />
      </Modal>
    </div>
  );
}
export default observer(AreaList);
