import { Component, OnInit } from '@angular/core';
import {Notification} from '../../../models/notifiaction';
import {NotificationEmployeesService} from '../../../services/notification-employees.service';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];

  constructor(private employeesService: NotificationEmployeesService) { }

  ngOnInit(): void {
    this.downloadData();
  }

  private downloadData() {
    this.employeesService.getAll().subscribe(value => this.notifications = value);
  }
}
