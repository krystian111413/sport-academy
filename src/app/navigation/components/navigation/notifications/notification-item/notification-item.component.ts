import {Component, Input, OnInit} from '@angular/core';
import {Notification} from '../../../../models/notifiaction';
import {NotificationEmployeesService} from '../../../../services/notification-employees.service';

@Component({
  selector: 'notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {
  @Input() notificationItem: Notification;
  constructor(private notificationEmployeesService: NotificationEmployeesService) { }

  ngOnInit() {
  }

  setNotificationAsClicked(id: string) {
    this.notificationItem.checked = true;
    this.notificationEmployeesService.update(id, this.notificationItem).subscribe();
  }
}
