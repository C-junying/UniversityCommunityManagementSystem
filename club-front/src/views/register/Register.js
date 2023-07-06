import { Card, Form, Button } from 'antd'
import logo from '@/assets/logo.png'
import RegisterComponent from '@/components/register/RegisterComponent'
import './register.css'

const btnRegister = (
  <Form.Item>
    <Button type="primary" htmlType="submit" size="large" block className="login-form-button">
      注册
    </Button>
    或 <a href="/login">登录!</a>
  </Form.Item>
)
// 注册
export default function Register() {
  return (
    <div className="register">
      <Card className="register-container">
        <img className="register-logo" src={logo} alt="#" />
        <RegisterComponent lable={btnRegister} />
      </Card>
    </div>
  )
}
