import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl =
    'http://ec2-18-212-61-231.compute-1.amazonaws.com:8081/users';
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }

  registerUser(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, {
      name,
      email,
      password,
    });
  }

  loginUser(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  loadUserFromStorage(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }
}
