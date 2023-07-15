import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
class AreaStore {
  areaList = [];
  areaStatusList = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  // 获取场地信息,true强制请求，false不强制
  async getAllAreaList(flag) {
    if (this.areaList.length > 0 && !flag) {
      return;
    }
    let areaList = await http.post('/area/areaAll', undefined, {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      this.areaList = areaList.data.data;
    });
  }
  // 添加场地
  addArea(value) {
    return http.post('/area/addArea', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 删除场地
  deleteArea(item) {
    this.areaList = this.areaList.filter((area) => area['area_id'] !== item['area_id']);

    return http.post('/area/deleteArea', toHump(item), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 更新场地
  updateArea(value) {
    this.areaList = this.areaList.map((item) => {
      if (item['area_id'] === value['area_id']) {
        return value;
      }
      return item;
    });

    return http.post('/area/updateArea', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 查询场地
  async getSearch(value) {
    let areaList = await http.post(
      '/area/areaSearch',
      { keywords: value },
      {
        headers: {
          isLoading: true,
        },
      }
    );
    runInAction(() => {
      this.areaList = areaList.data.data;
    });
  }
  // 获取场地状态
  async getAreaState() {
    if (this.areaStatusList.length > 0) {
      return;
    }
    let list = await http.post('/area/areaStatusAll', undefined, {
      headers: {
        isLoading: true,
      },
    });
    let disableList = list.data.data.map((item) => {
      if (item.status !== 1) {
        item.disabled = true;
      }
      return item;
    });
    runInAction(() => {
      this.areaStatusList = disableList;
    });
  }
  // 返回排序后的结果
  get areaSortStatusList() {
    return [...this.areaStatusList].sort((a, b) => a.status - b.status);
  }
}

export default AreaStore;
