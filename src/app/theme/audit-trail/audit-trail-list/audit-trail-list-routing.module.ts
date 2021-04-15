import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditTrailComponent } from './audit-trail.component';

const routes: Routes = [
    {
      path: '',
      component: AuditTrailComponent,
      data: {
        title: 'Audit Trail List',
        status: true
      }
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuditTrailListRoutingModule { }