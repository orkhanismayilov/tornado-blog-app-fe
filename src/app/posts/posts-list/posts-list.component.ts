import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { Observable, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { PostsService } from 'src/app/services/posts.service';
import { AbstractComponent } from 'src/app/shared/components/abstract.component';

import { PaginatorConfig } from '../interfaces/paginator';
import { Post } from '../interfaces/post';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.less']
})
export class PostsListComponent extends AbstractComponent implements OnInit {

  posts$: Observable<Post[]>;
  paginatorConfig: PaginatorConfig;

  get isAuthorized$(): Observable<boolean> {
    return this.authService.isAuthorized$;
  }

  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    public loaderService: LoaderService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.loaderService.isLoading$.next(true);
    this.postsService.fetchPosts();
    this.posts$ = this.postsService.posts$.pipe(
      takeUntil(this.destroyed$),
    );
    this.postsService.paginatorConfig$.pipe(
      takeUntil(this.destroyed$),
    ).subscribe(config => this.paginatorConfig = config);
  }

  onDeletePost(id: string) {
    this.postsService.deletePost(id);
  }

  onPageNavigate(event: PageEvent) {
    const { pageSize: limit, pageIndex: page } = event;
    this.postsService.fetchPosts(limit, page + 1);
  }

}
