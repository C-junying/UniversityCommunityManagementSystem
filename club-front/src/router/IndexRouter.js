import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { Spin } from 'antd';
import Login from '@/views/login/Login';
import Register from '@/views/register/Register';
import Index from '@/views/index/Index';
import BackStage from '@/views/backstage/BackStage';
import Home from '@/views/backstage/home/Home';
import UserList from '@/views/backstage/user-manage/UserList';
import RoleList from '@/views/backstage/right-manage/RoleList';
import MenuList from '@/views/backstage/right-manage/MenuList';
import Error from '@/components/back-stage/Error';
import AuthRouter from './AuthRouter';
import AreaList from '@/views/area/AreaList';
import ClubList from '@/views/club/ClubList';
import ActivityList from '@/views/activity/activity/ActivityList';
import ClubTypeList from '@/views/club/club-type/ClubTypeList';
import ActivityTypeList from '@/views/activity/activity-type/ActivityTypeList';
import ClubApply from '@/views/club/club-apply/ClubApply';
import ClubApplyList from '@/views/club/club-apply/ClubApplyList';
import ClubPriview from '@/components/club/ClubPriview';
import AuditApplyList from '@/views/club/club-apply/AuditApplyList';
import TeacherList from '@/views/backstage/teacher/TeacherList';
import MyClub from '@/views/club/my-club/MyClub';
import MyClubIntro from '@/views/club/my-club/MyClubIntro';
import ClubInformation from '@/views/club/my-club/ClubInformation';
import ClubMember from '@/views/club/my-club/ClubMember';
import ClubReport from '@/views/club/my-club/ClubReport';
import ClubActivity from '@/views/club/activity-apply/ClubActivityList';
import AddClubReport from '@/components/club/AddClubReport';
import ClubReportPreview from '@/components/club/ClubReportPreview';
import UpdateClub from '@/components/club/UpdateClub';
import ClubDisband from '@/views/club/my-club/ClubDisband';
import ApplyActivity from '@/views/club/activity-apply/ApplyActivity';
import ApplyActivityList from '@/views/club/activity-apply/ApplyActivityList';
import ApplyMoney from '@/views/club/my-club/ApplyMoney';
import AuditCostApplyList from '@/views/cost/AuditCostApplyList';
import CostList from '@/views/cost/CostList';
import ClubCostList from '@/views/club/my-club/ClubCostList';
import ActivityPriview from '@/components/activity/ActivityPriview';
import AuditActivityApplyList from '@/views/activity/activity-apply/AuditActivityApplyList';
import ActivityInfo from '@/views/activity/activity/ActivityInfo';
import ActivityInformation from '@/views/activity/ActivityInformation';
import ActivityMember from '@/views/activity/ActivityMember';
import ActivityStage from '@/views/activity/ActivityStage';
import ActivityReport from '@/views/activity/ActivityReport';
import MyInformation from '@/views/backstage/user-manage/MyInformation';
import SystemIntro from '@/components/back-stage/SystemIntro';
import MyActivity from '@/views/activity/activity/MyActivity';
import HotActivity from '@/views/index/HotActivity';
import HotClub from '@/views/index/HotClub';
import IndexMyClub from '@/views/index/IndexMyClub';
import IndexMyActivity from '@/views/index/IndexMyActivity';
import ResetPassword from '@/views/login/ResetPassword';

const LazyLoad = (Comp) => {
  //传入在view 下的路径
  // const Comp = React.lazy(() => import(`../view${path}`))
  return (
    <React.Suspense fallback={<Spin tip="加载中" size="large" />}>
      <Comp />
    </React.Suspense>
  );
};

