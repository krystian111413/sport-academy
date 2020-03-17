import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {RestService} from '../../core/services/rest/rest.service';
import {AxiosRequestConfig} from 'axios';

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
              private restService: RestService) {
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.SESSION_KEY);
  }

  getUser(): LoginForm {
    return JSON.parse(sessionStorage.getItem(this.SESSION_KEY));
  }

  login(loginForm: LoginForm) {
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(loginForm));
    this.router.navigateByUrl('/');

  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
