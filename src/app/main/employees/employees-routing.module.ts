import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesGeneralComponent} from "./components/employees-general/employees-general.component";
import {EmployeesDetailsComponent} from "./components/employees-details/employees-details.component";


const routes: Routes = [
  {
    path: ':id',
    component: EmployeesDetailsComponent,
    data: {
      breadcrumb: 'details'
    }
  },
  {
    path: '',
    component: EmployeesGeneralComponent,
    data: {
      breadcrumb: 'employees'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {
}
