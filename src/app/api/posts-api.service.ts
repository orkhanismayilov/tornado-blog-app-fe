import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@tba/env';
import { Post, PostsListResponse } from '@tba/posts';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostsApiService {
  constructor(private http: HttpClient) {}

  getPostsList(limit: number = 5, page: number = 1): Observable<PostsListResponse> {
    const params = { limit, page };
    return this.http.get<PostsListResponse>(env.api.posts, { params });
  }

  getPost(id: string, getRelated?: number): Observable<Post> {
    let params: HttpParams = null;
    if (getRelated) {
      params = new HttpParams().set('getRelated', getRelated);
    }
    return this.http.get<Post>(`${env.api.posts}/${id}`, { params });
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
