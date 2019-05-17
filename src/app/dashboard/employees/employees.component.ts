import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../shared/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  message;
  employeesList;
  selectedEmployee: any;
  employeeForm: FormGroup;
  constructor(private modalService: NgbModal, private adminService: AdminService) {
    const userForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [])
    });
    this.employeeForm = new FormGroup({
      user: userForm,
      tel: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.max(99999999), Validators.min(10000000)]),
      address: new FormControl('', [Validators.required]),
      skills: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.adminService.getListEmployees().subscribe((data: any) => {
      this.employeesList = data.data;
      console.log(data);

      this.adminService.employeesList = data.data;
    });
  }

  openModal(modal) {
    this.modalService.open(modal, { size: 'lg' });
  }

  addEmployee(form: any) {
    console.log(form.value);
    if (form.valid) {
      form.value['user']['role'] = 'employee';
      this.adminService.addEmployee(form.value).subscribe((res: any) => {
        console.log(res);
        this.message = res.msg;
        this.ngOnInit();
      });
    }
  }

  updateEmployee(form) {
    console.log(form.value);
    if (form.valid) {
      if (form.value.password === '') {
        delete form.value.password;
      }
      console.log(form.value);
      this.adminService.updateEmployee(form.value, this.selectedEmployee._id)
        .subscribe((res: any) => {
          console.log(res);
          this.message = res.msg;
          this.ngOnInit();
        });
    }
  }

  selectEmployee(employee) {
    this.selectedEmployee = employee;
    console.log(employee);
    this.employeeForm.controls.user['controls'].name.setValue(this.selectedEmployee.user.name);
    this.employeeForm.controls.user['controls'].lastname.setValue(this.selectedEmployee.user.lastname);
    this.employeeForm.controls.user['controls'].email.setValue(this.selectedEmployee.user.email);
    this.employeeForm.controls.user['controls'].password.setValue('');
    this.employeeForm.controls.tel.setValue(this.selectedEmployee.tel);
    this.employeeForm.controls.address.setValue(this.selectedEmployee.address);
    this.employeeForm.controls.skills.setValue(this.selectedEmployee.skills);
    this.employeeForm.controls.status.setValue(this.selectedEmployee.status);
  }


  archiveBtn(form) {
    form.value.isArchived = true;
    this.adminService.updateEmployee(form.value, this.selectedEmployee._id).subscribe((res: any) => {
      console.log(res);
      this.message = res.msg;
      this.ngOnInit();
    });

  }

}
