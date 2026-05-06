import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../../services/auth-service';

@Component({
  selector: 'app-sidebar',
  imports: [MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private auth = inject(AuthService);

  protected handleLogout() {
    this.auth.logout();
  }
}
