import axios from 'axios';

// 封装axios
// 实例化 请求拦截器 响应拦截器
const baseURL = 'http://localhost:8080/';
const http = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});
// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  (response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
  },
  (error) => {
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
