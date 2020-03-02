import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

export interface LoginForm {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  SESSION_KEY = 'USER_SESSION';

  constructor(private router: Router) {
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem(this.SESSION_KEY);
  }

  login(loginForm: LoginForm) {
    this.router.navigateByUrl('/');
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(loginForm));
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
