import { Component } from '@angular/core';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {

  title = 'Tornado';
  get isAuthorized(): boolean {
    return this.authService.isAuthorized;
  }
  get userInitials(): string {
    return this.authService.userInitials;
  }

  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }

}
