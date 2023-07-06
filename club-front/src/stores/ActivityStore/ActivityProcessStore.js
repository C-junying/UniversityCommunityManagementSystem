import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
// 社团申请流程
class ActivityProcessStore {
  clubApplyActivity = [];
  applyActivityList = [];
  // 判断是否重新请求用户申请列表
  bool = false;
  constructor() {
    makeAutoObservable(this, { bool: false }, { autoBind: true });
  }
  // 活动申请
  applyActivity(value) {
    this.bool = true;
    return http.post('/activity/addActivityApply', toHump(value));
  }
  // 返回当前社团活动申请列表
  async getClubApplyActivityList(value) {
    if (this.clubApplyActivity.length > 0 && !this.bool) {
      return;
    }
    this.bool = false;
    let list = await http.post('/activity/clubApplyActivityAll', toHump(value));
    runInAction(() => {
      this.clubApplyActivity = list.data.data;
    });
  }
  // 撤销活动申请
  deleteAppleActivity(value) {
    this.clubApplyActivity = this.clubApplyActivity.filter((data) => data['activity_id'] !== value['activity_id']);
    return http.post('/activity/deleteApplyActivity', toHump(value));
  }
  // 发布活动
  updateClubApplyActivity(value) {
    this.clubApplyActivity = this.clubApplyActivity.map((item) => {
      if (item['apply_id'] === value['apply_id']) {
        return value;
      }
      return item;
    });

    return http.post('/activity/releaseActivity', toHump(value));
  }
  // 所有活动申请,true强制请求，false不强制
  async getApplyActivityList(flag) {
    if (this.applyActivityList.length > 0 && !flag) {
      return;
    }
    let list = await http.post('/activity/applyActivityAll');
    runInAction(() => {
      this.applyActivityList = list.data.data;
    });
  }
  // 审核活动申请
  auditActivity(value) {
    this.applyActivityList = this.applyActivityList.map((item) => {
      if (item['apply_id'] === value['apply_id']) {
        item['apply_state'] = value['apply_state'];
      }
      return item;
    });
    return http.post('/activity/auditApplyActivity', toHump(value));
  }
  // 申请社团查询
  async getSearch(value) {
    let list = await http.post('/activity/searchApplyActivity', { keywords: value });
    runInAction(() => {
      this.applyActivityList = list.data.data;
    });
  }
  reset() {
    this.clubApplyActivity = [];
  }
}

export default ActivityProcessStore;
