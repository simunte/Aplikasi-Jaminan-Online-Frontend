import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGroupComponent } from './user-group.component';

const routes: Routes = [
  {
    path: '',
    component: UserGroupComponent,
    data: {
      title: 'LABEL.USER_GROUP',
      status: true
    }
  }, {
    path: '',
    data: {
      title: 'LABEL.USER_GROUP',
      status: true
    }, children: [
      {
        path: 'user-group-create/:id',
        loadChildren: './user-group-create/user-group-create.module#UserGroupCreateModule'
      },
      {
        path: 'user-group-create',
        loadChildren: './user-group-create/user-group-create.module#UserGroupCreateModule'
      }]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserGroupRoutingModule { }
