import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../shared/admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  message;
  servicesList;
  selectedService: any;
  serviceForm: FormGroup;

  constructor(private modalService: NgbModal, private adminService: AdminService) {
    this.serviceForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      desc: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.adminService.getListServices().subscribe((data: any) => {
      this.servicesList = data.data;
      this.adminService.servicesList = data.data;
    });
  }

  openModal(modal) {
    this.modalService.open(modal, { size: 'lg' });
  }

  addService(form) {
    console.log(form.value);
    if (form.valid) {
      this.adminService.addService(form.value).subscribe((res: any) => {
        console.log(res);
        this.message = res.msg;
        this.ngOnInit();

      });
    }
  }
  updateService(form) {
    console.log(form.value);
    if (form.valid) {
      this.adminService.updateService(form.value, this.selectedService._id).subscribe((res: any) => {
        console.log(res);
        this.message = res.msg;
        this.ngOnInit();
      });
    }
  }

  selectService(service) {
    this.selectedService = service;
    console.log(service);
    this.serviceForm.controls.name.setValue(this.selectedService.name);
    this.serviceForm.controls.type.setValue(this.selectedService.type);
    this.serviceForm.controls.price.setValue(this.selectedService.price);
    this.serviceForm.controls.desc.setValue(this.selectedService.desc);
  }

  archiveBtn(form) {
    form.value.isArchived = true;
    this.adminService.updateService(form.value, this.selectedService._id).subscribe((res: any) => {
      console.log(res);
      this.message = res.msg;
      this.ngOnInit();
    });

  }

}
