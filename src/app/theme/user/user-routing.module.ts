import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'LABEL.USER',
      status: false
    },
    children: [
      {
        path: 'profile',
        loadChildren: './user-profile/user-profile.module#UserProfileModule'
      },
      {
        path: 'user-access',
        loadChildren: './user-access/user-access.module#UserAccessModule'
      },
      {
        path: 'user-access/:u_status',
        loadChildren: './user-access/user-access.module#UserAccessModule'
      },
      {
        path: 'user-group',
        loadChildren: './user-group/user-group.module#UserGroupModule'
      },
      {
        path: 'user-access-create',
        loadChildren: './user-access/user-access-create/user-access-create.module#UserAccessCreateModule'
      },
      {
        path: 'user-group/:status',
        loadChildren: './user-group/user-group.module#UserGroupModule'
      },
      {
        path: 'user-nasabah-create',
        loadChildren: './user-nasabah/user-nasabah.module#UserNasabahModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
