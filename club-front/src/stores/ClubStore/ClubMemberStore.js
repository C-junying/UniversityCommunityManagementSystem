import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
class ClubMemberStore {
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
    let memberList = await http.post('/club/getClubMember', toHump(value));
    runInAction(() => {
      this.memberList = memberList.data.data;
    });
  }
  // 用户加入社团
  addClubMember(value) {
    return http.post('/club/userJoinMember', toHump(value));
  }
  // 社长添加成员
  captainAddClubMember(value) {
    return http.post('/club/addMember', toHump(value));
  }
  // 删除成员
  deleteMember(item) {
    this.memberList = this.memberList.filter((member) => member['user_id'] !== item['user_id']);
    return http.post('/club/deleteMember', toHump(item));
  }
  // 更新成员职位
  updateMemberBear(value) {
    this.memberList = this.memberList.map((item) => {
      if (item['user_id'] === value['user_id']) {
        item['bear_name'] = value['bear_name'];
      }
      return item;
    });

    return http.post('/club/updateMemberBear', toHump(value));
  }

  // 成员查询 value:{ clubId, keywords: value }
  async getSearch(value) {
    let memberList = await http.post('/club/searchClubMember', value);
    runInAction(() => {
      this.memberList = memberList.data.data;
    });
  }
  reset() {
    this.memberList = [];
  }
}

export default ClubMemberStore;
