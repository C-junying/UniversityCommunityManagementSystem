import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
import { deleteTree } from '@/utils/menuTree';

class MenuStore {
  menuList = [];
  selfMenu = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  // 返回所有菜单
  async getAllMenuList() {
    if (this.menuList.length > 0) {
      return;
    }
    let menuList = await http.post('/menu/roleSelect');
    runInAction(() => {
      this.menuList = menuList.data.data;
    });
  }
  // 添加菜单
  addMenu(value) {
    return http.post('/menu/addMenu', toHump(value));
  }
  // 删除菜单
  deleteMenu(item) {
    this.menuList = deleteTree(this.menuList, item['menu_id']);
    return http.post('/menu/deleteMenu', toHump(item));
  }
  // 更新菜单
  updateMenu(value) {
    this.menuList = this.menuList.map((item) => {
      if (item['menu_id'] === value['menu_id']) {
        return value;
      }
      return item;
    });

    return http.post('/menu/updateMenu', toHump(value));
  }
  // 根据token角色获得菜单
  async tokenMenuList() {
    if (this.selfMenu.length > 0) {
      return;
    }
    let list = await http.post('/menu/menuList').then((res) => res);
    runInAction(() => {
      this.selfMenu = list.data.data;
    });
  }
}

export default MenuStore;
