import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
class ClubReportStore {
  clubReportList = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  // 获取所有社团报告信息,true强制请求，false不强制
  async getAllClubReportList(value, flag) {
    // 如果clubReportList不为空，则不发布请求
    if (this.clubReportList.length > 0 && !flag) {
      return;
    }
    let clubReportList = await http.post('/club/clubIdReportAll', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      this.clubReportList = clubReportList.data.data;
    });
  }
  // 社长添加社团报告
  captainAddClubReport(value) {
    return http.post('/club/addReport', toHump(value), {
      headers: {
        isLoading: true,
      },
    });
  }
  // 当前报告
  getCurrentReport(value) {
    return http.post('/club/lookClubIdReportId', value, {
      headers: {
        isLoading: true,
      },
    });
  }
  // 删除社团报告
  deleteClubReport(item) {
    this.clubReportList = this.clubReportList.filter((report) => report['report_id'] !== item['report_id']);
    return http.post('/club/deleteReport', toHump(item), {
      headers: {
        isLoading: true,
      },
    });
  }

  // 社团报告查询 value:{ clubId, keywords: value }
  async getSearch(value) {
    let clubReportList = await http.post('/club/searchClubClubReport', value, {
      headers: {
        isLoading: true,
      },
    });
    runInAction(() => {
      this.clubReportList = clubReportList.data.data;
    });
  }
  reset() {
    this.clubReportList = [];
  }
}

export default ClubReportStore;
