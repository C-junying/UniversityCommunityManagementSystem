import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
class RoleStore {
  roleList = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  //   获取所有角色
  async getAllRoleList() {
    if (this.roleList.length > 0) {
      return;
    }
    let list = await http.post('/role/roleList');
    runInAction(() => {
      this.roleList = list.data.data;
    });
  }
  //   添加角色
  addRole(value) {
    return http.post('/role/addRole', toHump(value));
  }
  //   删除角色
  deleteRole(item) {
    this.roleList = this.roleList.filter((role) => role['role_id'] !== item['role_id']);

    return http.post('/role/deleteRole', toHump(item));
  }
  //   更新角色
  updateRole(value) {
    this.roleList = this.roleList.map((item) => {
      if (item['role_id'] === value['role_id']) {
        return value;
      }
      return item;
    });

    return http.post('/role/updateRole', toHump(value));
  }
  //   显示角色权限
  showRoleRight(value) {
    return http.post('/menu/roleIdMenu', toHump(value));
  }
  //   分配权限
  shareRight(value) {
    return http.post('/role/shareRolePower', toHump(value));
  }
}

export default RoleStore;
