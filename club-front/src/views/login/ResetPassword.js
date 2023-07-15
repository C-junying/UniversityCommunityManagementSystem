import { Card, Form, Button } from 'antd';
import logo from '@/assets/logo.png';
import './login.css';
import ResetPasswordComponent from '@/components/login/ResetPasswordComponent';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';
const btnReset = (
  <Form.Item>
    <Button type="primary" htmlType="submit" size="large" block className="login-form-button">
      更新密码
    </Button>
    或 <a href="/login">登录!</a>
  </Form.Item>
);
// 注册
function ResetPassword() {
  // store
  const { styleStore } = useRootStore();
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
        <ResetPasswordComponent lable={btnReset} />
      </Card>
    </div>
  );
}
export default observer(ResetPassword);
