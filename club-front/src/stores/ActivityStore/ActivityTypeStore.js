import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
class ActivityTypeStore {
  typeList = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  // 获取所有活动类型信息,true强制请求，false不强制
  async getAllTypeList(flag) {
    // 如果typeList不为空，则不发布请求
    if (this.typeList.length > 0 && !flag) {
      return;
    }
    let typeList = await http.post('/activity/activityTypeAll', undefined, {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      this.typeList = typeList.data.data;
    });
  }
  // 添加活动类型
  addType(value) {
    return http.post('/activity/addActivityType', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 删除活动类型
  deleteType(item) {
    this.typeList = this.typeList.filter((type) => type['type_id'] !== item['type_id']);

    return http.post('/activity/deleteActivityType', toHump(item), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 更新活动类型
  updateType(value) {
    this.typeList = this.typeList.map((item) => {
      if (item['type_id'] === value['type_id']) {
        return value;
      }
      return item;
    });

    return http.post('/activity/updateActivityType', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }

  // 活动类型查询
  async getSearch(value) {
    let typeList = await http.post(
      '/activity/activityTypeSearch',
      { keywords: value },
      {
        headers: {
          isLoading: true,
        },
      }
    );
    runInAction(() => {
      this.typeList = typeList.data.data;
    });
  }
}

export default ActivityTypeStore;
