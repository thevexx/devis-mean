import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employeeId;

  constructor(private http: HttpClient) {
    // this.decodeToken();
  }

  getDashboardData() {
    return this.http.get('http://localhost:3000/admin/dashboard/employee/' + this.employeeId);
  }
  getListProjects() {
    return this.http.get('http://localhost:3000/admin/dashboard/projects/' + this.employeeId);
  }

  getProjectById(id) {
    return this.http.get('http://localhost:3000/admin/project/' + id);
  }
  updateProject(project, id) {
    console.log(project);
    return this.http.post('http://localhost:3000/admin/project/update/' + id, project);
  }
  decodeToken() {
    if (localStorage.getItem('token')) {
      const data = jwt_decode(localStorage.getItem('token'));
      if (data.data.role === 'employee') {
        this.employeeId = jwt_decode(localStorage.getItem('token')).data.employee;
        console.log(jwt_decode(localStorage.getItem('token')));
      }
    }
  }
  getEmployeeById(id) {
    return this.http.get('http://localhost:3000/admin/employee/' + id);
  }
  updateUserPasswordById(user, id) {
    return this.http.post('http://localhost:3000/admin/user/updatePass/' + id, user);
  }
  updateEmployeeById(employee, id) {
    return this.http.post('http://localhost:3000/admin/employee/update/' + id, employee);
  }
}
