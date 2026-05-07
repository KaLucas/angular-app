import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../services/auth-service';
import { UsersStore } from '../../../../shared/store/services/users-store';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [MatDividerModule, MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private auth = inject(AuthService);
  protected readonly store = inject(UsersStore);

  protected handleLogout() {
    this.auth.logout();
  }
}
