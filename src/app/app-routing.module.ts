import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { PostEditorComponent } from './posts/post-editor/post-editor.component';
import { PostComponent } from './posts/post/post.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: PostsListComponent, pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  { path: 'create', component: PostEditorComponent, canActivate: [AuthGuard] },
  {
    path: 'edit/:id',
    component: PostEditorComponent,
    canActivate: [AuthGuard],
  },
  { path: 'posts/:id', component: PostComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
