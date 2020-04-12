import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './login/guards/auth.guard';


const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(value => value.MainModule),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    data: {
    },
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(value => value.LoginModule)
  },
  {
    path: '**',
    redirectTo: '/main/employees'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
