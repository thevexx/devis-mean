import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { DevisComponent } from './dashboard/devis/devis.component';
import { DemandeDevisComponent } from './demande-devis/demande-devis.component';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { ClientsComponent } from './dashboard/clients/clients.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeDashComponent } from './dashboard/home-dash/home-dash.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServiceComponent } from './dashboard/service/service.component';
import { ProductComponent } from './dashboard/product/product.component';
import { DevisconfirmationComponent } from './devisconfirmation/devisconfirmation.component';
import { EmployeeDashComponent } from './employee-dash/employee-dash.component';
import { EmployeeDashHomeComponent } from './employee-dash/employee-dash-home/employee-dash-home.component';
import { EmployeeProjectsComponent } from './employee-dash/employee-projects/employee-projects.component';
import { AdminsComponent } from './dashboard/admins/admins.component';
import { EmployeeAccountComponent } from './employee-dash/employee-account/employee-account.component';
import { AccountComponent } from './dashboard/account/account.component';
import { ArchiveComponent } from './dashboard/archive/archive.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    DevisComponent,
    DemandeDevisComponent,
    HomeComponent,
    ProjectsComponent,
    ClientsComponent,
    EmployeesComponent,
    HomeDashComponent,
    ServiceComponent,
    ProductComponent,
    DevisconfirmationComponent,
    EmployeeDashComponent,
    EmployeeDashHomeComponent,
    EmployeeProjectsComponent,
    AdminsComponent,
    EmployeeAccountComponent,
    AccountComponent,
    ArchiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
