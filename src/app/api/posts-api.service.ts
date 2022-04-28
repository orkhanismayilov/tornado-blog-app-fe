import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Post, PostsListResponse } from '../posts/interfaces/post';

@Injectable({ providedIn: 'root' })
export class PostsApiService {

  private url = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) { }

  getPostsList(limit: number = 5, page: number = 1): Observable<PostsListResponse> {
    const params = { limit, page }
    return this.http.get<PostsListResponse>(this.url, { params });
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`);
  }

  addPost(data: Post | FormData): Observable<Post> {
    return this.http.post<Post>(this.url, data);
  }

  patchPost(id: string, data: Post | FormData): Observable<void> {
    return this.http.patch<void>(`${this.url}/${id}`, data);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
