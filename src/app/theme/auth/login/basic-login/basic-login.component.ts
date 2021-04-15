import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../../../services/authentication.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { ModalBasicComponent } from 'src/app/shared/modal-basic/modal-basic.component';
import { changePassword } from './change-password';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { ToastyService } from 'ng2-toasty';
import { TranslateService } from '@ngx-translate/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {
  @ViewChild('modalDefaultTAC') modalDefaultTAC: ModalBasicComponent;
  @ViewChild('modalDefaultPassword') modalDefaultPassword: ModalBasicComponent;
  @ViewChild('spinner') spinner: SpinnerComponent;
  @ViewChild('agree') btnAgree: ElementRef;
  @ViewChild('newPass') inputNewPass: ElementRef;

  currentLang: string = 'en';
  ipAddress: any;

  constructor(
    private toastService: ToastyService,
    private authService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private router: Router,
    public translate: TranslateService,
    private http: Http) {
    translate.setDefaultLang('en');
    this.currentLang = 'en';
  }

  ngOnInit() {
    document.querySelector('body').setAttribute('themebg-pattern', 'theme1');

  }

  privilege: any;
  isExternal: any;
  isFirstLogin: any;
  newPassword: any;
  reTypePassword: any;
  userId: any;
  roleId: any;
  role: any;
  showPassword: boolean = false;
  showPasswordNew: boolean = false;
  showPasswordRe: boolean = false;

  login(form: NgForm) {
    // this.modalDefaultPassword.show();
    // return
    if (form.value.username == '') {
      this.toastService.warning(this.translate.instant('NOTIF.USERNAME_REQUIRED'));
    } else if (form.value.password == '') {
      this.toastService.warning(this.translate.instant('NOTIF.PASSWORD_REQUIRED'));
    } else {
      this.spinner.isSpinnerVisible = true;

      var _data = new FormData();
      _data.append('grant_type', 'password');
      _data.append('username', form.value.username);
      _data.append('password', form.value.password);
      this.authService.login(_data).subscribe(data => {
        this.role = data.users.roles;
        this.localStorageService.store('privilege', this.role[0]);
        this.localStorageService.store('userId', data.users.id)
        this.userId = data.users.id;
        this.isExternal = data.users.isExternal;
        this.isFirstLogin = data.users.isFirstLogin;
        var decodeDataToken = this.authService.parseJWT(data.access_token);
        this.localStorageService.store('token', data.access_token);
        this.localStorageService.store('token_type', data.token_type);
        this.localStorageService.store('auth', decodeDataToken);
        this.localStorageService.store('full_name', form.value.username);
        this.localStorageService.store('username', form.value.username);

        if (data.users.isFirstLogin) {
          this.spinner.isSpinnerVisible = false;
          this.modalDefaultTAC.show();
          setTimeout(() => {
            this.btnAgree.nativeElement.focus();
          }, 300);
        } else if (data.users.isForceChangePassword) {
          this.spinner.isSpinnerVisible = false;
          this.modalDefaultPassword.show();
          this.toastService.info('Silahkan ganti password anda')
          setTimeout(() => {
            this.inputNewPass.nativeElement.focus();
          }, 300);
        } else {
          this.authService.resetCountDisabled(data.users.username).subscribe();
          this.router.navigate(['/dashboard']);
        }

        // this.getPrivilegeBasedOnRole(form.value.username);
      }, error => {
        let errorBody = error._body ? JSON.parse(error._body) : null;
        this.spinner.isSpinnerVisible = false;
        if (errorBody.error === 'unauthorized' && errorBody.error_description === 'Bad credentials') {
          this.toastService.error('username atau password tidak sesuai.');
          this.authService.getAttempt(form.value.username).subscribe();
        } else {
          this.toastService.error(errorBody.message || errorBody.error_description);
        }
        
      })

    }
  }

  getPrivilegeBasedOnRole(username) {
    this.authService.getRoleByUsername(username).subscribe(data => {
      this.role = data.roles;
      for (let i = 0; i < this.role.length; i++) {
        this.authService.getPrivilegeByRoleId(parseInt(this.role[i].id)).subscribe(dataPriv => {
          if (dataPriv.message != 'ERROR' || dataPriv != null) {
            this.privilege = dataPriv;
            console.log("privilege" + dataPriv)
            this.userId = data.id;
            this.isExternal = data.isExternal
            this.isFirstLogin = data.isFirstLogin;
            this.localStorageService.store('privilege', this.privilege);
            this.localStorageService.store('userId', data.id)
            this.spinner.isSpinnerVisible = false;
            if (data.isFirstLogin) {
              this.modalDefaultTAC.show();
              setTimeout(() => {
                this.btnAgree.nativeElement.focus();
              }, 300);
            } else if (data.isForceChangePassword) {
              this.modalDefaultPassword.show();
              this.toastService.info('Silahkan ganti password anda')
              setTimeout(() => {
                this.inputNewPass.nativeElement.focus();
              }, 300);
            } else {
              this.authService.resetCountDisabled(username).subscribe();
              this.router.navigate(['/dashboard']);
            }
          }
        })
      }
    }, error => {
      this.spinner.isSpinnerVisible = false;
      let errorBody = error._body ? JSON.parse(error._body) : null;
      this.toastService.error(errorBody && errorBody.message ? errorBody.message : ('failed to login.'));
    })
  }

  changePassword() {
    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

    if (this.newPassword == null || this.reTypePassword == null) {
      this.toastService.warning('Password tidak boleh kosong')
    } else if (this.newPassword != this.reTypePassword) {
      this.toastService.warning('Password tidak sama')
    } else if (!strongRegex.test(this.newPassword)) {
      this.toastService.warning('Password terdiri minimal 8 character, terdiri dari special character dan alphanumeric');
    } else {
      let request = new changePassword();
      request.userId = this.userId;
      request.newPassword = this.newPassword;
      request.reType = this.reTypePassword;
      this.authService.changePassword(request).subscribe(data => {
        if (data) {
          this.authService.firstLogin('').subscribe(data2 => {
            this.toastService.success('Berhasil ubah password');
            this.router.navigate(['/dashboard']);
          }, error => {
            let errorBody = error._body ? JSON.parse(error._body) : null;
            this.toastService.error(errorBody.message || errorBody.error_description);
          })
        }
      }, error => {
        let errorBody = error._body ? JSON.parse(error._body) : null;
        this.toastService.error(errorBody.message || errorBody.error_description);
      })
    }

  }

  toDashboard() {
    if (this.isFirstLogin) {
      this.modalDefaultTAC.hide();
      this.modalDefaultPassword.show();
      setTimeout(() => {
        this.inputNewPass.nativeElement.focus();
      }, 300);
    } else {
      this.authService.firstLogin('').subscribe(data => {
        this.router.navigate(['/dashboard']);
      }, error => {
        let errorBody = error._body ? JSON.parse(error._body) : null;
        this.toastService.error(errorBody.message || errorBody.error_description);
      })
    }
  }

  closeModalTAC() {
    this.localStorageService.clear();
    this.modalDefaultTAC.hide();
  }

  closeModalDefaultPassword() {
    this.localStorageService.clear();
    this.modalDefaultPassword.hide()
  }

  changeLanguage(event: any) {
    let lang = event ? 'id' : 'en';
    this.translate.setDefaultLang(lang);
    this.currentLang = lang
  }
}
