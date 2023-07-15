import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
class TokenStore {
  loginInfo = {};
  constructor() {
    makeObservable(this, {
      loginInfo: observable,
      userInfo: computed,
      checkLogin: computed,
      fetchLogin: action.bound,
    });
  }
  // 用户信息
  get userInfo() {
    return this.loginInfo.userInfo;
  }
  set userInfo(value) {
    this.loginInfo.userInfo = { ...this.loginInfo.userInfo, ...value };
  }
  // 是否登录
  get checkLogin() {
    if (JSON.stringify(this.loginInfo) !== '{}' && this.loginInfo.code === 200) {
      return true;
    } else {
      return false;
    }
  }
  // 更新登录信息
  async updateLoginInfo() {
    let user = await http.post('/users/getUserInfo').then((res) => Promise.resolve(res.data));
    runInAction(() => {
      this.loginInfo = toHump({ code: user.code, userInfo: user.data });
    });
  }
  // 请求登录
  async fetchLogin(values) {
    let login = await http.post('/users/login', toHump(values)).then((res) => res.data);
    runInAction(() => {
      this.loginInfo = login;
    });
  }
  // 更新用户信息
  async updateUserInfo(value) {
    let info = await http.post('/users/updateCurrentUser', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
    if (info.data.code === 200) this.userInfo = toHump(value);
    else this.userInfo = this.userInfo;
    return info;
  }
  // 更新密码
  updatePassword(value) {
    return http.post('/users/updatePassword', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
}
export default TokenStore;
