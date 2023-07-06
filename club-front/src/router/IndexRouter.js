import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
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

// const LazyLoad = (path) => { //传入在view 下的路径
//   const Comp = React.lazy(() => import(`../view${path}`))
//   return (
//       <React.Suspense fallback={<> 加载中...</>}>
//           <Comp />
//       </React.Suspense>
//   )
// }

export default function IndexRouter() {
  const routes = useRoutes([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/reset-password',
      element: <ResetPassword />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/',
      element: <Navigate to="/index" />,
    },
    {
      path: '/index',
      element: <Index />,
      // element: <Navigate to="backstage" />,
      children: [
        { path: '', element: <Navigate to="system-intro" /> },
        { path: 'system-intro', element: <SystemIntro /> },
        { path: 'hot-activity', element: <HotActivity /> },
        { path: 'hot-club', element: <HotClub /> },
        { path: 'my-club', element: <IndexMyClub /> },
        { path: 'my-activity', element: <IndexMyActivity /> },
      ],
    },
    {
      path: '/backstage',
      element: <AuthRouter element={<BackStage />} />,
      children: [
        {
          path: '',
          element: <Navigate to="home" />,
        },
        {
          path: 'home',
          element: <Home />,
        },
        {
          path: 'users/list',
          element: <UserList />,
        },
        {
          path: 'admin/role',
          element: <RoleList />,
        },
        {
          path: 'admin/menu',
          element: <MenuList />,
        },
        {
          path: 'teacher/list',
          element: <TeacherList />,
        },
      ],
    },
    {
      path: '/club',
      element: <AuthRouter element={<BackStage />} />,
      children: [
        {
          path: 'list',
          element: <ClubList />,
        },
        {
          path: 'club-type/list',
          element: <ClubTypeList />,
        },
        {
          path: 'club-apply/apply',
          element: <ClubApply />,
        },
        {
          path: 'club-apply/list',
          element: <ClubApplyList />,
        },
        {
          path: 'club-apply/list/preview/:applyId',
          element: <ClubPriview />,
        },
        {
          path: 'club-apply/audit/list/preview/:applyId',
          element: <ClubPriview />,
        },
        {
          path: 'club-apply/audit/list',
          element: <AuditApplyList />,
        },
        {
          path: 'my-club',
          element: <MyClub />,
        },
        {
          path: 'my-club/:clubId/intro',
          element: <MyClubIntro />,
          children: [
            {
              path: '',
              element: <Navigate to="information" />,
            },
            {
              path: 'information',
              element: <ClubInformation />,
            },
            {
              path: 'member',
              element: <ClubMember />,
            },
            {
              path: 'activity',
              element: <ClubActivity />,
            },
            {
              path: 'report',
              element: <ClubReport />,
            },
            {
              path: 'apply-activity',
              element: <ApplyActivity />,
            },
            {
              path: 'apply-activity-list',
              element: <ApplyActivityList />,
            },
            {
              path: 'apply-money',
              element: <ApplyMoney />,
            },

            {
              path: 'cost-list',
              element: <ClubCostList />,
            },
            {
              path: 'club-disband',
              element: <ClubDisband />,
            },
          ],
        },
        {
          path: 'my-club/:clubId/intro/apply-activity-list/preview/:activityId',
          element: <ActivityPriview />,
        },
        {
          path: 'my-club/:clubId/intro/information/update',
          element: <UpdateClub />,
        },
        {
          path: 'my-club/:clubId/intro/report/:userId',
          element: <AddClubReport />,
        },
        {
          path: 'my-club/:clubId/intro/report/preview/:reportId',
          element: <ClubReportPreview />,
        },
      ],
    },
    {
      path: '/activity',
      element: <AuthRouter element={<BackStage />} />,
      children: [
        {
          path: 'list',
          element: <ActivityList />,
        },
        {
          path: 'list/:activityId/intro',
          element: <ActivityInfo />,
          children: [
            {
              path: '',
              element: <Navigate to="information" />,
            },
            {
              path: 'information',
              element: <ActivityInformation />,
            },
            {
              path: 'member',
              element: <ActivityMember />,
            },
            {
              path: 'activity-stage',
              element: <ActivityStage />,
            },
            {
              path: 'report',
              element: <ActivityReport />,
            },
          ],
        },
        {
          path: 'user-activity',
          element: <MyActivity />,
        },
        {
          path: 'user-activity/:activityId/intro',
          element: <ActivityInfo />,
          children: [
            {
              path: '',
              element: <Navigate to="information" />,
            },
            {
              path: 'information',
              element: <ActivityInformation />,
            },
            {
              path: 'member',
              element: <ActivityMember />,
            },
            {
              path: 'activity-stage',
              element: <ActivityStage />,
            },
            {
              path: 'report',
              element: <ActivityReport />,
            },
          ],
        },
        {
          path: 'activity-type/list',
          element: <ActivityTypeList />,
        },
        {
          path: 'activity-apply/audit/list',
          element: <AuditActivityApplyList />,
        },
        {
          path: 'activity-apply/audit/list/preview/:activityId',
          element: <ActivityPriview />,
        },
      ],
    },
    {
      path: '/area',
      element: <AuthRouter element={<BackStage />} />,
      children: [
        {
          path: 'list',
          element: <AreaList />,
        },
      ],
    },
    {
      path: '/cost',
      element: <AuthRouter element={<BackStage />} />,
      children: [
        {
          path: 'audit',
          element: <AuditCostApplyList />,
        },
        {
          path: 'cost-list',
          element: <CostList />,
        },
      ],
    },
    {
      path: '/my',
      element: <AuthRouter element={<BackStage />} />,
      children: [
        {
          path: 'information',
          element: <MyInformation />,
        },
      ],
    },
    {
      path: '*',
      element: <Error />,
    },
  ]);
  return routes;
}
