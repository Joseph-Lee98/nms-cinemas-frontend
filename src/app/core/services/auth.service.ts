import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl =
    'http://ec2-18-212-61-231.compute-1.amazonaws.com:8081/users';
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  isLoggedIn$ = this.currentUser$.pipe(map((user) => !!user));

  isAdmin$ = this.currentUser$.pipe(map((user) => user?.role === 'ADMIN'));

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'ADMIN';
  }

  isUser(): boolean {
    return this.currentUserSubject.value?.role === 'USER';
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }

  registerUser(name: string, email: string, password: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/register`, { name, email, password })
      .pipe(
        tap((user) => {
          this.currentUserSubject.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password }).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
        localStorage.setItem('user', JSON.stringify(user));
      })
    );
  }

  loadUserFromStorage(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }
}
