import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {RestService} from '../../core/services/rest/rest.service';
import {AxiosRequestConfig} from 'axios';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface LoginForm {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  SESSION_KEY = 'USER_SESSION';

  constructor(private router: Router,
              private httpClient: HttpClient) {
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.SESSION_KEY);
  }

  getUser(): LoginForm {
    return JSON.parse(sessionStorage.getItem(this.SESSION_KEY));
  }

  login(loginForm: LoginForm): Observable<void> {
    return this.httpClient.post<void>('api/v1/auth', loginForm);
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

  onloginSuccessful(loginForm: LoginForm): void {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(loginForm));
    this.router.navigateByUrl('/');
  }
}
