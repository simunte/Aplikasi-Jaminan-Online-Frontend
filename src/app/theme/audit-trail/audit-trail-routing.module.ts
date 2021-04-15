import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
      path: '',
      data: {
        title: 'Audit Trail',
        icon: 'ti-users',
        status: true
      },
      children: [
        {
          path: '',
          loadChildren: './audit-trail-list/audit-trail-list.module#AuditTrailListModule'
        }
      ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuditTrailRoutingModule { }