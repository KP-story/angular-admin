interface NavAttributes {
  [propName: string]: any;
}

interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}

interface NavBadge {
  text: string;
  variant: string;
}

interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'ADMIN',
    icon: 'icon-user',
    url: '/account',

    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    title: true,
    name: 'My Information '
  },
  {
    name: 'Profile',
    url: '/account/profile',
    icon: 'icon-drop'
  },
  {
    name: 'Change password',
    url: '/account/changepassword',
    icon: 'icon-pencil'
  },
  {
    name: 'Logout',
    url: '/login',
    icon: 'icon-logout'
  },
  {
    title: true,
    name: 'Account manager'
  }, {
    name: 'Users',
    url: '/account/users',
    icon: 'icon-drop'
  },
  {
    name: 'Role-Permission',
    url: '/account',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Resource',
        url: '/account/resource',
        icon: 'icon-puzzle'
      },
      {
        name: 'Operation',
        url: '/account/operation',
        icon: 'icon-puzzle'
      },
      {
        name: 'Role',
        url: '/account/role',
        icon: 'icon-puzzle'
      }
    ]
  }

];
