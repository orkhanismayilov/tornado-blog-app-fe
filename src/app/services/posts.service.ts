import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Post } from '../posts/interfaces/post';

@Injectable({ providedIn: 'root' })
export class PostsService {

  private _posts$: BehaviorSubject<Post[]> = new BehaviorSubject([]);
  get posts(): Post[] {
    return this._posts$.value;
  }
  get posts$(): Observable<Post[]> {
    return this._posts$.asObservable();
  }

  addPost(post: Post): void {
    this._posts$.next([
      ...this.posts,
      post,
    ]);
  }

}
