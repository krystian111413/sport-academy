import {Component, Input, OnInit} from '@angular/core';
import {Notification} from '../../../../models/notifiaction';

@Component({
  selector: 'notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent implements OnInit {
  @Input() notificationItem: Notification;
  constructor() { }

  ngOnInit() {
  }

}
