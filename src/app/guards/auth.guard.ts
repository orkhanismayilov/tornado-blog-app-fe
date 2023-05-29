import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@tba/services';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated;
  const isAuthPath = state.url.search(/\/login|\/signup/gi) >= 0;

  if (isAuthenticated && isAuthPath) {
    return router.createUrlTree(route.parent.url);
  }

  if (!isAuthenticated && !isAuthPath) {
    return router.parseUrl('/login');
  }

  return true;
};
