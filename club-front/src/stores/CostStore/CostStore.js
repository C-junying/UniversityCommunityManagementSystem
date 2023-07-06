import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
class CostStore {
  clubCostList = [];
  manageCostList = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  // 获取管理员的费用信息
  async getManageCostList() {
    if (this.manageCostList.length > 0) {
      return;
    }
    let list = await http.post('/cost/getManageCost');
    runInAction(() => {
      this.manageCostList = list.data.data;
    });
  }
  // 获取社团费用信息
  async getClubCostList(value) {
    if (this.clubCostList.length > 0) {
      return;
    }
    let costList = await http.post('/cost/getClubCost', toHump(value));
    let clubCostList = await http.post('/cost/getPayName', costList.data.data);
    runInAction(() => {
      this.clubCostList = clubCostList.data.data;
    });
  }
  // 获取当前费用的信息
  getCurrentCost(value) {
    return http.post('/cost/getCostToProject', toHump(value));
  }
  reset() {
    this.clubCostList = [];
  }
}

export default CostStore;
