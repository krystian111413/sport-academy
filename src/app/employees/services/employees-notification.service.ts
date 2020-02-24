import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeesNotificationService {

  constructor(private restService: HttpClient) { }

  getAll(): Observable<Notification[]> {
    return this.restService.get<Notification[]>('assets/notifications.json');
  }
}
