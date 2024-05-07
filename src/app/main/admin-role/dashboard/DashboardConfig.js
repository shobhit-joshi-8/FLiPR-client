
import { authRoles } from 'src/app/auth';
import Dashboard from './Dashboard'

const DashboardConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth:authRoles.admin,
  routes: [
    {
      path: 'admin/dashboard',
      element: <Dashboard />,
    },
  ],
};

export default DashboardConfig;

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
