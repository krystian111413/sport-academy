import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesListComponent } from './components/employees-general/employees-list/employees-list.component';
import {AgListModule} from "../shared/ag-list/ag-list.module";
import {MatIconModule} from "@angular/material/icon";
import { EmployeesNotifierComponent } from './components/employees-general/employees-notifier/employees-notifier.component';
import { EmployeesGeneralComponent } from './components/employees-general/employees-general.component';
import { EmployeesDetailsComponent } from './components/employees-details/employees-details.component';
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [EmployeesListComponent, EmployeesNotifierComponent, EmployeesGeneralComponent, EmployeesDetailsComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    AgListModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class EmployeesModule { }
