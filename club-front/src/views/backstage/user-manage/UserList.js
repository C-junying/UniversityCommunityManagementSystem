import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Form, Input, message } from 'antd';
import { MyIcon } from '@/utils/MyIcon';
import { dateFormat } from '@/utils/time';
import AddUserComponent from '@/components/user-manage/AddUserComponent';
import UpdatePassword from '@/components/user-manage/UpdatePassword';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

const { confirm } = Modal;
const { Search } = Input;
// 用户列表
function UserList() {
  // store
  const { userStore, roleStore } = useRootStore();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    userStore.getAllUserList();
  }, []);
  const columns = [
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      render: (key) => {
        return <b>{key}</b>;
      },
    },
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
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
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
          <Button
            danger
            shape="circle"
            icon={MyIcon('LockOutlined')}
            onClick={() => {
              setPasswordOpen(true);
              passwordForm.setFieldValue('user_id', item['user_id']);
            }}
          />
        </div>
      ),
    },
  ];
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
  // 删除用户操作
  const deleteMothed = (item) => {
    // 当前页面同步状态+后端同步
    userStore.deleteUser(item).then((res) => {
      if (res.data.code === 200) {
        messageApi.success(res.data.msg);
      } else {
        messageApi.error(res.data.msg);
      }
    });
  };
  // 添加用户弹出框
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    roleStore.getAllRoleList();
  }, []);
  const addFormOk = () => {
    form
      .validateFields()
      .then((values) => {
        values.sex = !!values.sex ? '男' : '女';
        userStore.addUser(values).then((res) => {
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
  // 更新用户弹出框
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateForm] = Form.useForm();
  const [hiddenPassword] = useState(true);

  // 弹出更新用户
  const handleUpdate = (item) => {
    setUpdateOpen(true);
    setImageUrl(item.picture);
    updateForm.setFieldsValue(item);
    // console.log('item', item);
    item.sex === '男' ? updateForm.setFieldValue('sex', true) : updateForm.setFieldValue('sex', false);
  };
  const updateFormOk = () => {
    updateForm
      .validateFields()
      .then((values) => {
        values.sex = !!values.sex ? '男' : '女';
        values['regist_time'] = new Date(values['regist_time']);
        userStore.updateUser(values).then((res) => {
          // console.log(res.data);
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
  // 修改密码
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordForm] = Form.useForm();
  // 搜索
  const onSearch = (value) => {
    if (value === '') {
      userStore.getAllUserList(true);
    } else {
      userStore.getSearch(value);
    }
  };
  return (
    <div>
      {contextHolder}
      <div id="user_top">
        <Button type="primary" shape="round" onClick={() => setOpen(true)}>
          添加用户
        </Button>
        <Search
          className="user_search"
          placeholder="昵称 姓名 电话 邮箱"
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
          total: userStore.userList.length,
          showTotal: (total) => `总共：${total}个`,
        }}
        expandable={{
          expandedRowRender: (user) => (
            <div style={{ margin: 0 }}>
              <p>
                <b style={{ color: 'red' }}>注册时间：</b>
                {dateFormat(user['regist_time'])}
              </p>
              <p>
                <b style={{ color: 'red' }}>角色名称：</b>
                {user['role_name']}
              </p>
              <p>
                <b>个人介绍：</b>
                {user.intro}
              </p>
            </div>
          ),
        }}
        dataSource={userStore.userList}
      />

      <Modal
        open={open}
        title="注册用户"
        okText="添加"
        cancelText="取消"
        onCancel={() => {
          setOpen(false);
          form.resetFields();
          setImageUrl('');
        }}
        onOk={() => addFormOk()}>
        <AddUserComponent
          form={form}
          roleList={roleStore.roleList}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
      </Modal>
      <Modal
        open={updateOpen}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setUpdateOpen(false);
          updateForm.resetFields();
          setImageUrl('');
        }}
        onOk={() => updateFormOk()}>
        <AddUserComponent
          form={updateForm}
          roleList={roleStore.roleList}
          isHiddenPassword={hiddenPassword}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
      </Modal>
      <Modal
        open={passwordOpen}
        title="修改密码"
        okText="确认修改"
        cancelText="取消"
        onCancel={() => {
          setPasswordOpen(false);
          passwordForm.resetFields();
        }}
        onOk={() => {
          passwordForm
            .validateFields()
            .then((values) => {
              userStore.updatePassword(values).then((res) => {
                // console.log(res.data);
                setPasswordOpen(false);
                passwordForm.resetFields();
                messageApi.success(res.data.msg);
              });
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}>
        <UpdatePassword form={passwordForm} />
      </Modal>
    </div>
  );
}
export default observer(UserList);
