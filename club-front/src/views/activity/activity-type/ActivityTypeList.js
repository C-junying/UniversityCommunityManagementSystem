import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form, Input, message } from 'antd';
import { MyIcon } from '@/utils/MyIcon';
import ActivityTypeComponent from '@/components/activity/ActivityTypeComponent';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

const { confirm } = Modal;
const { Search } = Input;

// 活动类型列表
function ActivityTypeList() {
  // store
  const { activityTypeStore } = useRootStore();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();

  //   图片地址
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    activityTypeStore.getAllTypeList();
  }, []);
  const columns = [
    {
      title: '活动类型名称',
      dataIndex: 'type_name',
      key: 'type_name',
      render: (key) => {
        return <b>{key}</b>;
      },
    },

    {
      title: '类型介绍',
      dataIndex: 'type_content',
      key: 'type_content',
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
    // console.log(item);
    // 当前页面同步状态+后端同步
    activityTypeStore.deleteType(item).then((res) => {
      if (res.data.code === 200) {
        messageApi.success(res.data.msg);
      } else {
        messageApi.error(res.data.msg);
      }
    });
  };
  // 添加活动类型弹出框
  const [addOpen, setAddOpen] = useState(false);
  const [addForm] = Form.useForm();

  const addFormOk = () => {
    addForm
      .validateFields()
      .then((values) => {
        activityTypeStore.addType(values).then((res) => {
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

  // 更新活动类型弹出框
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateForm] = Form.useForm();

  // 弹出更新活动类型
  const handleUpdate = (item) => {
    // console.log(item);
    setUpdateOpen(true);
    setImageUrl(item.picture);
    updateForm.setFieldsValue(item);
  };
  const updateFormOk = () => {
    updateForm
      .validateFields()
      .then((values) => {
        activityTypeStore.updateType(values).then((res) => {
          // console.log(res.data)
          setUpdateOpen(false);
          updateForm.resetFields();
          let type = 'error';
          if (res.data.code === 200) {
            type = 'success';
          }
          messageApi.open({
            type,
            content: res.data.msg,
          });
        });
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };
  // 模糊查询
  const onSearch = (value) => {
    if (value === '') {
      activityTypeStore.getAllTypeList(true);
    } else {
      activityTypeStore.getSearch(value);
    }
  };
  return (
    <div>
      {contextHolder}
      <div id="user_top">
        <Button type="primary" shape="round" onClick={() => setAddOpen(true)}>
          添加活动类型
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
        rowKey="type_id"
        pagination={{
          position: ['bottomCenter'],
          showQuickJumper: true,
          hideOnSinglePage: true,
          showSizeChanger: true,
          defaultPageSize: 5,
          total: activityTypeStore.typeList.length,
          showTotal: (total) => `总共：${total}个`,
        }}
        dataSource={activityTypeStore.typeList}
      />
      <Modal
        open={addOpen}
        title="添加活动类型"
        okText="添加"
        cancelText="取消"
        onCancel={() => {
          setAddOpen(false);
          addForm.resetFields();
          setImageUrl('');
        }}
        onOk={() => addFormOk()}>
        <ActivityTypeComponent form={addForm} imageUrl={imageUrl} setImageUrl={setImageUrl} />
      </Modal>
      <Modal
        open={updateOpen}
        title="更新活动类型"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setUpdateOpen(false);
          updateForm.resetFields();
          setImageUrl('');
        }}
        onOk={() => updateFormOk()}>
        <ActivityTypeComponent form={updateForm} imageUrl={imageUrl} setImageUrl={setImageUrl} />
      </Modal>
    </div>
  );
}
export default observer(ActivityTypeList);
