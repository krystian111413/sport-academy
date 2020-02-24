import {Component, Input, OnInit} from '@angular/core';
import {ColDef} from "ag-grid-community";
import {EmployeesNotificationService} from "../../../services/employees-notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'employees-notifier',
  templateUrl: './employees-notifier.component.html',
  styleUrls: ['./employees-notifier.component.scss']
})
export class EmployeesNotifierComponent implements OnInit {

  @Input() notifications: Notification[];
  columns: ColDef[] = [];
  private notificationListColumnsConfig: ColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      headerTooltip: 'Name',
      sortable: true,
      filter: true,
      resizable: true,
      onCellClicked: event => {
        this.router.navigateByUrl(`/employees/${event.data.id}`);
      },
      cellRenderer: params => {
        return `<a style="color: dodgerblue">${params.value}</a>`;
      }
    }, {
      field: 'surname',
      headerName: 'Surname',
      headerTooltip: 'Surname',
      sortable: true,
      filter: true,
      resizable: true
    }, {
      field: 'city',
      headerName: 'City',
      headerTooltip: 'City',
      sortable: true,
      filter: true,
      resizable: true
    }, {
      field: 'description',
      headerName: 'Description',
      headerTooltip: 'Description',
      sortable: true,
      filter: true,
      resizable: true
    },
  ];

  constructor(private employeesService: EmployeesNotificationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.columns = this.notificationListColumnsConfig;
    this.employeesService.getAll().subscribe(notifications => {
      this.notifications = notifications;
    })
  }
}
