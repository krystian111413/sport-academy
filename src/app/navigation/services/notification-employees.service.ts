import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../models/notifiaction';

@Injectable({
  providedIn: 'root'
})
export class NotificationEmployeesService {

  constructor(private restService: HttpClient) { }

  getAll(): Observable<Notification[]> {
    return this.restService.get<Notification[]>('assets/notifications.json');
  }
}
