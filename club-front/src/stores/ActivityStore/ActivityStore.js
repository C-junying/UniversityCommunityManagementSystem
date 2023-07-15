import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
class ActivityStore {
  // 所有活动
  activityList = [];
  // 社团活动
  clubActivityList = [];
  // 用户的活动
  userActivityList = [];
  // 用户在活动中的职位
  userPosition = {};
  // 当前活动
  currentActivity = {};
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  // 获取所有活动信息,true强制请求，false不强制
  async getAllActivityList(flag) {
    // 如果activityList不为空，则不发布请求
    if (this.activityList.length > 0 && !flag) {
      return;
    }
    let activityList = await http.post('/activity/getManageActivityAll', undefined, {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      this.activityList = activityList.data.data;
    });
  }
  // 用户的活动
  async getAllUserActivity(flag) {
    // 如果userActivityList不为空，则不发布请求
    if (this.userActivityList.length > 0 && !flag) {
      return;
    }
    let list = await http.post('/activity/getUserActivityAll', undefined, {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      this.userActivityList = list.data.data;
    });
  }
  // 获取社团活动信息
  async getClubActivityList(value) {
    // 如果clubActivityList不为空，则不发布请求
    if (this.clubActivityList.length > 0) {
      return;
    }
    let list = await http.post('/activity/getClubActivityAll', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      this.clubActivityList = list.data.data;
    });
  }
  /**
   * @description: 返回用户在活动的职位
   * @param {*} value {activityId}
   */
  async getUserBearPosition(value) {
    if (JSON.stringify(this.userPosition) !== '{}') {
      return;
    }
    const bear = await http.post('/activity/activityIdUserIdToBearName', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      if (bear.data.data.member.length > 0) {
        this.userPosition = bear.data.data.member[0];
      } else if (bear.data.data.taecher.length > 0) {
        this.userPosition = bear.data.data.taecher[0];
      }
    });
  }
  // 当前社团的相关信息
  async currentActivityDesciption(value) {
    let res = await http.post('/activity/activityIdApplyActivity', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      this.currentActivity = res.data.data[0];
    });
  }
  // 社团的担任老师
  currentActivityTeacher(value) {
    return http.post('/teacher/clubIdTeacher', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 删除社团
  deleteClub(item) {
    this.activityList = this.activityList.filter((user) => user['user_id'] !== item['user_id']);

    return http.post('/users/delete', toHump(item), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 更新社团
  updateClub(value) {
    this.currentActivity = { ...this.currentActivity, ...value };
    return http.post('/activity/updateClubInfo', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }

  // 活动查询
  async getSearch(value) {
    let activityList = await http.post(
      '/activity/searchActivity',
      { keywords: value },
      {
        headers: {
          isLoading: true,
        },
      }
    );
    runInAction(() => {
      this.activityList = activityList.data.data;
    });
  }
  // 提交活动总结
  activityReport(value) {
    return http.post('/activity/addactivityReport', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 撤回活动总结
  cancleActivityReport(value) {
    return http.post('/activity/alteractivityReport', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  reset() {
    this.clubActivityList = [];
    this.userPosition = {};
    this.currentActivity = {};
  }
}

export default ActivityStore;
