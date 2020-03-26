import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Notification} from '../models/notifiaction';
import {CrudService} from '../../core/crud/services/crud.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationEmployeesService extends CrudService<Notification, undefined> {

  constructor(restService: HttpClient) {
    super(restService, 'api/v1/notifications');
  }

}
