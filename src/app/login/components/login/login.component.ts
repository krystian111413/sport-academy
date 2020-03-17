import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(formBuilder: FormBuilder,
              private loginService: LoginService,
              private toastrService: ToastrService) {
    this.loginForm = formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  requestToLogin(): void {
    this.loginService.login(this.loginForm.value).subscribe(value => {
      this.loginService.onloginSuccessful(this.loginForm.value);
    },error => {
      this.toastrService.error('Zły login lub hasło!')
    });
  }
}
