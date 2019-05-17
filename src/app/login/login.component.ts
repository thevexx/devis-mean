import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { AdminService } from '../shared/admin.service';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  message = '';
  submitted = false;
  constructor(private adminService: AdminService,
    private employeeService: EmployeeService,
    private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
  }

  loginBtn() {
    this.submitted = true;
    this.message = '';
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe((data: any) => {
        if (data.msg === 'OK') {
          const tokenData = jwt_decode(data.data.token);
          console.log(tokenData);
          localStorage.setItem('token', data.data.token);
          if (tokenData.data.role === "employee") {
            this.employeeService.employeeId = tokenData.data._id;
            this.router.navigateByUrl('/employees');
          }
          if (tokenData.data.role === 'admin') {
            this.adminService.adminId = tokenData.data._id;
            this.router.navigateByUrl('/dashboard');
          }
        } else {
          this.message = data.msg;
        }
      });
    }
  }

}
