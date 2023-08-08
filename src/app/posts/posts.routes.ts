import { Route } from '@angular/router';
import { environment } from '@tba/env';
import { authGuard } from '@tba/guards';

import { PostEditorComponent } from './post-editor/post-editor.component';
import { PostComponent } from './post/post.component';

export const POSTS_ROUTES: Route[] = [
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
  { path: ':id', component: PostComponent },
];
