import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserAccessCreateComponent} from './user-access-create.component';

const routes: Routes = [
  {
    path: '',
    component: UserAccessCreateComponent,
    data: {
      title: 'User Access',
      icon: 'icon-user',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccessCreateRoutingModule { }
