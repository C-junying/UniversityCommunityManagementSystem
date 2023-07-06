import { Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useRootStore } from '@/stores/RootStore';

export default function ResetPasswordComponent(props) {
  // store
  const { userStore } = useRootStore();
  // 通知
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const onFinish = (values) => {
    if (values['again-password'] !== values['password']) {
      message.error('两次输入的密码不一样 ');
    } else {
      userStore.resetPassword(values).then((res) => {
        if (res.data.code === 200) {
          messageApi.success(res.data.msg);
          setTimeout(() => {
            navigate('/login');
          }, 1000);
        } else {
          messageApi.error(res.data.msg);
        }
      });
    }
  };
  return (
    <Form layout="vertical" name="form_in_modal" validateTrigger={['onBlur', 'onChange']} onFinish={onFinish}>
      {contextHolder}
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
        name="password"
        label="密码"
        rules={[
          { type: 'string', max: 60, message: '密码最多60个字符', validateTrigger: 'onBlur' },
          { required: true, message: '请输入密码' },
        ]}>
        <Input.Password placeholder="请输入密码" maxLength={61} />
      </Form.Item>
      <Form.Item
        name="again-password"
        label="确认密码"
        rules={[
          { type: 'string', max: 60, message: '密码最多60个字符', validateTrigger: 'onBlur' },
          { required: true, message: '请输入密码' },
        ]}>
        <Input.Password placeholder="请输入密码" maxLength={61} />
      </Form.Item>
      {props.lable}
    </Form>
  );
}
