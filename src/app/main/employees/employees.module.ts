import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeesRoutingModule} from './employees-routing.module';
import {EmployeesListComponent} from './components/employees-general/employees-list/employees-list.component';
import {AgListModule} from '../../shared/ag-list/ag-list.module';
import {MatIconModule} from '@angular/material/icon';
import {EmployeesGeneralComponent} from './components/employees-general/employees-general.component';
import {EmployeesDetailsComponent} from './components/employees-details/employees-details.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {DatePickerModule} from '../../shared/date-picker/date-picker.module';
import {MatSelectModule} from '@angular/material';
import {EmployeesAddComponent} from './components/employees-add/employees-add.component';


@NgModule({
  declarations: [EmployeesListComponent, EmployeesGeneralComponent, EmployeesDetailsComponent, EmployeesAddComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    AgListModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    DatePickerModule,
    MatSelectModule
  ]
})
export class EmployeesModule { }