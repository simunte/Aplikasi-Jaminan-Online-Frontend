import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadChildren: './theme/auth/login/basic-login/basic-login.module#BasicLoginModule'
      },
    ]
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: './theme/dashboard/default/default.module#DefaultModule'
      },
      {
        path: 'registration',
        loadChildren: './theme/guarantee/registration/registration.module#RegistrationModule'
      },
      {
        path: 'registration/:bg_status',
        loadChildren: './theme/guarantee/registration/registration.module#RegistrationModule'
      },
      {
        path: 'registration-create',
        loadChildren: './theme/guarantee/registration/registration-create/registration-create.module#RegistrationCreateModule'
      },
      {
        path: 'registration-edit/:id_jaminan',
        loadChildren: './theme/guarantee/registration/registration-edit/registration-edit.module#RegistrationEditModule'
      },
      {
        path: 'report',
        loadChildren: './theme/reports/reports.module#ReportModule'
      },
      {
        path: 'recapitulation/:bg_status',
        loadChildren: './theme/reports/recapitulation/recapitulation.module#RecapitulationModule'
      },
      {
        path: 'recapitulation-detail/:id_jaminan',
        loadChildren: './theme/reports/recapitulation/recapitulation-detail/recapitulation-detail.module#RecapitulationDetailModule'
      },
      {
        path: 'transfer',
        loadChildren: './theme/manual-data-transfer/manual-data-transfer.module#ManualDataTransferModule'
      },
      {
        path: 'user',
        loadChildren: './theme/user/user.module#UserModule'
      },
      {
        path: 'task',
        loadChildren: './theme/task/task.module#TaskModule'
      },
      {
        path: 'master',
        loadChildren: './theme/master/master.module#MasterModule'
      },
      {
        path: 'under-construction',
        loadChildren: './theme/under-construction/under-construction.module#UnderConstructionModule'
      },
      {
        path: 'audit-trail',
        loadChildren: './theme/audit-trail/audit-trail.module#AuditTrailModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
