import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';

import { PostsApiService } from '../api/posts-api.service';
import { Post } from '../posts/interfaces/post';
import { LoaderService } from './loader.service';

@Injectable({ providedIn: 'root' })
export class PostsService {

  private postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject([]);
  posts$: Observable<Post[]> = this.postsSubject.asObservable();
  get posts(): Post[] {
    return this.postsSubject.value;
  }

  constructor(
    private postsApi: PostsApiService,
    private router: Router,
    private loaderService: LoaderService,
  ) { }

  fetchPosts(): void {
    this.postsApi.getPostsList().subscribe((postsList) => {
      this.loaderService.isLoading$.next(false);
      this.postsSubject.next(postsList.map(post => ({
        ...post,
        imagePath: post.imagePath,
      })));
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
      this.postsSubject.next(this.posts.filter(p => p.id !== id));
    });
  };

  private navigateToHome(): void {
    this.router.navigate(['/']);
  }

}
