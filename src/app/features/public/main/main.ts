import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { ThemeService } from '../../../services/theme-service';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../../services/users-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-main',
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatProgressBar],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {
  private userService = inject(UserService);

  private readonly usersResource = rxResource({
    stream: () => this.userService.getUsers(),
  });

  private readonly router = inject(Router);
  protected readonly theme = inject(ThemeService);

  readonly allUsers = () => this.usersResource.value()?.data ?? [];
  readonly isLoadingAllUsers = () => this.usersResource.isLoading();
  readonly errorAllUsers = () => this.usersResource.error();

  protected goToAdmin() {
    this.router.navigate(['admin']);
  }
}
