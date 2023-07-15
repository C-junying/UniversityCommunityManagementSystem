import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
class CostProcessStore {
  // 社团费用
  costApplyList = [];
  auditApplyList = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  // 获取所有申请费用信息
  async getAllApplyCostList() {
    if (this.auditApplyList.length > 0) {
      return;
    }
    let list = await http.post('/cost/getCostApplyAll', undefined, {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      this.auditApplyList = list.data.data;
    });
  }
  // 审核社团费用申请
  auditClubCostApply(value) {
    this.auditApplyList.map((item) => {
      if (item['apply_id'] === value['apply_id']) {
        item['apply_state'] = value['apply_state'];
      }
      return item;
    });
    return http.post('/cost/auditCostApply', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 获取社团申请费用信息
  async getClubApplyCostList(value) {
    if (this.costApplyList.length > 0) {
      return;
    }
    let list = await http.post('/cost/getClubCostApply', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      this.costApplyList = list.data.data;
    });
  }
  // 获取当前费用的信息
  getCurrentCost(value) {
    return http.post('/cost/getCostToProject', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 添加社团费用申请
  addClubApplyCost(value) {
    return http.post('/cost/addCostApply', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 删除社团费用申请
  deleteClubApplyCost(item) {
    this.costApplyList = this.costApplyList.filter((apply) => apply['apply_id'] !== item['apply_id']);
    return http.post('/cost/deleteCostApply', toHump(item), {
      headers: {
        isLoading: true,
      },
    });
  }
  reset() {
    this.costApplyList = [];
  }
}

export default CostProcessStore;
