import {Injectable} from '@angular/core';
import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {environment} from 'src/environments/environment';
import {Observable} from 'rxjs';
import * as JSONbig from 'json-bigint';
import {CookieService} from "ngx-cookie-service";
import {SelectedProjectConfigurer} from "./selected-project-configurer";
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestService extends SelectedProjectConfigurer {

  private httpClient: AxiosInstance;

  constructor(cookieService: CookieService,
              private router: Router) {
    super(cookieService);
    this.createHttpClient();
  }

  protected createHttpClient(): void {
    this.httpClient = axios.create({
      baseURL: environment.apiUrl,
      timeout: environment.httpRequestTimeout,
      headers: {
        'Content-Type': 'application/json',
        'Project': this.selectedProjectName
      },
      transformResponse: [data => data.length ? JSONbig.parse(data) : '']
    });
  }

  public get<T>(path: string, config?: AxiosRequestConfig): Observable<T> {
    return new Observable<T>(subscriber => {
      this.httpClient.get<T>(path, config)
      .then(value => {
        subscriber.next(value.data)
      }).catch(reason => {
        subscriber.error('An error occurred while GET request');
      }).finally(() => {
        subscriber.complete();
      })
    })
  }

  public post<T>(path: string, body?: any, config?: AxiosRequestConfig): Observable<T> {
    return new Observable<T>(subscriber => {
      this.httpClient.post<T>(path, body, config)
      .then(value => {
        subscriber.next(value.data)
      }).catch(reason => {
        subscriber.error('An error occurred while POST request');
      }).finally(() => {
        subscriber.complete();
      })
    });
  }

  public put<T>(path: string, body?: any, config?: AxiosRequestConfig): Observable<T> {
    return new Observable<T>(subscriber => {
      this.httpClient.put<T>(path, body, config)
      .then(value => {
        subscriber.next(value.data)
      }).catch(reason => {
        subscriber.error('An error occurred while PUT request');
      }).finally(() => {
        subscriber.complete();
      })
    });
  }

  public patch<T>(path: string, body?: any, config?: AxiosRequestConfig): Observable<T> {
    return new Observable<T>(subscriber => {
      this.httpClient.patch<T>(path, body, config)
      .then(value => {
        subscriber.next(value.data)
      }).catch(reason => {
        subscriber.error('An error occurred while PATCH request');
      }).finally(() => {
        subscriber.complete();
      })
    });
  }

  public delete<T>(path: string, config?: AxiosRequestConfig): Observable<T> {
    return new Observable<T>(subscriber => {
      this.httpClient.delete<T>(path, config)
      .then(value => {
        subscriber.next(value.data)
      }).catch(reason => {
        subscriber.error('An error occurred while DELETE request');
      }).finally(() => {
        subscriber.complete();
      })
    });
  }

  public setRequestInterceptor(beforeRequest: (value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>): void {
    this.httpClient.interceptors.request.use(beforeRequest);
  }

  public setResponseInterceptor(onSuccess?: (value: AxiosResponse<any>) => AxiosResponse<any> | Promise<AxiosResponse<any>>, onError?: (error: any) => any): void {
    this.httpClient.interceptors.response.use(onSuccess, onError);
  }


}
