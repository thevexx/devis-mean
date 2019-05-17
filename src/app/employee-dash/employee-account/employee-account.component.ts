import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-account',
  templateUrl: './employee-account.component.html',
  styleUrls: ['./employee-account.component.css']
})
export class EmployeeAccountComponent implements OnInit {
  userForm: FormGroup;
  passwordForm: FormGroup;
  user;
  messagePassword;
  messageUser;
  messagePasswordRepeat;
  constructor(private employeeService: EmployeeService) {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
    });
    this.passwordForm = new FormGroup({
      old: new FormControl('', [Validators.required]),
      new: new FormControl('', [Validators.required]),
      repeat: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.employeeService.decodeToken();
    this.employeeService.getEmployeeById(this.employeeService.employeeId).subscribe((data: any) => {
      console.log(data.data);
      this.user = data.data;
      this.userForm.controls.name.setValue(data.data.user.name);
      this.userForm.controls.lastname.setValue(data.data.user.lastname);
      this.userForm.controls.email.setValue(data.data.user.email);
      this.userForm.controls.tel.setValue(data.data.tel);
      this.userForm.controls.address.setValue(data.data.address);
      this.userForm.controls.skills.setValue(data.data.skills);
    });
  }

  updateUserBtn() {
    if (this.userForm.valid) {
      const userData = {
        name: this.userForm.value.name,
        lastname: this.userForm.value.lastname,
        email: this.userForm.value.email,
        _id: this.user.user._id
      };
      const employeeData = {
        user: userData,
        _id: this.user._id,
        skills: this.userForm.value.skills,
        tel: this.userForm.value.tel,
        address: this.userForm.value.address
      }
      this.employeeService.updateEmployeeById(employeeData, this.user._id).subscribe((data: any) => {
        console.log(data);
        this.messageUser = data.msg;
      });
    }
  }
  updatePasswordBtn() {
    if (this.passwordForm.valid) {
      if (this.passwordForm.value.new === this.passwordForm.value.repeat) {
        this.employeeService.updateUserPasswordById(this.passwordForm.value, this.user.user._id).subscribe((data: any) => {
          console.log(data);
          this.messagePassword = data.msg;
        });
      } else {
        this.messagePasswordRepeat = 'Mot de passe n\'nest pas identique !';
      }
    }
  }

}
