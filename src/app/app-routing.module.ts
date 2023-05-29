import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { environment } from 'src/environments/environment';

import { authGuard } from './guards';
import { PostComponent, PostEditorComponent, PostsListComponent } from './posts';
import { NotFoundComponent } from './shared';

const routes: Routes = [
  { path: '', component: PostsListComponent, pathMatch: 'full', title: environment.appName },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'create',
    component: PostEditorComponent,
    canActivate: [authGuard],
    title: `Create Post - ${environment.appName}`,
  },
  {
    path: 'edit/:id',
    component: PostEditorComponent,
    canActivate: [authGuard],
  },
  { path: 'posts/:id', component: PostComponent },
  { path: '404', component: NotFoundComponent, title: `404 Not Found - ${environment.appName}` },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
