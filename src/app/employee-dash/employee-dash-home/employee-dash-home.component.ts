import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeService } from 'src/app/shared/employee.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-employee-dash-home',
  templateUrl: './employee-dash-home.component.html',
  styleUrls: ['./employee-dash-home.component.css']
})
export class EmployeeDashHomeComponent implements OnInit {

  dashboardData;
  constructor(private modalService: NgbModal, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getDashboardData().subscribe((data: any) => {
      this.dashboardData = data.data;
      console.log(data);
    })
  }


}
