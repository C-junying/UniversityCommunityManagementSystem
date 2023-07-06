import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
class IndexStore {
  // 所有活动
  activityList = [];
  // 所有社团
  clubList = [];
  // 我的社团
  userClubList = [];
  // 我的活动
  userActivityList = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  // 获取所有活动
  async getAllActivity(flag) {
    // 如果activityList不为空，则不发布请求
    if (this.activityList.length > 0 && !flag) {
      return;
    }
    let activityList = await http.post('/activity/getManageActivityAll');
    runInAction(() => {
      this.activityList = activityList.data.data;
    });
  }
  // 获取所有社团
  async getAllClub(flag) {
    // 如果clubList不为空，则不发布请求
    if (this.clubList.length > 0 && !flag) {
      return;
    }
    let clubList = await http.post('/club/getClubsAll');
    runInAction(() => {
      this.clubList = clubList.data.data;
    });
  }
  // 获取我的社团
  async getUserClub(flag) {
    // 如果userClubList不为空，则不发布请求
    if (this.userClubList.length > 0 && !flag) {
      return;
    }
    let list = await http.post('/club/getUserClubs');
    runInAction(() => {
      this.userClubList = list.data.data;
    });
  }
  // 获取我参加的活动
  async getUserActivity(flag) {
    // 如果userActivityList不为空，则不发布请求
    if (this.userActivityList.length > 0 && !flag) {
      return;
    }
    let list = await http.post('/activity/getUserActivityAll');
    runInAction(() => {
      this.userActivityList = list.data.data;
    });
  }
}

export default IndexStore;
