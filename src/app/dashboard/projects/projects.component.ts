import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../shared/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  projectList = [];
  selectedProject;
  message;
  employeesList;
  projectForm: FormGroup;
  constructor(private modalService: NgbModal, private adminService: AdminService) {
    this.projectForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      company: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      dateLimit: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status : new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.adminService.getListProjects().subscribe((data: any) => {
      this.projectList = data.data;
      this.adminService.projectList = data.data;
    });
    this.adminService.getListEmployees().subscribe((data: any) => {
      this.employeesList = data.data;
      console.log(this.employeesList);
      this.adminService.employeesList = data.data;
    });
  }

  selectProject(project) {
    console.log(project)
    this.selectedProject = project;
    this.projectForm.controls.name.setValue(this.selectedProject.client.name);
    this.projectForm.controls.lastname.setValue(this.selectedProject.client.lastname);
    this.projectForm.controls.email.setValue(this.selectedProject.client.email);
    this.projectForm.controls.tel.setValue(this.selectedProject.client.tel);
    this.projectForm.controls.address.setValue(this.selectedProject.client.address);
    this.projectForm.controls.company.setValue(this.selectedProject.client.company);
    this.projectForm.controls.description.setValue(this.selectedProject.description);
    this.projectForm.controls.type.setValue(this.selectedProject.type);
    this.projectForm.controls.dateLimit.setValue(this.selectedProject.dateLimit);
    this.projectForm.controls.status.setValue(this.selectedProject.status);
  }

  open(modal) {
    this.modalService.open(modal, { size: 'lg' });
  }

  update(form) {
    console.log(form)

    if (form.valid) {
      form.value.employees = this.selectedProject.employees;
      form.value._id = this.selectedProject._id;
      form.value.dateLimit = this.selectedProject.dateLimit;
      form.value.dateCreation = this.selectedProject.dateCreation;
      form.value.type = this.selectedProject.type;
      const client = {};
      client['_id'] = this.selectedProject.client._id;
      client['name'] = form.value.name;
      client['lastname'] = form.value.lastname;
      client['email'] = form.value.email;
      client['address'] = form.value.address;
      client['company'] = form.value.company;
      form.value['client'] = client;
      console.log(form.value)
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

  archiveBtn(form) {
    form.value.isArchived = true;
    this.adminService.updateProject(form.value, this.selectedProject._id).subscribe((res: any) => {
      console.log(res);
      this.message = res.msg;
      this.ngOnInit();
    });
  }


}
