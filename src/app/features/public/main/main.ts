import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { UsersStore } from '../../../shared/store/services/users-store';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-main',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private readonly router = inject(Router);
  private readonly store = inject(UsersStore);
  protected readonly users = this.store.allUsers;

  protected goToAdmin() {
    this.router.navigate(['admin']);
  }
}
