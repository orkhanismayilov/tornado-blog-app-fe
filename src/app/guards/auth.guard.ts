import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.authService.isAuthenticated;
    const isAuthPath = state.url.search(/\/login|\/signup/gi) >= 0;

    if (isAuthenticated && isAuthPath) {
      return this.router.createUrlTree(route.parent.url);
    }

    if (!isAuthenticated && !isAuthPath) {
      return this.router.createUrlTree(['/login']);
    }

    return true;
  }

}
