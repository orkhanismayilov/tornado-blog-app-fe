import { Component } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent {
  title = 'Tornado';

  get isAuthenticated$(): Observable<boolean> {
    return this.authService.isAuthenticated$;
  }
  get userInitials(): string {
    return this.authService.userInitials;
  }

  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
  }
}
