import { MasterConfigurationComponent } from './master-configuration.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MasterConfigurationComponent,
    data: {
      title: 'MENU.MASTER_CONFIGURATION',
      status: true,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterConfigurationRoutingModule { }
