import {Component, Input, OnInit} from '@angular/core';
import {ColDef} from "ag-grid-community";
import {EmployeesService} from "../../../services/employees.service";
import {Employee} from "../../../models/employee";
import {Router} from "@angular/router";

@Component({
  selector: 'employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  @Input() employees: Employee[];
  columns: ColDef[] = [];
  private employeesListColumnsConfig: ColDef[] = [
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

    },{
      field: 'surname',
      headerName: 'Surname',
      headerTooltip: 'Surname',
      sortable: true,
      filter: true,
      resizable: true
    },{
      field: 'city',
      headerName: 'City',
      headerTooltip: 'City',
      sortable: true,
      filter: true,
      resizable: true
    },{
      field: 'age',
      headerName: 'Age',
      headerTooltip: 'Age',
      sortable: true,
      filter: true,
      resizable: true
    },{
      field: 'pesel',
      headerName: 'Pesel',
      headerTooltip: 'Pesel',
      sortable: true,
      filter: true,
      resizable: true
    },
  ];

  constructor(private employeesService: EmployeesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.columns = this.employeesListColumnsConfig;
    this.employeesService.getAll().subscribe(employees => {
      this.employees = employees;
    })
  }


}
