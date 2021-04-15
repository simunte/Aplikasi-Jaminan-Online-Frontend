import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { NgxWebstorageModule } from 'ngx-webstorage';
import { AppComponent } from './app.component';
import { AdminComponent } from './layout/admin/admin.component';
import { AuthComponent } from './layout/auth/auth.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { MenuItems } from './shared/menu-items/menu-items';
import { BreadcrumbsComponent } from './layout/admin/breadcrumbs/breadcrumbs.component';

import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { SnotifyModule } from 'ng-snotify';
import { NgxCurrencyModule } from 'ngx-currency';
import { DxButtonModule } from 'devextreme-angular';

//SERVICE
import { CallService } from './services/base_services/call.service';
import { AuthService } from './services/base_services/auth.service';
import { AuthGuardService } from './services/base_services/auth-guard.service';
import { BaseService } from './services/base_services/base.service';
import { AuthenticationService } from './services/authentication.service';
import { BankGuaranteeService } from './services/bank-guarantee.service';
import { MasterDataService } from './services/master-data.service';
import { FileManagementService } from './services/file-management.service';
import { ConfigurationModule } from './theme/master/configuration/configuration.module';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import { ToastyModule } from 'ng2-toasty';
import { ToastService } from './services/toast.service';
import { SpinnerService } from './services/spinner.service';
import { SpinnerInterceptor } from './interceptors/spinner.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgbDateCustomParserFormatter } from "./services/date-formatter.service";
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AuditTrailService } from './services/audit-trail.service';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

registerLocaleData(localeId);
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    BreadcrumbsComponent
  ],
  imports: [
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot(),
    ToastyModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgxCurrencyModule,
    DxButtonModule,
    ConfigurationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  schemas: [],
  providers: [
    MenuItems,
    CallService,
    AuthService,
    AuthGuardService,
    BaseService,
    AuthenticationService,
    BankGuaranteeService,
    SnotifyModule,
    MasterDataService,
    AuditTrailService,
    FileManagementService,
    ToastService,
    SpinnerService,
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
