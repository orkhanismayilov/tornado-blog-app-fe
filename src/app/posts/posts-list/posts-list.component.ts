import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { AuthService, LoaderService, PostsService } from '@tba/services';
import { AbstractComponent } from '@tba/shared';

import { Observable, takeUntil } from 'rxjs';

import { PaginatorConfig, Post } from '../interfaces';
import { ExcerptPipe } from '../pipes/excerpt.pipe';
import { PostDatePipe } from '../pipes/post-date.pipe';
import { PostActionsComponent } from '../post-actions/post-actions.component';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.less'],
  standalone: true,
  imports: [
    NgIf,
    MatProgressSpinnerModule,
    NgFor,
    MatCardModule,
    RouterLink,
    PostActionsComponent,
    AsyncPipe,
    PostDatePipe,
    ExcerptPipe,
  ],
})
export class PostsListComponent extends AbstractComponent implements OnInit {
  posts$: Observable<Post[]>;
  paginatorConfig: PaginatorConfig;

  get isAuthenticated$(): Observable<boolean> {
    return this.authService.isAuthenticated$;
  }
  get userId(): string {
    return this.authService.userData.id;
  }

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    public loaderService: LoaderService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.loaderService.isLoading = true;
    this.postsService.fetchPosts();
    this.posts$ = this.postsService.posts$.pipe(takeUntil(this.destroyed$));
    this.postsService.paginatorConfig$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(config => (this.paginatorConfig = config));
  }

  onPageNavigate(event: PageEvent) {
    const { pageSize: limit, pageIndex: page } = event;
    this.postsService.fetchPosts(limit, page + 1);
  }
}
