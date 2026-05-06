import { Component } from '@angular/core';
import { Sidebar } from './sidebar/sidebar';
import { UsersList } from './users-list/users-list';

@Component({
  selector: 'app-dashboard',
  imports: [Sidebar, UsersList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
