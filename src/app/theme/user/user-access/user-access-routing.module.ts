import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserAccessComponent} from './user-access.component';

const routes: Routes = [
  {
    path: '',
    component: UserAccessComponent,
    data: {
      title: 'MENU.USER_ACCESS',
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
export class UserAccessRoutingModule { }
