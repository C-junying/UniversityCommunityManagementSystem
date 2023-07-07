import { Card, Form, Button } from 'antd';
import logo from '@/assets/logo.png';
import RegisterComponent from '@/components/register/RegisterComponent';
import './register.css';
import { useRootStore } from '@/stores/RootStore';
import { observer } from 'mobx-react-lite';

const btnRegister = (
  <Form.Item>
    <Button type="primary" htmlType="submit" size="large" block className="login-form-button">
      注册
    </Button>
    或 <a href="/login">登录!</a>
  </Form.Item>
);
// 注册
function Register() {
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
    <div className="register" style={{ width: styleStore.width }}>
      <Card className="register-container">
        <img className="register-logo" src={logo} alt="#" />
        <RegisterComponent lable={btnRegister} />
      </Card>
    </div>
  );
}
export default observer(Register);
