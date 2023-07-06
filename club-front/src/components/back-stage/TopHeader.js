import { Layout, Dropdown, Avatar } from 'antd';
import { useNavigate, NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from '@/stores/RootStore';
import { MyIcon } from '@/utils/MyIcon';
import './index.css';

const { Header } = Layout;
function TopHeader() {
  // store 登录信息
  const { tokenStore } = useRootStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!tokenStore.checkLogin) {
      tokenStore.updateLoginInfo();
    }
  }, []);
  const items = [
    {
      key: '1',
      label: tokenStore.userInfo && tokenStore.userInfo['roleName'],
    },
    {
      key: '2',
      label: '退出',
    },
  ];
  return (
    <Header
      style={{
        padding: '0 20',
        background: 'white',
      }}>
      {tokenStore.userInfo && (
        <div>
          <div style={{ float: 'left', fontSize: '20px' }}>
            <NavLink to="/" replace id="home-nav">
              首页
            </NavLink>
          </div>
          <div style={{ float: 'right' }}>
            <span>
              欢迎<span style={{ color: 'orange' }}>{tokenStore.userInfo['userName']}</span>回来
            </span>
            <Dropdown
              menu={{
                items,
                onClick: ({ key }) => {
                  if (key === '2') {
                    localStorage.removeItem('token');
                    navigate('/login');
                  }
                },
              }}
              placement="bottom">
              <Avatar
                size="large"
                src={
                  tokenStore.userInfo.picture !== null &&
                  tokenStore.userInfo.picture !== undefined &&
                  tokenStore.userInfo.picture !== '' ? (
                    <img src={tokenStore.userInfo.picture} alt="avatar" />
                  ) : (
                    ''
                  )
                }
                icon={MyIcon('UserOutlined')}
              />
            </Dropdown>
          </div>
        </div>
      )}
    </Header>
  );
}
export default observer(TopHeader);
