import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
class ActivityMemberStore {
  memberList = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  // 获取所有成员信息,true强制请求，false不强制
  async getAllMemberList(value, flag) {
    // 如果memberList不为空，则不发布请求
    if (this.memberList.length > 0 && !flag) {
      return;
    }
    let memberList = await http.post('/activity/getActivityMember', toHump(value));
    runInAction(() => {
      this.memberList = memberList.data.data;
    });
  }
  // 用户加入活动
  addActivityMember(value) {
    return http.post('/activity/userJoinMember', toHump(value));
  }
  // 添加成员
  captainAddActivityMember(value) {
    return http.post('/activity/addMember', toHump(value));
  }
  // 删除成员
  deleteMember(item) {
    this.memberList = this.memberList.filter((member) => member['user_id'] !== item['user_id']);
    return http.post('/activity/deleteMember', toHump(item));
  }
  // 更新成员职位
  updateMemberBear(value) {
    this.memberList = this.memberList.map((item) => {
      if (item['user_id'] === value['user_id']) {
        item['bear_name'] = value['bear_name'];
      }
      return item;
    });

    return http.post('/activity/updateMemberBear', toHump(value));
  }

  // 成员查询 value:{ activityId, keywords: value }
  async getSearch(value) {
    let memberList = await http.post('/activity/searchActivityMember', value);
    runInAction(() => {
      this.memberList = memberList.data.data;
    });
  }
  reset() {
    this.memberList = [];
  }
}

export default ActivityMemberStore;
