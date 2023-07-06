import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
// 社团申请流程
class ClubProcessStore {
  userApplyClub = [];
  applyClubList = [];
  // 判断是否重新请求用户申请列表
  bool = false;
  constructor() {
    makeAutoObservable(this, { bool: false }, { autoBind: true });
  }
  // 申请社团
  applyClub(value) {
    this.bool = true;
    return http.post('/club/addApplyClub', toHump(value));
  }
  // 返回当前用户申请列表
  async getUserApplyClubList() {
    if (this.userApplyClub.length > 0 && !this.bool) {
      return;
    }
    this.bool = false;
    let list = await http.post('/club/userApplyClubAll');
    runInAction(() => {
      this.userApplyClub = list.data.data;
    });
  }
  // 撤销申请社团
  deleteAppleClub(value) {
    this.userApplyClub = this.userApplyClub.filter((data) => data['apply_id'] !== value['apply_id']);
    return http.post('/club/deleteApplyClub', toHump(value));
  }
  // 发布社团
  updateUserApplyClub(value) {
    this.userApplyClub = this.userApplyClub.map((item) => {
      if (item['apply_id'] === value['apply_id']) {
        return value;
      }
      return item;
    });

    return http.post('/club/releaseClub', toHump(value));
  }
  // 所有社团申请,true强制请求，false不强制
  async getApplyClubList(flag) {
    if (this.applyClubList.length > 0 && !flag) {
      return;
    }
    let list = await http.post('/club/applyClubAll');
    runInAction(() => {
      this.applyClubList = list.data.data;
    });
  }
  // 审核社团
  auditClub(value) {
    this.applyClubList = this.applyClubList.map((item) => {
      if (item['apply_id'] === value['apply_id']) {
        item['apply_state'] = value['apply_state'];
      }
      return item;
    });
    return http.post('/club/auditApplyClub', toHump(value));
  }
  // 申请社团查询
  async getSearch(value) {
    let list = await http.post('/club/searchApplyClub', { keywords: value });
    runInAction(() => {
      this.applyClubList = list.data.data;
    });
  }
}

export default ClubProcessStore;
