import { Card, Form, Input, Tabs } from 'antd';
import { MyIcon } from '@/utils/MyIcon';
import logo from '@/assets/logo.png';
import './login.css';
import LoginComponent from '@/components/login/LoginComponent';
import { useRootStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
// 登录
function Login() {
  // store
  const { styleStore } = useRootStore();
  // 手机与邮箱
  const lablePhone = (
    <Form.Item
      name="phone"
      rules={[
        {
          pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
          message: '手机号码格式不对',
          validateTrigger: 'onBlur',
        },
        { required: true, message: '请输入手机号' },
      ]}>
      <Input prefix={MyIcon('UserOutlined', 'site-form-item-icon')} size="large" placeholder="请输入手机号" />
    </Form.Item>
  );
  const labelEmail = (
    <Form.Item
      name="email"
      rules={[
        {
          pattern:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: '邮箱格式不对',
          validateTrigger: 'onBlur',
        },
        { required: true, message: '请输入邮箱' },
      ]}>
      <Input prefix={MyIcon('UserOutlined', 'site-form-item-icon')} size="large" placeholder="请输入邮箱" />
    </Form.Item>
  );
  const items = [
    { key: '1', label: '手机号', children: <LoginComponent lable={lablePhone} /> },
    { key: '2', label: '邮箱', children: <LoginComponent lable={labelEmail} /> },
  ];

  const onChange = (key) => {
    console.log(key);
  };
  useEffect(() => {
    // 修改宽度
    if (window.innerWidth === document.body.clientWidth) {
      styleStore.setWidth(styleStore.maxWidth);
    } else {
      styleStore.setWidth(styleStore.defaultWidth);
    }
  }, [styleStore.width]);
  return (
    <div className="login" style={{ width: styleStore.width }}>
      <Card className="login-container">
        <img className="login-logo" src={logo} alt="#" />
        <Tabs defaultActiveKey="1" centered items={items} destroyInactiveTabPane onChange={onChange} />
      </Card>
    </div>
  );
}
export default observer(Login);
