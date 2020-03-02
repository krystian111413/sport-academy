import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../../login/services/login.service';

@Component({
  selector: 'profiler',
  templateUrl: './profiler.component.html',
  styleUrls: ['./profiler.component.scss']
})
export class ProfilerComponent {

  constructor(private loginService: LoginService) { }

  logout(): void {
    this.loginService.logout();
  }
}
