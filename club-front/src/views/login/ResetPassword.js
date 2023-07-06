import { Card, Form, Button } from 'antd';
import logo from '@/assets/logo.png';
import './login.css';
import ResetPasswordComponent from '@/components/login/ResetPasswordComponent';

const btnReset = (
  <Form.Item>
    <Button type="primary" htmlType="submit" size="large" block className="login-form-button">
      更新密码
    </Button>
    或 <a href="/login">登录!</a>
  </Form.Item>
);
// 注册
export default function ResetPassword() {
  return (
    <div className="register">
      <Card className="register-container">
        <img className="register-logo" src={logo} alt="#" />
        <ResetPasswordComponent lable={btnReset} />
      </Card>
    </div>
  );
}
