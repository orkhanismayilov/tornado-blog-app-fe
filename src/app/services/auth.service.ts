import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { AuthData, AuthResponse, SignUpData } from '../auth/interfaces/user';
import { LoaderService } from './loader.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private url = 'http://localhost:3000/api/auth';

  constructor(
    private http: HttpClient,
    private loaderService: LoaderService,
  ) { }

  signUp(data: SignUpData): Observable<void> {
    return this.http.post<void>(`${this.url}/signup`, data);
  }

  login(data: AuthData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/login`, data);
  }

}
