import { Component, OnInit } from '@angular/core';
import { ArchiveService } from 'src/app/shared/archive.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/shared/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  archives: any;
  selectedDevis;
  selectedClient;
  selectedProduct;
  selectedService;
  selectedEmployee;
  selectedUser;
  selectedProject;

  projectForm: FormGroup;
  employeeForm: FormGroup;
  serviceForm: FormGroup;
  productForm: FormGroup;

  constructor(private modalService: NgbModal, private adminService: AdminService,
    private archiveService: ArchiveService) {
    this.projectForm = new FormGroup({
      name: new FormControl({ value: '', disabled: true }, [Validators.required]),
      lastname: new FormControl({ value: '', disabled: true }, [Validators.required]),
      email: new FormControl({ value: '', disabled: true }, [Validators.required]),
      tel: new FormControl({ value: '', disabled: true }, [Validators.required]),
      address: new FormControl({ value: '', disabled: true }, [Validators.required]),
      company: new FormControl({ value: '', disabled: true }, [Validators.required]),
      type: new FormControl({ value: '', disabled: true }, [Validators.required]),
      dateLimit: new FormControl({ value: '', disabled: true }, [Validators.required]),
      description: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });
    const userForm = new FormGroup({
      name: new FormControl({ value: '', disabled: true }, [Validators.required]),
      lastname: new FormControl({ value: '', disabled: true }, [Validators.required]),
      email: new FormControl({ value: '', disabled: true }, [Validators.required]),
      password: new FormControl({ value: '', disabled: true }, [])
    });
    this.employeeForm = new FormGroup({
      user: userForm,
      tel: new FormControl({ value: '', disabled: true }, [Validators.required]),
      address: new FormControl({ value: '', disabled: true }, [Validators.required]),
      skills: new FormControl({ value: '', disabled: true }, [Validators.required]),
      status: new FormControl({ value: '', disabled: true }, [Validators.required]),
    });
    this.productForm = new FormGroup({
      name: new FormControl({ value: '', disabled: true }, [Validators.required]),
      type: new FormControl({ value: '', disabled: true }, [Validators.required]),
      desc: new FormControl({ value: '', disabled: true }, [Validators.required]),
      price: new FormControl({ value: '', disabled: true }, [Validators.required])
    });
    this.serviceForm = new FormGroup({
      name: new FormControl({ value: '', disabled: true }, [Validators.required]),
      type: new FormControl({ value: '', disabled: true }, [Validators.required]),
      price: new FormControl({ value: '', disabled: true }, [Validators.required]),
      desc: new FormControl({ value: '', disabled: true }, [Validators.required])
    });
  }

  ngOnInit() {
    this.archiveService.getArchive().subscribe((data: any) => {
      this.archives = data.data;
      console.log(data.data)
    })
  }
  openModal(modal) {
    this.modalService.open(modal, { size: 'lg' });
  }

  deleteBtn(selected) {
    this.archiveService.deleteItem(selected._id).subscribe((data: any) => {
      this.ngOnInit();
      console.log(data);
    })
  }

  restoreBtn() {

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


  selectService(service) {
    this.selectedService = service;
    console.log(service);
    this.serviceForm.controls.name.setValue(this.selectedService.name);
    this.serviceForm.controls.type.setValue(this.selectedService.type);
    this.serviceForm.controls.price.setValue(this.selectedService.price);
    this.serviceForm.controls.desc.setValue(this.selectedService.desc);
  }

  selectProduct(product) {
    this.selectedProduct = product;
    console.log(product);
    this.productForm.controls.name.setValue(this.selectedProduct.name);
    this.productForm.controls.type.setValue(this.selectedProduct.type);
    this.productForm.controls.price.setValue(this.selectedProduct.price);
    this.productForm.controls.desc.setValue(this.selectedProduct.desc);
  }
}
