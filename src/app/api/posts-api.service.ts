import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../posts/interfaces/post';

@Injectable({ providedIn: 'root' })
export class PostsApiService {

  private url = 'http://localhost:3000/api/posts';

  constructor(private http: HttpClient) { }

  getPostsList(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`);
  }

  addPost(post: Post): Observable<string> {
    return this.http.post<string>(this.url, post);
  }

  patchPost(post: Post): Observable<void> {
    return this.http.patch<void>(`${this.url}/${post._id}`, post);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
