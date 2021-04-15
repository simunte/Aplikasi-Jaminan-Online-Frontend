import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicLoginComponent } from './basic-login.component';
import { BasicLoginRoutingModule } from './basic-login-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastyModule } from 'ng2-toasty';
import { TcaEnComponent } from './tca/tca-en/tca-en.component';
import { TcaIdComponent } from './tca/tca-id/tca-id.component';

@NgModule({
  imports: [
    CommonModule,
    BasicLoginRoutingModule,
    SharedModule,
    FormsModule,
    ToastyModule.forRoot(),
  ],
  declarations: [BasicLoginComponent, TcaEnComponent, TcaIdComponent]
})
export class BasicLoginModule { }
