import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DevisComponent } from './dashboard/devis/devis.component';
import { ProjectsComponent } from './dashboard/projects/projects.component';
import { EmployeesComponent } from './dashboard/employees/employees.component';
import { ClientsComponent } from './dashboard/clients/clients.component';
import { HomeDashComponent } from './dashboard/home-dash/home-dash.component';
import { DemandeDevisComponent } from './demande-devis/demande-devis.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/auth.guard';
import { ProductComponent } from './dashboard/product/product.component';
import { ServiceComponent } from './dashboard/service/service.component';
import { DevisconfirmationComponent } from './devisconfirmation/devisconfirmation.component';
import { RoleGuard } from './shared/role.guard';
import { EmployeeDashComponent } from './employee-dash/employee-dash.component';
import { EmployeeProjectsComponent } from './employee-dash/employee-projects/employee-projects.component';
import { AdminsComponent } from './dashboard/admins/admins.component';
import { EmployeeDashHomeComponent } from './employee-dash/employee-dash-home/employee-dash-home.component';
import { EmployeeAccountComponent } from './employee-dash/employee-account/employee-account.component';
import { AccountComponent } from './dashboard/account/account.component';
import { ArchiveComponent } from './dashboard/archive/archive.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'devis/:id', component: DevisconfirmationComponent },
  { path: 'demande', component: DemandeDevisComponent },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, RoleGuard]
    , data: { roles: ['admin'] }
    , children: [
      { path: 'dashboard', component: HomeDashComponent },
      { path: 'devis', component: DevisComponent },
      { path: 'clients', component: ClientsComponent },
      { path: 'projects', component: ProjectsComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'admins', component: AdminsComponent },
      { path: 'produits', component: ProductComponent },
      { path: 'services', component: ServiceComponent },
      { path: 'account', component: AccountComponent },
      { path: 'archive', component: ArchiveComponent },
      { path: '**', redirectTo: 'dashboard' },
    ]
  },
  {
    path: 'employees', component: EmployeeDashComponent, canActivate: [AuthGuard, RoleGuard]
    , data: { roles: ['employee'] }
    , children: [
      { path: 'dashboard', component: EmployeeDashHomeComponent },
      { path: 'projects', component: EmployeeProjectsComponent },
      { path: 'account', component: EmployeeAccountComponent },
      { path: '**', redirectTo: 'dashboard' },
    ]
  },

  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
