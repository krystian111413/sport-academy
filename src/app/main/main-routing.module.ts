import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';


const routes: Routes = [
  {
    path: 'employees',
    component: MainComponent,
    loadChildren: () => import('./employees/employees.module').then(value => value.EmployeesModule),
    data: {
      breadcrumb: 'pracownicy'
    },
  },
  {
    path: '**',
    redirectTo: 'employees'
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
