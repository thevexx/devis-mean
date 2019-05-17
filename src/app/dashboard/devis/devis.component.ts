import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../shared/admin.service';

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.css']
})
export class DevisComponent implements OnInit {

  devisList = [];
  selectedDevis: any = {};
  devisDetailScreen = 1;
  employeesList = [];
  selectedEmployees = [];
  constructor(private modalService: NgbModal, private adminService: AdminService) {
    this.devisList = this.adminService.devisList;
  }

  ngOnInit() {
    this.adminService.getListDevis().subscribe((data: any) => {
      data.data.forEach((devis, i) => {
        let total = 0;
        devis.services.forEach((service, index) => {
          total += Number.parseInt(service.price) * devis.quantities[i]
        });
        devis.products.forEach((product, i) => {
          total += Number.parseInt(product.price) * devis.quantities[i];
        });
        devis.total = total;
      });

      this.devisList = data.data;
      this.adminService.devisList = data.data;
    });
    this.adminService.getListEmployees().subscribe((data: any) => {
      this.employeesList = data.data;
      this.adminService.employeesList = data.data;
    });
  }
  openModal(modal) {
    this.modalService.open(modal, { size: 'lg' });
  }
  devisUpdate() {
    this.selectedDevis.isConfirmed = true;
    this.selectedDevis.isAffected = true;
    this.adminService.assignEmployee({ employees: this.selectedEmployees }, this.selectedDevis._id).subscribe(res => {
      this.adminService.updateDevis(this.selectedDevis._id, this.selectedDevis).subscribe(res2 => {
        this.ngOnInit();
      });
    });
  }
  rejectDevis() {
    this.selectedDevis.isConfirmed = false;
    this.selectedDevis.isConfirmed = false;
    this.adminService.updateDevis(this.selectedDevis._id, this.selectedDevis).subscribe(res2 => {
      this.ngOnInit();
    });
  }

  sendConfirmationEmail() {
    this.adminService.sendConfirmationDevisEmail(this.selectedDevis._id).subscribe((res: any) => {
      console.log(res);
    });
  }

  archiveBtn(selectedDevis) {
    selectedDevis.isArchived = true;
    this.adminService.updateDevis(this.selectedDevis._id, selectedDevis ).subscribe((res: any) => {
      console.log(res);
      // this.message = res.msg;
      this.ngOnInit();
    });
  }

}
