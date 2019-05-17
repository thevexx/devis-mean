import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/shared/admin.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {

  message;
  adminsList;
  selectedAdmin: any;
  userForm: FormGroup;
  constructor(private modalService: NgbModal, private adminService: AdminService) {
    this.userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [])
    });
  }

  ngOnInit() {
    this.adminService.getListAdmins().subscribe((data: any) => {
      this.adminsList = data.data;
      console.log(data);

      this.adminService.adminsList = data.data;
    });
  }

  openModal(modal) {
    this.modalService.open(modal, { size: 'lg' });
  }

  addAdmin(form: any) {
    console.log(form.value);
    if (form.valid) {
      form.value['role'] = 'admin';
      this.adminService.addAdmin(form.value).subscribe((res: any) => {
        console.log(res);
        this.message = res.msg;
        this.ngOnInit();
      });
    }
  }

  updateAdmin(form) {
    delete form.value.password;
    console.log(form.value);
    if (form.valid) {
      this.adminService.updateAdmin(form.value, this.selectedAdmin._id)
        .subscribe((res: any) => {
          console.log(res);
          this.message = res.msg;
          this.ngOnInit();
        });
    }
  }

  selectAdmin(admin) {
    this.selectedAdmin = admin;
    console.log(admin);
    this.userForm.controls.name.setValue(this.selectedAdmin.name);
    this.userForm.controls.lastname.setValue(this.selectedAdmin.lastname);
    this.userForm.controls.email.setValue(this.selectedAdmin.email);
    this.userForm.controls.password.setValue(this.selectedAdmin.email);
  }


}
