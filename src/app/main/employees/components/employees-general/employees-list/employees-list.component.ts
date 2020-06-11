import {Component, Input, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {EmployeesService} from '../../../services/employees.service';
import {Employee} from '../../../models/employee';
import {Router} from '@angular/router';
import {AgFilterTypes} from '../../../../../shared/ag-list/ag-list/ag-list.component';
import {GridDateComperator} from '../../../../../shared/date-utils/grid-date-comperator';
import {ConfirmDialogService} from '../../../../../shared/confirm-dialog/services/confirm-dialog.service';
import {ToastrService} from 'ngx-toastr';

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
      minWidth: 100,
      onCellClicked: event => {
        this.router.navigateByUrl(`/main/employees/${event.data.id}`);
      },
      cellRenderer: params => {
        return `<a style="color: dodgerblue; cursor: pointer">${params.value}</a>`;
      }

    }, {
      field: 'surName',
      headerName: 'Nazwisko',
      headerTooltip: 'Nazwisko',
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100
    }, {
      field: `city`,
      headerName: 'Miasto',
      headerTooltip: 'Miasto',
      sortable: true,
      filter: true,
      resizable: true,
      minWidth: 100
    }, {
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
      resizable: true,
      minWidth: 100
    }, {
      field: 'id',
      headerName: '',
      cellRenderer: params => {
        return `<i class="fa fa-trash"></i>`;
      },
      cellStyle: {
        cursor: 'pointer',
        'font-size': 'xx-large'
      },
      onCellClicked: event => {
        this.onDelete(event.value);
      },
      minWidth: 100
    }
  ];

  constructor(private employeesService: EmployeesService,
              private router: Router,
              private confirmDialogService: ConfirmDialogService,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    this.columns = this.employeesListColumnsConfig;
    this.loadData();
  }

  private loadData() {
    this.employeesService.getAll().subscribe(employees => {
      this.employees = employees;
    }, error => {
      this.employees = [];
      this.toastrService.error("Problem z załadowaniem pracowników");
    });
  }

  onDelete(id: string): void {
    this.confirmDialogService.open({message: 'Czy na pewno chesz usunąć pracownika?'}).subscribe(value => {
      if (value) {
        this.employeesService.deleteInstance(id).subscribe(value => {
          if (value) {
            this.toastrService.success("Pracownik usunięty");
            this.loadData();
          } else {
            this.toastrService.warning("Nie można usunąć pracownika");
          }
        });
      }
    });

  }

}
