import { Component, inject } from '@angular/core';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUsers, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../services/auth-service';

@Component({
  selector: 'app-sidebar',
  imports: [MatDividerModule, FontAwesomeModule, MatButtonModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private auth = inject(AuthService);

  faUsers = faUsers;
  faLogout = faArrowRightFromBracket;

  protected handleLogout() {
    this.auth.logout();
  }
}
