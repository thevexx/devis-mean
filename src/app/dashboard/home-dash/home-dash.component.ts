import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../shared/admin.service';

@Component({
  selector: 'app-home-dash',
  templateUrl: './home-dash.component.html',
  styleUrls: ['./home-dash.component.css']
})
export class HomeDashComponent implements OnInit {

  dashboardData;
  constructor(private modalService: NgbModal, private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getDashboardData().subscribe((data: any) => {

      this.dashboardData = data.data;
    })
  }

}
