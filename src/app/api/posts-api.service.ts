import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../posts/interfaces/post';

@Injectable({ providedIn: 'root' })
export class PostsApiService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getPostsList(): Observable<Post[]> {
    const path = 'api/posts';
    return this.http.get<Post[]>(`${this.url}/${path}`);
  }

  addPost(post: Post): Observable<string> {
    const path = 'api/posts';
    return this.http.post<string>(`${this.url}/${path}`, post);
  }

  deletePost(id: string): Observable<void> {
    const path = 'api/posts';
    return this.http.delete<void>(`${this.url}/${path}/${id}`);
  }

}
