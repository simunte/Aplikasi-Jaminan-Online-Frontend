import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserNasabahComponent } from './user-nasabah.component'
const routes: Routes = [
  {
    path: '',
    component: UserNasabahComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserNasabahRoutingModule { }
