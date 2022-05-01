import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {

  title = 'Tornado';
  get isAuthorized$(): Observable<boolean> {
    return this.authService.isAuthorized$;
  }
  get userInitials(): string {
    return this.authService.userInitials;
  }

  constructor(private authService: AuthService) { }

  logout(): void {
    this.authService.logout();
  }

}
