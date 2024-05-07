
import { authRoles } from 'src/app/auth';
import UserHome from './UserHome'

const UserConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:authRoles.user,
  routes: [
    {
      path: 'user/home',
      element: <UserHome />,
    },
  ],
};

export default UserConfig;

/**
 * Lazy load Example
 */
/*
import React from 'react';

const Example = lazy(() => import('./Example'));

const ExampleConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  routes: [
    {
      path: 'example',
      element: <Example />,
    },
  ],
};

export default ExampleConfig;
*/
