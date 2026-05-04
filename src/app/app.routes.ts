import { Routes } from '@angular/router';
import { Login } from './features/admin/login/login';
import { Users } from './features/admin/users/users';

export const routes: Routes = [
  {
    path: 'admin',
    component: Login,
  },
  {
    path: 'admin/users',
    component: Users,
  },
];
