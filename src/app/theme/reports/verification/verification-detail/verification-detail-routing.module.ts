import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerificationDetailComponent } from './verification-detail.component';

const routes: Routes = [
  {
    path: '',
    component: VerificationDetailComponent,
    data: {
      title: 'Verification Detail',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificationDetailRoutingModule { }
