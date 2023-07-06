import React, { useEffect, useState } from 'react';
import { Button, Modal, Table, Tag, Form, message } from 'antd';
import { MyIcon } from '@/utils/MyIcon';
import AddMenu from '@/components/right-manage/AddMenu';
import MenuTree from '@/components/right-manage/MenuTree';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';

const { confirm } = Modal;

// 菜单列表
function MenuList() {
  // store
  const { menuStore, roleStore } = useRootStore();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    menuStore.getAllMenuList();
  }, []);
  const columns = [
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
      render: (key) => {
        return <b>{key}</b>;
      },
    },
    {
      title: '权限路径',
      dataIndex: 'href',
      key: 'href',
      render: (key) => {
        return <Tag color="orange">{key}</Tag>;
      },
    },
    {
      title: '菜单排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: 'logo',
      dataIndex: 'menu_logo',
      key: 'menu_logo',
      render: (key) => {
        return MyIcon(key);
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
            type="primary"
            shape="circle"
            icon={MyIcon('UnorderedListOutlined')}
            onClick={() => {
              // console.log(item);
              roleStore.showRoleRight(item).then((res) => {
                setParentOpen(true);
                setCurrentRights(res.data.data.map((val) => val['menu_id']));
                setCurrentMenu(item);
              });
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
    menuStore.deleteMenu(item).then((res) => {
      if (res.data.code === 200) {
        messageApi.success(res.data.msg);
      } else {
        messageApi.error(res.data.msg);
      }
    });
  };
  // 添加菜单弹出框
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  const addFormOk = () => {
    form
      .validateFields()
      .then((values) => {
        values['is_show'] = !!values['is_show'] ? 1 : 0;
        menuStore.addMenu(values).then((res) => {
          // console.log(res.data);
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
  // 更新菜单
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateForm] = Form.useForm();

  // 弹出更新菜单
  const handleUpdate = (item) => {
    setUpdateOpen(true);
    updateForm.setFieldsValue(item);
    !!item['is_show'] ? updateForm.setFieldValue('is_show', true) : updateForm.setFieldValue('is_show', false);
  };
  const updateFormOk = () => {
    updateForm
      .validateFields()
      .then((values) => {
        values['is_show'] = !!values['is_show'] ? 1 : 0;
        menuStore.updateMenu(values).then((res) => {
          // console.log(res.data);
          setUpdateOpen(false);
          updateForm.resetFields();
          if (res.data.code === 200) {
            // setDataSource(
            //   dataSource.map((item) => {
            //     if (item['menu_id'] === values['menu_id']) {
            //       return values;
            //     }
            //     return item;
            //   })
            // );

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
  // 更新上级菜单
  const [parentOpen, setParentOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [currentRights, setCurrentRights] = useState([]);
  const [currentMenu, setCurrentMenu] = useState({});

  const parentHandleOk = () => {
    if (currentRights[0] === currentMenu['menu_id']) {
      messageApi.error('不能选择菜单自己');
      return;
    }
    // 加载
    setConfirmLoading(true);
    // 上级菜单
    menuStore.updateMenu({ ...currentMenu, parent_id: currentRights[0] }).then((res) => {
      // console.log(res.data);
      setParentOpen(false);
      setConfirmLoading(false);
      if (res.data.code === 200) {
        messageApi.success(res.data.msg);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        messageApi.error(res.data.msg);
      }
    });
  };
  return (
    <div>
      {contextHolder}
      <Button type="primary" shape="round" onClick={() => setOpen(true)}>
        添加菜单
      </Button>
      <Table
        id="table-antn-menu"
        columns={columns}
        rowKey="menu_id"
        childrenColumnName="menus"
        pagination={{
          position: ['bottomCenter'],
          showQuickJumper: true,
          hideOnSinglePage: true,
          showSizeChanger: true,
          defaultPageSize: 5,
          total: menuStore.menuList.length,
        }}
        dataSource={menuStore.menuList}
      />
      <Modal
        open={open}
        title="添加菜单"
        okText="添加"
        cancelText="取消"
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        onOk={() => addFormOk()}>
        <AddMenu form={form} />
      </Modal>
      <Modal
        open={updateOpen}
        title="更新菜单"
        okText="更新"
        cancelText="取消"
        onCancel={() => {
          setUpdateOpen(false);
          updateForm.resetFields();
        }}
        onOk={() => updateFormOk()}>
        <AddMenu form={updateForm} />
      </Modal>
      <Modal
        title="上级菜单"
        open={parentOpen}
        onOk={parentHandleOk}
        confirmLoading={confirmLoading}
        onCancel={() => {
          console.log('Clicked cancel button');
          setParentOpen(false);
        }}>
        <MenuTree currentRights={currentRights} setCurrentRights={setCurrentRights} selectBoolean={false} />
      </Modal>
    </div>
  );
}
export default observer(MenuList);
