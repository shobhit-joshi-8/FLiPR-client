import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';
import { authRoles } from '../auth';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    translate: 'Dashboard',
    type: 'group',
    auth: authRoles.admin,
    children: [
          {
            id: 'dashboard.dashboard',
            title: 'Dashboard',
            translate:'Dashboard',
            type: 'item',
            icon: 'heroicons-outline:view-grid',
            url: '/admin/dashboard',
          },
    ]
  },
  {
    id: 'usermanagement',
    title: 'User Management',
    translate: 'user-management',
    type: 'group',
    icon: 'heroicons-outline:home',
    auth: authRoles.admin,
    // url: '/auth/products',
    children: [
      {
        id: 'usermanagement.userList',
        title: 'User List',
        translate:"User-List",
        type: 'item',
        icon: 'heroicons-outline:clipboard-check',
        url: '/admin/user/userList',
      },
      {
        id: 'usermanagement.createUser',
        title: 'Create User',
        translate:"Create-User",
        type: 'item',
        icon: 'heroicons-outline:plus-circle',
        url: '/admin/user/newUser',
      },
      {
        id: 'usermanagement.deleteUser',
        title: 'Delete User',
        translate:"Delete-User",
        type: 'item',
        icon: 'heroicons-outline:plus-circle',
        url: '/admin/user/deleteUser',
      },
      {
        id: 'usermanagement.changeuserpw',
        title: 'Change-User-Password',
        translate:"Change-User-Password",
        type: 'item',
        icon: 'heroicons-outline:plus-circle',
        url: '/admin/user/userPassword',
      },
    ]
  },
  {
    id: 'home',
    title: 'Home',
    translate: 'HOME',
    type: 'item',
    icon: 'heroicons-outline:home',
    url: 'user/home',
    auth: authRoles.user,
  },
];

export default navigationConfig;
