import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/shared/admin.service';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-projects',
  templateUrl: './employee-projects.component.html',
  styleUrls: ['./employee-projects.component.css']
})
export class EmployeeProjectsComponent implements OnInit {

  projectList = [];
  selectedProject;
  message;
  employeesList;
  projectForm: FormGroup;
  constructor(private modalService: NgbModal, private employeeService: EmployeeService, private adminService: AdminService) {
    this.projectForm = new FormGroup({
      name: new FormControl({value: '', disabled: true}, []),
      lastname: new FormControl({value: '', disabled: true}, []),
      email: new FormControl({value: '', disabled: true}, []),
      tel: new FormControl({value: '', disabled: true}, []),
      address: new FormControl({value: '', disabled: true}, []),
      company: new FormControl({value: '', disabled: true}, []),
      serviceType: new FormControl({value: '', disabled: true}, []),
      type: new FormControl({value: '', disabled: true}, []),
      dateLimit: new FormControl({value: '', disabled: true}, []),
      dateCreation: new FormControl({value: '', disabled: true}, []),
      description: new FormControl({value: '', disabled: true}, []),
      status: new FormControl({value: ''}, []),
    });
  }

  ngOnInit() {
    this.employeeService.getListProjects().subscribe((data: any) => {
      this.projectList = data.data;
      console.log(data);
      this.adminService.projectList = data.data;
    });
    this.adminService.getListEmployees().subscribe((data: any) => {
      this.employeesList = data.data;
      console.log(this.employeesList);
      this.adminService.employeesList = data.data;
    });
  }

  selectProject(project) {
    this.selectedProject = project;
    this.projectForm.controls.name.setValue(this.selectedProject.client.name);
    this.projectForm.controls.lastname.setValue(this.selectedProject.client.lastname);
    this.projectForm.controls.email.setValue(this.selectedProject.client.email);
    this.projectForm.controls.tel.setValue(this.selectedProject.client.tel);
    this.projectForm.controls.address.setValue(this.selectedProject.client.address);
    this.projectForm.controls.company.setValue(this.selectedProject.client.company);
    this.projectForm.controls.description.setValue(this.selectedProject.description);
    this.projectForm.controls.status.setValue(this.selectedProject.status);
  }

  open(modal) {
    this.modalService.open(modal, { size: 'lg' });
  }

  update(form) {
    if (form.valid) {
      form.value.employees = this.selectedProject.employees;
      form.value._id = this.selectedProject._id;
      form.value.dateLimit = this.selectedProject.dateLimit;
      form.value.dateCreation = this.selectedProject.dateCreation;
      form.value.serviceType = this.selectedProject.serviceType;
      form.value.type = this.selectedProject.type;
      this.adminService.updateProject(form.value, this.selectedProject._id).subscribe((res: any) => {
        this.message = res.msg;
        this.ngOnInit();
      });
    }
  }
  isAffected(emp) {
    const a = [];
    return this.selectedProject.employees.filter(e => e._id === emp._id).length !== 0;
  }

  triggerAffectedEmployee(employee) {
    if (!this.isAffected(employee)) {
      this.selectedProject.employees.push(employee);
    } else {
      this.selectedProject.employees = this.selectedProject.employees.filter(elem => elem._id !== employee._id);
    }
  }
}
