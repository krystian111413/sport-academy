import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {LoginService} from '../../login/services/login.service';
import {environment} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.loginService.isLoggedIn()) {
      let user = this.loginService.getUser();
      req = req.clone({
        setHeaders: {
          Authorization: btoa(`${user.login}&${user.password}`)
        }
      })
    }
    req = req.clone({
      url: environment.apiUrl + req.url
    });

    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if (err.error.message === '401 UNAUTHORIZED') {
        this.loginService.logout();
      }
      return throwError(err)
    }));
  }


}