export default function IndexRouter() {
  const routes = useRoutes([
    {
      path: '/login',
      element: LazyLoad(Login),
    },
    {
      path: '/reset-password',
      element: LazyLoad(ResetPassword),
    },
    {
      path: '/register',
      element: LazyLoad(Register),
    },
    {
      path: '/',
      element: <Navigate to="/index" />,
    },
    {
      path: '/index',
      element: LazyLoad(Index),
      // element: <Navigate to="backstage" />,
      children: [
        { path: '', element: <Navigate to="system-intro" /> },
        { path: 'system-intro', element: LazyLoad(SystemIntro) },
        { path: 'hot-activity', element: LazyLoad(HotActivity) },
        { path: 'hot-club', element: LazyLoad(HotClub) },
        { path: 'my-club', element: LazyLoad(IndexMyClub) },
        { path: 'my-activity', element: LazyLoad(IndexMyActivity) },
      ],
    },
    {
      path: '/backstage',
      element: <AuthRouter element={LazyLoad(BackStage)} />,
      children: [
        {
          path: '',
          element: <Navigate to="home" />,
        },
        {
          path: 'home',
          element: LazyLoad(Home),
        },
        {
          path: 'users/list',
          element: LazyLoad(UserList),
        },
        {
          path: 'admin/role',
          element: LazyLoad(RoleList),
        },
        {
          path: 'admin/menu',
          element: LazyLoad(MenuList),
        },
        {
          path: 'teacher/list',
          element: LazyLoad(TeacherList),
        },
      ],
    },
    {
      path: '/club',
      element: <AuthRouter element={LazyLoad(BackStage)} />,
      children: [
        {
          path: 'list',
          element: LazyLoad(ClubList),
        },
        {
          path: 'club-type/list',
          element: LazyLoad(ClubTypeList),
        },
        {
          path: 'club-apply/apply',
          element: LazyLoad(ClubApply),
        },
        {
          path: 'club-apply/list',
          element: LazyLoad(ClubApplyList),
        },
        {
          path: 'club-apply/list/preview/:applyId',
          element: LazyLoad(ClubPriview),
        },
        {
          path: 'club-apply/audit/list/preview/:applyId',
          element: LazyLoad(ClubPriview),
        },
        {
          path: 'club-apply/audit/list',
          element: LazyLoad(AuditApplyList),
        },
        {
          path: 'my-club',
          element: LazyLoad(MyClub),
        },
        {
          path: 'my-club/:clubId/intro',
          element: LazyLoad(MyClubIntro),
          children: [
            {
              path: '',
              element: <Navigate to="information" />,
            },
            {
              path: 'information',
              element: LazyLoad(ClubInformation),
            },
            {
              path: 'member',
              element: LazyLoad(ClubMember),
            },
            {
              path: 'activity',
              element: LazyLoad(ClubActivity),
            },
            {
              path: 'report',
              element: LazyLoad(ClubReport),
            },
            {
              path: 'apply-activity',
              element: LazyLoad(ApplyActivity),
            },
            {
              path: 'apply-activity-list',
              element: LazyLoad(ApplyActivityList),
            },
            {
              path: 'apply-money',
              element: LazyLoad(ApplyMoney),
            },

            {
              path: 'cost-list',
              element: LazyLoad(ClubCostList),
            },
            {
              path: 'club-disband',
              element: LazyLoad(ClubDisband),
            },
          ],
        },
        {
          path: 'my-club/:clubId/intro/apply-activity-list/preview/:activityId',
          element: LazyLoad(ActivityPriview),
        },
        {
          path: 'my-club/:clubId/intro/information/update',
          element: LazyLoad(UpdateClub),
        },
        {
          path: 'my-club/:clubId/intro/report/:userId',
          element: LazyLoad(AddClubReport),
        },
        {
          path: 'my-club/:clubId/intro/report/preview/:reportId',
          element: LazyLoad(ClubReportPreview),
        },
      ],
    },
    {
      path: '/activity',
      element: <AuthRouter element={LazyLoad(BackStage)} />,
      children: [
        {
          path: 'list',
          element: LazyLoad(ActivityList),
        },
        {
          path: 'list/:activityId/intro',
          element: LazyLoad(ActivityInfo),
          children: [
            {
              path: '',
              element: <Navigate to="information" />,
            },
            {
              path: 'information',
              element: LazyLoad(ActivityInformation),
            },
            {
              path: 'member',
              element: LazyLoad(ActivityMember),
            },
            {
              path: 'activity-stage',
              element: LazyLoad(ActivityStage),
            },
            {
              path: 'report',
              element: LazyLoad(ActivityReport),
            },
          ],
        },
        {
          path: 'user-activity',
          element: LazyLoad(MyActivity),
        },
        {
          path: 'user-activity/:activityId/intro',
          element: LazyLoad(ActivityInfo),
          children: [
            {
              path: '',
              element: <Navigate to="information" />,
            },
            {
              path: 'information',
              element: LazyLoad(ActivityInformation),
            },
            {
              path: 'member',
              element: LazyLoad(ActivityMember),
            },
            {
              path: 'activity-stage',
              element: LazyLoad(ActivityStage),
            },
            {
              path: 'report',
              element: LazyLoad(ActivityReport),
            },
          ],
        },
        {
          path: 'activity-type/list',
          element: LazyLoad(ActivityTypeList),
        },
        {
          path: 'activity-apply/audit/list',
          element: LazyLoad(AuditActivityApplyList),
        },
        {
          path: 'activity-apply/audit/list/preview/:activityId',
          element: LazyLoad(ActivityPriview),
        },
      ],
    },
    {
      path: '/area',
      element: <AuthRouter element={LazyLoad(BackStage)} />,
      children: [
        {
          path: 'list',
          element: LazyLoad(AreaList),
        },
      ],
    },
    {
      path: '/cost',
      element: <AuthRouter element={LazyLoad(BackStage)} />,
      children: [
        {
          path: 'audit',
          element: LazyLoad(AuditCostApplyList),
        },
        {
          path: 'cost-list',
          element: LazyLoad(CostList),
        },
      ],
    },
    {
      path: '/my',
      element: <AuthRouter element={LazyLoad(BackStage)} />,
      children: [
        {
          path: 'information',
          element: LazyLoad(MyInformation),
        },
      ],
    },
    {
      path: '*',
      element: LazyLoad(Error),
    },
  ]);
  return routes;
}
