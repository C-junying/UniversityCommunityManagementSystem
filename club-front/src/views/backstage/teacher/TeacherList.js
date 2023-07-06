import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form, Input, message } from 'antd';
import { MyIcon } from '@/utils/MyIcon';
import TeacherComponent from '@/components/user-manage/TeacherComponent';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

const { confirm } = Modal;
const { Search } = Input;

// 老师列表
function TeacherList() {
  // store
  const { teacherStore } = useRootStore();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    teacherStore.getAllTeacherList();
  }, []);
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
      title: '学院',
      dataIndex: 'college',
      key: 'college',
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
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
  // 删除老师操作
  const deleteMothed = (item) => {
    // 当前页面同步状态+后端同步
    teacherStore.deleteTeacher(item).then((res) => {
      if (res.data.code === 200) {
        messageApi.success(res.data.msg);
      } else {
        messageApi.error(res.data.msg);
      }
    });
  };
  // 添加老师弹出框
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const addFormOk = () => {
    form
      .validateFields()
      .then((values) => {
        values.sex = !!values.sex ? '男' : '女';
        teacherStore.addTeacher(values).then((res) => {
          // console.log(res.data)
          setOpen(false);
          form.resetFields();
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

  // 更新老师弹出框
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateForm] = Form.useForm();

  // 弹出更新老师
  const handleUpdate = (item) => {
    setUpdateOpen(true);
    updateForm.setFieldsValue(item);
    item.sex === '男' ? updateForm.setFieldValue('sex', true) : updateForm.setFieldValue('sex', false);
  };
  const updateFormOk = () => {
    updateForm
      .validateFields()
      .then((values) => {
        values.sex = !!values.sex ? '男' : '女';
        teacherStore.updateTeacher(values).then((res) => {
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
  // 搜索
  const onSearch = (value) => {
    if (value === '') {
      teacherStore.getAllTeacherList(true);
    } else {
      teacherStore.getSearch(value);
    }
  };
  return (
    <div>
      {contextHolder}
      <div id="user_top">
        <Button type="primary" shape="round" onClick={() => setOpen(true)}>
          添加老师
        </Button>
        <Search
          className="user_search"
          placeholder="姓名 电话 学院 职位"
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
          total: teacherStore.teacherList.length,
          showTotal: (total) => `总共：${total}个`,
        }}
        dataSource={teacherStore.teacherList}
      />

      <Modal
        open={open}
        title="添加老师"
        okText="添加"
        cancelText="取消"
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        onOk={() => addFormOk()}>
        <TeacherComponent form={form} />
      </Modal>
      <Modal
        open={updateOpen}
        title="更新老师"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setUpdateOpen(false);
          updateForm.resetFields();
        }}
        onOk={() => updateFormOk()}>
        <TeacherComponent form={updateForm} isHidden={true} />
      </Modal>
    </div>
  );
}
export default observer(TeacherList);
