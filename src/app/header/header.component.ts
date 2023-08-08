import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@tba/services';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less'],
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    NgIf,
    RouterLinkActive,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    AsyncPipe,
  ],
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
