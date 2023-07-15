import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
class ActivityStageStore {
  activityStageList = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  // 获取所有活动阶段信息,true强制请求，false不强制
  async getAllActivityStageList(value, flag) {
    // 如果activityStageList不为空，则不发布请求
    if (this.activityStageList.length > 0 && !flag) {
      return;
    }
    let list = await http.post('/activity/getActivityStage', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      this.activityStageList = list.data.data;
    });
  }
  // 活动负责人添加活动阶段
  captainAddActivityStage(value) {
    return http.post('/activity/addActivityStage', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 当前报告
  getCurrentReport(value) {
    return http.post('/activity/getStageInfo', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 删除活动阶段
  deleteActivityStage(item) {
    this.activityStageList = this.activityStageList.filter((report) => report['stage_id'] !== item['stage_id']);
    return http.post('/activity/deleteActivityStage', toHump(item), {
      headers: {
        isLoading: true,
      },
    });
  }
  reset() {
    this.activityStageList = [];
  }
}

export default ActivityStageStore;
