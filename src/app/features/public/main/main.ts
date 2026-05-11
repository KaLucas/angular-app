import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { UsersStore } from '../../../shared/store/services/users-store';
import { ThemeService } from '../../../services/theme-service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-main',
  imports: [MatButtonModule, MatCardModule, MatIcon],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private readonly router = inject(Router);
  private readonly store = inject(UsersStore);
  protected readonly users = this.store.allUsers;
  protected readonly theme = inject(ThemeService);

  protected goToAdmin() {
    this.router.navigate(['admin']);
  }
}
