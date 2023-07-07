import { dateWeek } from '@/utils/time';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import './index.css';
import { useEffect, useState } from 'react';
import { useRootStore } from '@/stores/RootStore';
// 主页
function Index() {
  // store
  const { styleStore } = useRootStore();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [time, setTime] = useState(dateWeek());
  useEffect(() => {
    const t = setInterval(() => {
      setTime(dateWeek());
    }, 1000);
    return () => {
      clearInterval(t);
    };
  }, []);
  useEffect(() => {
    // 修改宽度
    if (window.innerWidth === document.documentElement.clientWidth) {
      styleStore.setWidth(styleStore.maxWidth);
    } else {
      styleStore.setWidth(styleStore.defaultWidth);
    }
  }, [document.documentElement.clientWidth, styleStore.width]);
  return (
    <div>
      <header id="index-header">
        <div id="index-container" className="clearfix">
          <p>{time}</p>
        </div>
      </header>
      <nav id="index-nav">
        <div id="index-container">
          <ul id="index-nav-ul" className="clearfix">
            <li>
              <NavLink to="system-intro" replace>
                系统信息
              </NavLink>
            </li>
            <li>
              <NavLink to="hot-activity" replace>
                热门活动
              </NavLink>
            </li>
            <li>
              <NavLink to="hot-club" replace>
                热门社团
              </NavLink>
            </li>
            <li>
              <NavLink to="my-club" replace>
                我的社团
              </NavLink>
            </li>
            <li>
              <NavLink to="my-activity" replace>
                我的活动
              </NavLink>
            </li>
          </ul>
          <div id="my-center">
            {!!token ? (
              <div>
                <span onClick={() => navigate('/backstage')}>个人中心</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span
                  onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                  }}>
                  退出
                </span>
              </div>
            ) : (
              <div>
                <NavLink to="/login" replace>
                  登录
                </NavLink>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <NavLink to="/register">注册</NavLink>
              </div>
            )}
          </div>
        </div>
      </nav>
      <div id="index-content" style={{ minHeight: document.body.clientHeight - 135 + 'px' }}>
        <div
          id="index-container"
          style={{ minHeight: document.body.clientHeight - 135 + 'px', backgroundColor: '#fff' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default Index;
