import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserGroupCreateComponent} from './user-group-create.component';

const routes: Routes = [
  {
    path: '',
    component: UserGroupCreateComponent,
    data: {
      title: 'LABEL.USER_GROUP',
      status: true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserGroupCreateRoutingModule { }
