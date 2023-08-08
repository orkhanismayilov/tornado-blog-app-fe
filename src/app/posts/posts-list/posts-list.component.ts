import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AuthService, LoaderService, PostsService } from '@tba/services';
import { AbstractComponent } from '@tba/shared';

import { Observable, takeUntil } from 'rxjs';

import { PaginatorConfig, Post } from '../interfaces';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.less'],
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
