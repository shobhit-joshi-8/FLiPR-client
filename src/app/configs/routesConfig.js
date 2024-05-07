import FuseUtils from '@fuse/utils';
import FuseLoading from '@fuse/core/FuseLoading';
import { Navigate } from 'react-router-dom';
import settingsConfig from 'app/configs/settingsConfig';
import SignInConfig from '../main/sign-in/SignInConfig';
import SignUpConfig from '../main/sign-up/SignUpConfig';
import SignOutConfig from '../main/sign-out/SignOutConfig';
import Error404Page from '../main/404/Error404Page';
import ExampleConfig from '../main/example/ExampleConfig';
import UserConfig from '../main/admin-role/users/UserConfig'
import DashboardConfig from '../main/admin-role/dashboard/DashboardConfig';
import Authorization from 'app/shared-components/Authorization';
import userConfig from '../main/user-role/UserHome/UserConfig';

const routeConfigs = [userConfig,UserConfig,DashboardConfig,ExampleConfig, SignOutConfig, SignInConfig, SignUpConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs, [localStorage.getItem('auth_role') === 'user' ? "user" : "admin"]),
  {
    path: '/',
    element: <Authorization />
  },
  {
    path: 'loading',
    element: <FuseLoading />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '*',
    element: <Navigate to="404" />,
  },
];

export default routes;