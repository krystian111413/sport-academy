import {Component, OnInit} from '@angular/core';
import {Notification} from '../../../models/notifiaction';
import {NotificationEmployeesService} from '../../../services/notification-employees.service';
import {timer} from 'rxjs';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];
  scheduler = timer(1000, 30000);

  constructor(private employeesService: NotificationEmployeesService) {
  }

  ngOnInit(): void {
    this.downloadData();
    this.scheduler.subscribe(value => {
      this.downloadData();
    });
  }

  downloadData() {
    this.employeesService.getAll().subscribe(value => this.notifications = value);
  }

  getNotificationUncheckedCount(): number {
    return this.notifications.filter(value => value.checked === false).length
  }
}
