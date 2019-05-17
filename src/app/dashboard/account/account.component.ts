import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/employee.service';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userForm: FormGroup;
  passwordForm: FormGroup;
  user;
  messagePassword;
  messageUser;
  messagePasswordRepeat;
  constructor(private adminService: AdminService) {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required])
    });
    this.passwordForm = new FormGroup({
      old: new FormControl('', [Validators.required]),
      new: new FormControl('', [Validators.required]),
      repeat: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.adminService.decodeToken();
    this.adminService.getAdminById(this.adminService.adminId).subscribe((data: any) => {
      console.log(data.data);
      this.user = data.data;
      this.userForm.controls.name.setValue(data.data.name);
      this.userForm.controls.lastname.setValue(data.data.lastname);
      this.userForm.controls.email.setValue(data.data.email);
    });
  }

  updateUserBtn() {
    console.log(this.userForm.value)
    if (this.userForm.valid) {
      const userData = {
        name: this.userForm.value.name,
        lastname: this.userForm.value.lastname,
        email: this.userForm.value.email,
        _id: this.user._id
      };

      this.adminService.updateAdmin(userData, this.user._id).subscribe((data: any) => {
        console.log(data);
        this.messageUser = data.msg;
      });
    }
  }
  updatePasswordBtn() {
    if (this.passwordForm.valid) {
      if (this.passwordForm.value.new === this.passwordForm.value.repeat) {
        this.adminService.updateUserPasswordById(this.passwordForm.value, this.user._id).subscribe((data: any) => {
          console.log(data);
          this.messagePassword = data.msg;
        });
      } else {
        this.messagePasswordRepeat = 'Mot de passe n\'nest pas identique !';
      }
    }
  }

}
