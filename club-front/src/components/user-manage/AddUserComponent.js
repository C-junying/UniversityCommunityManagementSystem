import { useState } from 'react';
import { Form, Input, Switch, Select } from 'antd';

import MyUpload from '../other/MyUpload';

export default function AddUserComponent(props) {
  const form = props.form;
  const roleList = props.roleList;
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const { imageUrl, setImageUrl } = props;
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
  return (
    <Form form={form} layout="vertical" name="form_in_modal" validateTrigger={['onBlur', 'onChange']}>
      <Form.Item name="user_id" label="用户编号" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        name="nickname"
        label="昵称"
        rules={[
          { type: 'string', max: 20, message: '昵称最多20个字符', validateTrigger: 'onBlur' },
          {
            required: true,
            message: '请输入昵称!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input placeholder="请输入昵称" maxLength={21} />
      </Form.Item>
      <Form.Item
        name="user_name"
        label="姓名"
        rules={[
          { type: 'string', max: 20, message: '姓名最多20个字符', validateTrigger: 'onBlur' },
          {
            required: true,
            message: '请输入姓名!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input placeholder="请输入姓名" maxLength={21} />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        hidden={!!props.isHiddenPassword ? true : false}
        rules={[
          { type: 'string', max: 60, message: '密码最多60个字符', validateTrigger: 'onBlur' },
          { required: true, message: '请输入密码' },
        ]}>
        <Input.Password placeholder="请输入密码" maxLength={61} />
      </Form.Item>
      <Form.Item label="性别" valuePropName="checked" name="sex">
        <Switch checkedChildren="男" unCheckedChildren="女" />
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
          { required: true, message: '请输入手机号' },
        ]}>
        <Input placeholder="请输入手机号" />
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
        <Input placeholder="请输入邮箱" />
      </Form.Item>
      <Form.Item name="intro" label="介绍">
        <Input.TextArea showCount maxLength={130} />
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
      <Form.Item name="role_id" label="角色">
        <Select
          style={{
            width: 150,
          }}
          fieldNames={{ label: 'role_name', value: 'role_id' }}
          onChange={handleChange}
          options={roleList}
        />
      </Form.Item>
    </Form>
  );
}
