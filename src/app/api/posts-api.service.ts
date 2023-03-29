import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment as env } from 'src/environments/environment';

import { Post, PostsListResponse } from '../posts/interfaces/post.interface';

@Injectable({ providedIn: 'root' })
export class PostsApiService {
  constructor(private http: HttpClient) {}

  getPostsList(
    limit: number = 5,
    page: number = 1,
  ): Observable<PostsListResponse> {
    const params = { limit, page };
    return this.http.get<PostsListResponse>(env.api.posts, { params });
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${env.api.posts}/${id}`);
  }

  addPost(data: Post | FormData): Observable<Post> {
    return this.http.post<Post>(env.api.posts, data);
  }

  patchPost(id: string, data: Post | FormData): Observable<void> {
    return this.http.patch<void>(`${env.api.posts}/${id}`, data);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${env.api.posts}/${id}`);
  }
}
