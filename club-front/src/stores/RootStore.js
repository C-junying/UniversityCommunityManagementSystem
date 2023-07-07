import React, { createContext, useContext } from 'react';
import TokenStore from './UserStore/TokenStore';
import UserStore from './UserStore/UserStore';
import RoleStore from './rightManageStore/RoleStore';
import MenuStore from './rightManageStore/MenuStore';
import AreaStore from './AreaStore/AreaStore';
import TeacherStore from './TeacherStore/TeacherStore';
import ClubTypeStore from './ClubStore/ClubTypeStore';
import ActivityTypeStore from './ActivityStore/ActivityTypeStore';
import ClubStore from './ClubStore/ClubStore';
import ClubProcessStore from './ClubStore/ClubProcessStore';
import ClubMemberStore from './ClubStore/ClubMemberStore';
import ClubReportStore from './ClubStore/ClubReportStore';
import CostStore from './CostStore/CostStore';
import CostProcessStore from './CostStore/CostProcessStore';
import ActivityProcessStore from './ActivityStore/ActivityProcessStore';
import ActivityStore from './ActivityStore/ActivityStore';
import ActivityMemberStore from './ActivityStore/ActivityMemberStore';
import ActivityStageStore from './ActivityStore/ActivityStageStore';
import IndexStore from './IndexStore/IndexStore';
import StyleStore from './StyleStore/StyleStore';

class RootStore {
  // 组合模块
  constructor() {
    // 个人信息
    this.tokenStore = new TokenStore();
    // 主页
    this.indexStore = new IndexStore();
    // 所有用户信息
    this.userStore = new UserStore();
    // 角色信息
    this.roleStore = new RoleStore();
    // 菜单信息
    this.menuStore = new MenuStore();
    // 场地信息
    this.areaStore = new AreaStore();
    // 老师信息
    this.teacherStore = new TeacherStore();
    // 社团类型
    this.clubTypeStore = new ClubTypeStore();
    // 社团申请流程
    this.clubProcessStore = new ClubProcessStore();
    // 社团信息
    this.clubStore = new ClubStore();
    // 社团成员
    this.clubMemberStore = new ClubMemberStore();
    // 社团学期报告
    this.clubReportStore = new ClubReportStore();
    // 活动类型
    this.activityTypeStore = new ActivityTypeStore();
    // 活动申请
    this.activityProcessStore = new ActivityProcessStore();
    // 活动信息
    this.activityStore = new ActivityStore();
    // 活动成员
    this.activityMemberStore = new ActivityMemberStore();
    // 活动阶段
    this.activityStageStore = new ActivityStageStore();
    // 费用
    this.costStore = new CostStore();
    // 费用申请
    this.costProcessStore = new CostProcessStore();
    // 样式
    this.styleStore = new StyleStore();
  }
}
const rootStore = new RootStore();
// 注入context
const RootStoreContext = createContext();
// 使用provider包裹组件
const RootStoreProvider = ({ children }) => {
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
};
// 使用store
const useRootStore = () => {
  return useContext(RootStoreContext);
};
export { RootStore, RootStoreProvider, useRootStore };
