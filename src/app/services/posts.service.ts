import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { PostsApiService } from '../api/posts-api.service';
import { PaginatorConfig } from '../posts/interfaces/paginator';
import { Post, PostsListResponse } from '../posts/interfaces/post';
import { LoaderService } from './loader.service';

@Injectable({ providedIn: 'root' })
export class PostsService {

  private postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject([]);
  posts$: Observable<Post[]> = this.postsSubject.asObservable();
  get posts(): Post[] {
    return this.postsSubject.value;
  }

  private paginatorConfigSubject: BehaviorSubject<PaginatorConfig> = new BehaviorSubject({
    limit: 5,
    limitOptions: [2, 5, 10],
    currentPage: 1,
    total: 0,
  });
  paginatorConfig$: Observable<PaginatorConfig> = this.paginatorConfigSubject.asObservable();
  set paginatorConfig(config: Partial<PaginatorConfig>) {
    this.paginatorConfigSubject.next({
      ...this.paginatorConfig,
      ...config,
    });
  }
  get paginatorConfig(): PaginatorConfig {
    return this.paginatorConfigSubject.value;
  }

  constructor(
    private postsApi: PostsApiService,
    private router: Router,
    private loaderService: LoaderService,
  ) { }

  fetchPosts(limit: number = 5, page: number = 1): void {
    this.paginatorConfig = { limit, currentPage: page };
    this.postsApi.getPostsList(limit, page).subscribe((res: PostsListResponse) => {
      this.loaderService.isLoading$.next(false);
      this.postsSubject.next(res.data.map(post => ({
        ...post,
        imagePath: post.imagePath,
      })));
      this.paginatorConfigSubject.next({
        ...this.paginatorConfigSubject.value,
        total: res.total,
      });
    });
  }

  addPost(post: Post): void {
    this.postsApi.addPost(post).subscribe((post) => {
      this.loaderService.isLoading$.next(false);
      this.postsSubject.next([
        ...this.posts,
        post,
      ]);
      this.navigateToHome();
    });
  }

  patchPost(post: Post): void {
    this.postsApi.patchPost(post).subscribe(() => {
      this.loaderService.isLoading$.next(false);
      this.navigateToHome();
    });
  }

  deletePost(id: string): void {
    this.postsApi.deletePost(id).subscribe(() => {
      this.fetchPosts(
        this.paginatorConfig.limit,
        this.paginatorConfig.currentPage,
      );
    });
  };

  private navigateToHome(): void {
    this.router.navigate(['/']);
  }

}
