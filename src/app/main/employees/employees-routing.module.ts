import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesGeneralComponent} from "./components/employees-general/employees-general.component";
import {EmployeesDetailsComponent} from "./components/employees-details/employees-details.component";
import {EmployeesAddComponent} from './components/employees-add/employees-add.component';


const routes: Routes = [
  {
    path: 'add',
    component: EmployeesAddComponent,
    data: {
      breadcrumb: 'dodaj'
    }
  },
  {
    path: ':id',
    component: EmployeesDetailsComponent,
    data: {
      breadcrumb: 'detale'
    }
  },
  {
    path: '',
    component: EmployeesGeneralComponent,
    data: {
      breadcrumb: 'pracownicy'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {
}
