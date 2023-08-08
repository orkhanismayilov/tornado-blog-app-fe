import { Route } from '@angular/router';
import { environment } from '@tba/env';
import { NotFoundComponent } from '@tba/shared';

import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { authGuard } from '@tba/guards';

export const APP_ROUTES: Route[] = [
  {
    path: '',
    component: PostsListComponent,
    pathMatch: 'full',
    title: environment.appName,
  },
  {
    path: 'login',
    loadComponent: () => import('./auth').then(m => m.LoginComponent),
    canActivate: [authGuard],
    title: `Login - ${environment.appName}`,
  },
  {
    path: 'signup',
    loadComponent: () => import('./auth').then(m => m.SignupComponent),
    canActivate: [authGuard],
    title: `Sign Up - ${environment.appName}`,
  },
  { path: 'posts', loadChildren: () => import('./posts').then(m => m.POSTS_ROUTES) },
  { path: '404', component: NotFoundComponent, title: `404 Not Found - ${environment.appName}` },
  { path: '**', redirectTo: '404' },
];
