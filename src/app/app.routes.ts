import { Routes } from '@angular/router';
import { Login } from './features/admin/login/login';
import { Dashboard } from './features/admin/dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'admin',
    component: Login,
  },
  {
    path: 'admin/dashboard',
    component: Dashboard,
  },
];
