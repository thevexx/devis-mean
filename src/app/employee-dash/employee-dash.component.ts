import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../shared/admin.service';
import { EmployeeService } from '../shared/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-dash',
  templateUrl: './employee-dash.component.html',
  styleUrls: ['./employee-dash.component.css']
})
export class EmployeeDashComponent implements OnInit {

  dashboardData;
  constructor(private router: Router, private modalService: NgbModal, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.decodeToken();
    this.employeeService.getDashboardData().subscribe((data: any) => {
      this.dashboardData = data.data;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
