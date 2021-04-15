import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationCreateComponent } from './registration-create.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationCreateComponent,
    data: {
      title: 'Bank Guarantee',
      icon: 'ti-users',
      caption: 'loursem it to no crm to dshil aksl ek se.',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationCreateRoutingModule { }