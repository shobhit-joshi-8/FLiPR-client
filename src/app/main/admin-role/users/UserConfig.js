
import { authRoles } from 'src/app/auth';
import User from './User'
import UserList from './tabs/user-list/UserList'
import NewUser from './tabs/new-user/NewUser'
import DeleteUser from './tabs/delete-user/DeleteUser'
import UserPassword from './tabs/user-password/UserPassword'
import { Navigate } from 'react-router-dom';
import { element } from 'prop-types';


const UserConfig = {
  settings: {
    layout: {
      config: {},
    },
  },
  auth: authRoles.admin,
  routes: [
    {
      path: '/admin/user',
      children: [
        {
          path: '',
          element: <Navigate to="/admin/user/userList" />,
        },
        {
          path: 'userList',
          element: <User><UserList /></User>
        },
        {
          path: 'newUser',
          element: <User><NewUser /></User>
        },
        {
          path: 'deleteUser',
          element: <User>< DeleteUser /></User>
        },
        {
          path: 'userPassword',
          element: <User>< UserPassword /></User>
        },
      ]
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
