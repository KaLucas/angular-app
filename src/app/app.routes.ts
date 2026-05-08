import { Routes } from '@angular/router';
import { Login } from './features/admin/login/login';
import { Dashboard } from './features/admin/dashboard/dashboard';
import { Main } from './features/public/main/main';

export const routes: Routes = [
  {
    path: '',
    component: Main,
  },
  {
    path: 'admin',
    component: Login,
  },
  {
    path: 'admin/dashboard',
    component: Dashboard,
  },
];
