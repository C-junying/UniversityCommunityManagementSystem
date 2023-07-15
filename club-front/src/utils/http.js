import axios from 'axios';
import Loading from './Loading';
import ReactDOM from 'react-dom/client';
// 封装axios
// 实例化 请求拦截器 响应拦截器
const baseURL = 'http://localhost:8080/';
const http = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});
// 当前正在请求的数量
let requestCount = 0;
// 显示loading
function showLoading() {
  if (requestCount === 0) {
    var dom = document.createElement('div');
    dom.setAttribute('id', 'club-loading');
    document.body.appendChild(dom);
    ReactDOM.createRoot(dom).render(<Loading />);
  }
  requestCount++;
}

// 隐藏loading
function hideLoading() {
  requestCount--;
  if (requestCount === 0) {
    setTimeout(() => {
      document.body.removeChild(document.getElementById('club-loading'));
    }, 500);
  }
}

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    // requestCount为0，才创建loading, 避免重复创建
    if (config.headers.isLoading !== false) {
      showLoading();
    }
    return config;
  },
  (error) => {
    // 判断当前请求是否设置了不显示Loading
    if (err.config.headers.isLoading !== false) {
      hideLoading();
    }
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    if (response.config.headers.isLoading !== false) {
      hideLoading();
    }
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  (error) => {
    console.log(error);
    if (error.config.headers.isLoading !== false) {
      hideLoading();
    }
    // 没有权限，重定向到登录
    if (error.response.status === 401) {
      location.replace('/login');
      localStorage.removeItem('token');
      return Promise.reject(error.response.statusText);
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export { http, baseURL };
