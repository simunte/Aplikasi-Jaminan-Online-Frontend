import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegistrationEditComponent} from './registration-edit.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationEditComponent,
    data: {
      title: 'Bank Guarantee',
      icon: 'icon-user',
      caption: 'lorem ipsum dolor sit amet, consectetur adipisicing elit - user profile',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationEditRoutingModule { }
