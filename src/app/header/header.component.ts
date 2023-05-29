import { Component } from '@angular/core';
import { AuthService } from '@tba/services';

import { Observable } from 'rxjs';

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
    return this.authService.userData.initials;
  }

  constructor(private authService: AuthService) {}

  onLogout(): void {
    this.authService.logout();
  }
}
