import { makeAutoObservable, runInAction } from 'mobx';
import { http } from '@/utils/http';
import { toHump } from '@/utils/toHump';
class TeacherStore {
  teacherList = [];
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  // 获取所有老师信息,true强制请求，false不强制
  async getAllTeacherList(flag) {
    // 如果teacherList不为空，则不发布请求
    if (this.teacherList.length > 0 && !flag) {
      return;
    }
    let teacherList = await http.post('/teacher/teacherAll');
    runInAction(() => {
      this.teacherList = teacherList.data.data;
    });
  }
  // 添加老师
  addTeacher(value) {
    return http.post('/teacher/addteacher', toHump(value));
  }
  // 删除老师
  deleteTeacher(item) {
    this.teacherList = this.teacherList.filter((teacher) => teacher['teacher_id'] !== item['teacher_id']);

    return http.post('/teacher/deleteteacher', toHump(item));
  }
  // 更新老师
  updateTeacher(value) {
    this.teacherList = this.teacherList.map((item) => {
      if (item['teacher_id'] === value['teacher_id']) {
        return value;
      }
      return item;
    });

    return http.post('/teacher/updateteacher', toHump(value));
  }

  // 老师查询
  async getSearch(value) {
    let teacherList = await http.post('/teacher/teacherSearch', { keywords: value });
    runInAction(() => {
      this.teacherList = teacherList.data.data;
    });
  }
  // 老师信息的简单介绍
  get teacherListIntro() {
    return [...this.teacherList].map((item) => {
      return {
        teacher_intro: `${item['user_name']} (${item.college}) (${item.position})`,
        teacher_id: item['teacher_id'],
      };
    });
  }
}

export default TeacherStore;
