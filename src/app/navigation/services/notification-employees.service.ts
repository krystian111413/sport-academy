import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Notification} from '../models/notifiaction';
import * as data from '../../../assets/notifications.json';

@Injectable({
  providedIn: 'root'
})
export class NotificationEmployeesService {

  constructor(private restService: HttpClient) { }

  getAll(): Observable<Notification[]> {
    return new Observable<Notification[]>(subscriber => {
      subscriber.next([
        {
          id: '5e70cf2e87574c0c57e3b335',
          description: 'Kończy się okres umowy',
          name: 'Jan',
          surname: 'Kowalski',
          city: 'Radom',
          wasClicked: false
        },
        {
          id: '5e70cf2e87574c0c57e3b335',
          description: 'Kończy się okres umowy',
          name: 'Jan',
          surname: 'Kowalski',
          city: 'Radom',
          wasClicked: true
        },
        {
          id: '5e70cf2e87574c0c57e3b335',
          description: 'Kończy się okres umowy',
          name: 'Jan',
          surname: 'Kowalski',
          city: 'Radom',
          wasClicked: true
        }
      ]);
      subscriber.complete();
    })
  }
}
