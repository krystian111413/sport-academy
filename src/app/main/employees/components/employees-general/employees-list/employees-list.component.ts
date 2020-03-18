import {Component, Input, OnInit} from '@angular/core';
import {ColDef} from "ag-grid-community";
import {EmployeesService} from "../../../services/employees.service";
import {Employee} from "../../../models/employee";
import {Router} from "@angular/router";
import {AgFilterTypes} from '../../../../../shared/ag-list/ag-list/ag-list.component';
import {GridDateComperator} from '../../../../../shared/date-utils/grid-date-comperator';

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
      field: 'firstName',
      headerName: 'Imie',
      headerTooltip: 'Imie',
      sortable: true,
      filter: true,
      resizable: true,
      onCellClicked: event => {
        this.router.navigateByUrl(`/main/employees/${event.data.id}`);
      },
      cellRenderer: params => {
        return `<a style="color: dodgerblue; cursor: pointer">${params.value}</a>`;
      }

    },{
      field: 'surName',
      headerName: 'Nazwisko',
      headerTooltip: 'Nazwisko',
      sortable: true,
      filter: true,
      resizable: true
    },{
      field: `city`,
      headerName: 'Miasto',
      headerTooltip: 'Miasto',
      sortable: true,
      filter: true,
      resizable: true
    },{
      field: `dealEndDate`,
      headerName: 'Data końca umowy',
      headerTooltip: 'Data końca umowy',
      sortable: true,
      filter: AgFilterTypes.date,
      filterParams: {
        comparator(filterLocalDateAtMidnight: string, cellValue: any): number {
          return GridDateComperator.dateComparator(cellValue, filterLocalDateAtMidnight);
        }
      },
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
