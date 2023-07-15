import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
class UserStore {
  userList = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  // 获取所有用户信息,true强制请求，false不强制
  async getAllUserList(flag) {
    // 如果userList不为空，则不发布请求
    if (this.userList.length > 0 && !flag) {
      return;
    }
    let userList = await http.post('/users/queryAll', undefined, {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      this.userList = userList.data.data;
    });
  }
  // 添加用户
  addUser(value) {
    return http.post('/users/register', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 删除用户
  deleteUser(item) {
    this.userList = this.userList.filter((user) => user['user_id'] !== item['user_id']);
    return http.post('/users/delete', toHump(item), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 更新用户
  updateUser(value) {
    this.userList = this.userList.map((item) => {
      if (item['user_id'] === value['user_id']) {
        return value;
      }
      return item;
    });

    return http.post('/users/update', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 更新密码
  updatePassword(value) {
    return http.post('/users/updatePassword', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 忘记密码
  resetPassword(value) {
    return http.post('/users/resetPassword', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 用户查询
  async getSearch(value) {
    let userList = await http.post(
      '/users/getSearch',
      { keywords: value },
      {
        headers: {
          isLoading: true,
        },
      }
    );
    runInAction(() => {
      this.userList = userList.data.data;
    });
  }
}

export default UserStore;
