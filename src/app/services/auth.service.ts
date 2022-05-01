import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, map, Observable, Subscription, timer } from 'rxjs';

import {
  AuthData,
  AuthResponse,
  SignUpData,
  User,
} from '../auth/interfaces/user';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private url = 'http://localhost:3000/api/auth';
  private tokenStorageKey = 'tornado_auth_token';
  private userStorageKey = 'tornado_user';
  private expiration$: Subscription;

  get token(): string {
    const token = localStorage.getItem(this.tokenStorageKey);
    return token || null;
  }

  private isAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject(!!this.token);
  get isAuthenticated$(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }
  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  get userData(): User {
    const user = JSON.parse(localStorage.getItem(this.userStorageKey));
    return user;
  }
  get userInitials(): string {
    const user = this.userData;
    return `${user.firstName.charAt(0).toUpperCase()}${user.lastName.charAt(0).toUpperCase()}`;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }

  signUp(data: SignUpData): Observable<void> {
    return this.http.post<void>(`${this.url}/signup`, data);
  }

  login(data: AuthData): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.url}/login`, data).pipe(
      map(({ user, token, expiresIn }) => {
        this.setUser(user);
        this.setToken(token);
        this.setExpirationTimer(expiresIn);
        this.isAuthenticatedSubject.next(true);
        return null;
      }),
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenStorageKey);
    localStorage.removeItem(this.userStorageKey);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/']);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenStorageKey, token);
  }

  private setUser(user: User): void {
    localStorage.setItem(this.userStorageKey, JSON.stringify(user));
  }

  private setExpirationTimer(expiresIn: number): void {
    this.expiration$?.unsubscribe();
    this.expiration$ = timer(expiresIn * 1000).subscribe(() => {
      this.logout();
      this.expiration$.unsubscribe();
    });
  }

}
