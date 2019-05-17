import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../shared/admin.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clientList = [];
  selectedClient;
  constructor(private modalService: NgbModal, private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getListClients().subscribe((data: any) => {
      this.clientList = data.data;
      this.adminService.clientList = data.data;
      console.log(data);
    });
  }

  openModal(modal) {
    this.modalService.open(modal, { size: 'lg' });
  }

  archiveBtn(selectedClient) {
    selectedClient.isArchived = true;
    this.adminService.updateClient(selectedClient._id, selectedClient).subscribe((res: any) => {
      console.log(res);
      // this.message = res.msg;
      this.ngOnInit();
    });

  }
}
