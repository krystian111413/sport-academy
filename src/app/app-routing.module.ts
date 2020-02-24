import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then(value => value.EmployeesModule),
    data: {
      breadcrumb: 'employees'
    },
  },
  {
    path: '**',
    redirectTo: 'employees'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
