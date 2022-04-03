import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { PostsApiService } from '../api/posts-api.service';

import { Post } from '../posts/interfaces/post';

@Injectable({ providedIn: 'root' })
export class PostsService {

  private postsSubject: BehaviorSubject<Post[]> = new BehaviorSubject([]);
  posts$: Observable<Post[]> = this.postsSubject.asObservable();
  get posts(): Post[] {
    return this.postsSubject.value;
  }

  constructor(private postsApi: PostsApiService) { }

  fetchPosts(): void {
    this.postsApi.getPostsList().subscribe((postsList) => this.postsSubject.next(postsList));
  }

  addPost(post: Post): void {
    this.postsApi.addPost(post).subscribe((postId) => {
      this.postsSubject.next([
        ...this.posts,
        {
          ...post,
          _id: postId,
        },
      ]);
    });
  }

  deletePost(id: string): void {
    this.postsApi.deletePost(id).subscribe(() => {
      this.postsSubject.next(this.posts.filter(p => p._id !== id));
    });
  };

}
