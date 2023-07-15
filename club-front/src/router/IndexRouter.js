import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import AuthRouter from './AuthRouter';
const Login = React.lazy(() => import('@/views/login/Login'));
const Register = React.lazy(() => import('@/views/register/Register'));
const Index = React.lazy(() => import('@/views/index/Index'));
const BackStage = React.lazy(() => import('@/views/backstage/BackStage'));
const Home = React.lazy(() => import('@/views/backstage/home/Home'));
const UserList = React.lazy(() => import('@/views/backstage/user-manage/UserList'));
const RoleList = React.lazy(() => import('@/views/backstage/right-manage/RoleList'));
const MenuList = React.lazy(() => import('@/views/backstage/right-manage/MenuList'));
const Error = React.lazy(() => import('@/components/back-stage/Error'));
const AreaList = React.lazy(() => import('@/views/area/AreaList'));
const ClubList = React.lazy(() => import('@/views/club/ClubList'));
const ActivityList = React.lazy(() => import('@/views/activity/activity/ActivityList'));
const ClubTypeList = React.lazy(() => import('@/views/club/club-type/ClubTypeList'));
const ActivityTypeList = React.lazy(() => import('@/views/activity/activity-type/ActivityTypeList'));
const ClubApply = React.lazy(() => import('@/views/club/club-apply/ClubApply'));
const ClubApplyList = React.lazy(() => import('@/views/club/club-apply/ClubApplyList'));
const ClubPriview = React.lazy(() => import('@/components/club/ClubPriview'));
const AuditApplyList = React.lazy(() => import('@/views/club/club-apply/AuditApplyList'));
const TeacherList = React.lazy(() => import('@/views/backstage/teacher/TeacherList'));
const MyClub = React.lazy(() => import('@/views/club/my-club/MyClub'));
const MyClubIntro = React.lazy(() => import('@/views/club/my-club/MyClubIntro'));
const ClubInformation = React.lazy(() => import('@/views/club/my-club/ClubInformation'));
const ClubMember = React.lazy(() => import('@/views/club/my-club/ClubMember'));
const ClubReport = React.lazy(() => import('@/views/club/my-club/ClubReport'));
const ClubActivity = React.lazy(() => import('@/views/club/activity-apply/ClubActivityList'));
const AddClubReport = React.lazy(() => import('@/components/club/AddClubReport'));
const ClubReportPreview = React.lazy(() => import('@/components/club/ClubReportPreview'));
const UpdateClub = React.lazy(() => import('@/components/club/UpdateClub'));
const ClubDisband = React.lazy(() => import('@/views/club/my-club/ClubDisband'));
const ApplyActivity = React.lazy(() => import('@/views/club/activity-apply/ApplyActivity'));
const ApplyActivityList = React.lazy(() => import('@/views/club/activity-apply/ApplyActivityList'));
const ApplyMoney = React.lazy(() => import('@/views/club/my-club/ApplyMoney'));
const AuditCostApplyList = React.lazy(() => import('@/views/cost/AuditCostApplyList'));
const CostList = React.lazy(() => import('@/views/cost/CostList'));
const ClubCostList = React.lazy(() => import('@/views/club/my-club/ClubCostList'));
const ActivityPriview = React.lazy(() => import('@/components/activity/ActivityPriview'));
const AuditActivityApplyList = React.lazy(() => import('@/views/activity/activity-apply/AuditActivityApplyList'));
const ActivityInfo = React.lazy(() => import('@/views/activity/activity/ActivityInfo'));
const ActivityInformation = React.lazy(() => import('@/views/activity/ActivityInformation'));
const ActivityMember = React.lazy(() => import('@/views/activity/ActivityMember'));
const ActivityStage = React.lazy(() => import('@/views/activity/ActivityStage'));
const ActivityReport = React.lazy(() => import('@/views/activity/ActivityReport'));
const MyInformation = React.lazy(() => import('@/views/backstage/user-manage/MyInformation'));
const SystemIntro = React.lazy(() => import('@/components/back-stage/SystemIntro'));
const MyActivity = React.lazy(() => import('@/views/activity/activity/MyActivity'));
const HotActivity = React.lazy(() => import('@/views/index/HotActivity'));
const HotClub = React.lazy(() => import('@/views/index/HotClub'));
const IndexMyClub = React.lazy(() => import('@/views/index/IndexMyClub'));
const IndexMyActivity = React.lazy(() => import('@/views/index/IndexMyActivity'));
const ResetPassword = React.lazy(() => import('@/views/login/ResetPassword'));

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
