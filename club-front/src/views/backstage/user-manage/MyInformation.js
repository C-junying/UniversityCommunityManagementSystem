import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, Switch, message } from 'antd';
import { toReverseHump } from '@/utils/toHump';
import { dateFormat } from '@/utils/time';
import UpdatePassword from '@/components/user-manage/UpdatePassword';
import MyUpload from '@/components/other/MyUpload';
import './index.css';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';
// 用户信息
function MyInformation() {
  // store
  const { tokenStore } = useRootStore();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();
  // 控制修改
  const [flag, setFlag] = useState(false);
  // 修改
  const alterFlag = () => {
    setFlag(true);
  };
  const [userId, setUserId] = useState('');
  const [form] = Form.useForm();
  // 修改密码
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [passwordForm] = Form.useForm();

  //   头像相关信息
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    let userInfo = toReverseHump(tokenStore.userInfo);
    if (userInfo) {
      userInfo['regist_time'] = dateFormat(userInfo['regist_time']);
      setUserId(userInfo['user_id']);
      form.setFieldsValue(userInfo);
      setImageUrl(userInfo.picture);
    }
    // console.log(userInfo);
  }, [tokenStore.userInfo]);
  const [loading, setLoading] = useState(false);
  const imageHandleChange = (info) => {
    if (Array.isArray(info)) {
      return info;
    }
    if (info.file.status === 'uploading') {
      setLoading(true);
    }
    if (info.file.status === 'done') {
      setLoading(false);
      setImageUrl(info.file.response.data.img);
      form.setFieldValue('picture', info.file.response.data.img);
    }
    return info && info.fileList;
  };
  const submitForm = () => {
    form.validateFields().then((values) => {
      values['user_id'] = userId;
      values.sex = !!values.sex ? '男' : '女';
      tokenStore.updateUserInfo(values).then((res) => {
        if (res.data.code === 200) {
          messageApi.success(res.data.msg);
        } else {
          messageApi.error(res.data.msg);
        }
        setFlag(false);
      });
    });
  };
  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 10,
        }}
        style={{ marginTop: 40 }}>
        <Form.Item
          name="nickname"
          label="昵称"
          rules={[
            { type: 'string', max: 20, message: '昵称最多20个字符', validateTrigger: 'onBlur' },
            {
              required: flag,
              message: '请输入昵称!',
              validateTrigger: 'onBlur',
            },
          ]}>
          <Input placeholder="请输入昵称" maxLength={21} disabled={!flag} />
        </Form.Item>
        <Form.Item
          name="user_name"
          label="姓名"
          rules={[
            { type: 'string', max: 20, message: '姓名最多20个字符', validateTrigger: 'onBlur' },
            {
              required: flag,
              message: '请输入姓名!',
              validateTrigger: 'onBlur',
            },
          ]}>
          <Input placeholder="请输入姓名" maxLength={21} disabled={!flag} />
        </Form.Item>
        <Form.Item label="性别" valuePropName="checked" name="sex">
          <Switch checkedChildren="男" unCheckedChildren="女" disabled={!flag} />
        </Form.Item>
        <Form.Item
          name="phone"
          label="手机"
          rules={[
            {
              pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
              message: '手机号码格式不对',
              validateTrigger: 'onBlur',
            },
            { required: flag, message: '请输入手机号' },
          ]}>
          <Input placeholder="请输入手机号" disabled={!flag} />
        </Form.Item>
        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: '邮箱格式不对',
              validateTrigger: 'onBlur',
            },
          ]}>
          <Input placeholder="请输入邮箱" disabled={!flag} />
        </Form.Item>
        <Form.Item name="intro" label="介绍">
          <Input.TextArea showCount maxLength={130} autoSize={{ minRows: 5 }} disabled={!flag} />
        </Form.Item>
        <Form.Item name="picture" label="头像" valuePropName="picture">
          <MyUpload
            name="头像"
            imageUrl={imageUrl}
            loading={loading}
            href="images/uploadHead"
            imageHandleChange={imageHandleChange}
          />
        </Form.Item>
        <Form.Item name="regist_time" label="注册时间">
          <Input disabled bordered={false} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 5,
          }}>
          <Button type="primary" style={{ marginRight: 20 }} onClick={alterFlag} hidden={flag}>
            修改
          </Button>
          <Button type="primary" style={{ marginRight: 20 }} hidden={!flag} onClick={submitForm}>
            提交
          </Button>
          <Button
            type="primary"
            hidden={flag}
            onClick={() => {
              setPasswordOpen(true);
              passwordForm.setFieldValue('user_id', userId);
            }}>
            修改密码
          </Button>
        </Form.Item>
      </Form>
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
              tokenStore.updatePassword(values).then((res) => {
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
    </>
  );
}
export default observer(MyInformation);
