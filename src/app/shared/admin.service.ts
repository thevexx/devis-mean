import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  devisList = [];
  employeesList = [];
  projectList = [];
  clientList = [];
  productsList = [];
  servicesList = [];
  adminId;
  adminsList = [];

  constructor(private http: HttpClient) { }
  getListAdmins(){
    return this.http.get('http://localhost:3000/admin/admin/all');
  }
  getAdminById(id) {
    return this.http.get('http://localhost:3000/admin/admin/' + id);
  }

  addAdmin(admin) {
    return this.http.post('http://localhost:3000/admin/admin/', admin);
  }

  updateAdmin(admin, id) {
    return this.http.post('http://localhost:3000/admin/admin/update/' + id, admin);
  }
  getListEmployees() {
    return this.http.get('http://localhost:3000/admin/employee/all');
  }

  getEmployeeById(id) {
    return this.http.get('http://localhost:3000/admin/employees/' + id);
  }

  addEmployee(employee) {
    return this.http.post('http://localhost:3000/admin/employee/', employee);
  }

  updateEmployee(employee, id) {
    return this.http.post('http://localhost:3000/admin/employee/update/' + id, employee);
  }

  assignEmployee(listEmployees, devisId) {
    return this.http.post('http://localhost:3000/admin/assign/' + devisId, listEmployees);
  }

  getListProjects() {
    return this.http.get('http://localhost:3000/admin/project/all');
  }

  getProjectById(id) {
    return this.http.get('http://localhost:3000/admin/project/' + id);
  }

  updateProject(project, id) {
    console.log(project);
    return this.http.post('http://localhost:3000/admin/project/update/' + id, project);
  }

  addProject(project) {
    return this.http.post('http://localhost:3000/admin/project/update/', project);
  }

  getListClients() {
    return this.http.get('http://localhost:3000/admin/client/all');
  }

  updateClient(id, client) {
    return this.http.post('http://localhost:3000/admin/client/update/' + id, client);
  }

  getListDevis() {
    return this.http.get('http://localhost:3000/devis/all');
  }

  updateDevis(id, devis) {
    return this.http.post('http://localhost:3000/devis/update/' + id, devis);
  }

  getListProducts() {
    return this.http.get('http://localhost:3000/admin/product/all');
  }

  getProductById(id) {
    return this.http.get('http://localhost:3000/admin/product/' + id);
  }

  addProduct(product) {
    return this.http.post('http://localhost:3000/admin/product/', product);
  }

  updateProduct(product, id) {
    return this.http.post('http://localhost:3000/admin/product/update/' + id, product);
  }

  getListServices() {
    return this.http.get('http://localhost:3000/admin/service/all');
  }

  getServiceById(id) {
    return this.http.get('http://localhost:3000/admin/service/' + id);
  }

  addService(service) {
    return this.http.post('http://localhost:3000/admin/service/', service);
  }

  updateService(service, id) {
    return this.http.post('http://localhost:3000/admin/service/update/' + id, service);
  }
  getDashboardData() {
    return this.http.get('http://localhost:3000/admin/dashboard');
  }

  sendConfirmationDevisEmail(id) {
    return this.http.get('http://localhost:3000/admin/emaildevis/' + id);
  }
  getDevisById(id) {
    return this.http.get('http://localhost:3000/devis/' + id);

  }
  decodeToken() {
    if (localStorage.getItem('token')) {
      const data = jwt_decode(localStorage.getItem('token'));
      if (data.data.role === 'admin') {
        this.adminId = jwt_decode(localStorage.getItem('token')).data._id;
        console.log(jwt_decode(localStorage.getItem('token')));
      }
    }
  }
  updateUserPasswordById(user, id) {
    return this.http.post('http://localhost:3000/admin/user/updatePass/' + id, user);
  }
}
