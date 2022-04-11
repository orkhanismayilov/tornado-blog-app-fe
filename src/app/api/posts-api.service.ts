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

  addPost(post: Post): Observable<Post> {
    const data = new FormData();
    for (const [key, value] of Object.entries(post)) {
      if (key === 'image') {
        data.append(key, value, this.normalizeFileName(post.title));
        break;
      }
      data.append(key, value);
    }
    return this.http.post<Post>(this.url, data);
  }

  patchPost(post: Post): Observable<void> {
    return this.http.patch<void>(`${this.url}/${post.id}`, post);
  }

  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  private normalizeFileName(title: string): string {
    return title.toLowerCase().replace(/(\s|\/|\\)+/gm, '-');
  }

}
