import { Form, Input, Switch, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRootStore } from '@/stores/RootStore';

export default function RegisterComponent(props) {
  // store
  const { userStore } = useRootStore();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const onFinish = (values) => {
    values.sex = !!values.sex ? '男' : '女';
    // console.log(values)
    userStore.addUser(values).then((res) => {
      // console.log(res.data)
      if (res.data.code === 200) {
        messageApi.success(res.data.msg);
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        messageApi.error(res.data.msg);
      }
    });
  };
  return (
    <Form layout="vertical" name="form_in_modal" validateTrigger={['onBlur', 'onChange']} onFinish={onFinish}>
      {contextHolder}
      <Form.Item name="user_id" label="用户编号" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        name="nickname"
        label="昵称"
        rules={[
          {
            required: true,
            message: '请输入昵称!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input placeholder="请输入昵称" />
      </Form.Item>
      <Form.Item
        name="user_name"
        label="姓名"
        rules={[
          {
            required: true,
            message: '请输入姓名!',
            validateTrigger: 'onBlur',
          },
        ]}>
        <Input placeholder="请输入姓名" />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
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
      {props.lable}
    </Form>
  );
}
