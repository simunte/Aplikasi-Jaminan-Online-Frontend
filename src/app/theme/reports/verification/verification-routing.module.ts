import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerificationComponent } from './verification.component';

const routes: Routes = [
  {
    path: '',
    component: VerificationComponent,
    data: {
      title: 'Verification',
      status: true
    }
  }, {
    path: '',
    data: {
      title: 'Verification',
      status: true
    }, children: [
      {
        path: 'verification-detail',
        loadChildren: './verification-detail/verification-detail.module#VerificationDetailModule',

      },
      {
        path: 'verification-detail/:id_jaminan',
        loadChildren: './verification-detail/verification-detail.module#VerificationDetailModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationRoutingModule { }
