import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
class ClubStore {
  // 所有社团
  clubList = [];
  // 用户加入的社团
  userClubList = [];
  // 社团的职位
  userPosition = {};
  // 当前社团
  currentClub = {};
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  // 获取所有社团信息,true强制请求，false不强制
  async getAllClubList(flag) {
    // 如果clubList不为空，则不发布请求
    if (this.clubList.length > 0 && !flag) {
      return;
    }
    let clubList = await http.post('/club/getClubsAll', undefined, {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      this.clubList = clubList.data.data;
    });
  }
  // 获取用户社团信息
  async getUserClubList() {
    // 如果userClubList不为空，则不发布请求
    if (this.userClubList.length > 0) {
      return;
    }
    let list = await http.post('/club/getUserClubs', undefined, {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      this.userClubList = list.data.data;
    });
  }
  /**
   * @description: 返回用户在社团的职位
   * @param {*} value clubId
   */
  async getUserBearPosition(value) {
    if (JSON.stringify(this.userPosition) !== '{}') {
      return;
    }
    const bear = await http.post('/club/clubIdUserIdToBearName', toHump(value), {
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
  async currentClubDesciption(value) {
    let res = await http.post('/club/clubIdApplyClub', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      this.currentClub = res.data.data[0];
    });
  }
  // 社团的担任老师
  currentClubTeacher(value) {
    return http.post('/teacher/clubIdTeacher', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 删除社团
  deleteClub(item) {
    this.clubList = this.clubList.filter((user) => user['user_id'] !== item['user_id']);

    return http.post('/users/delete', toHump(item), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 更新社团
  updateClub(value) {
    this.currentClub = { ...this.currentClub, ...value };
    return http.post('/club/updateClubInfo', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }

  // 社团查询
  async getSearch(value) {
    let clubList = await http.post('/club/searchClubsAll', { keywords: value });
    runInAction(() => {
      this.clubList = clubList.data.data;
    });
  }
  // 解散社团
  clubDisband(value) {
    return http.post('/club/clubDisband', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 撤回社团解散
  cancleClubDisband(value) {
    return http.post('/club/alterclubDisband', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  reset() {
    this.userPosition = {};
    this.currentClub = {};
  }
}

export default ClubStore;
