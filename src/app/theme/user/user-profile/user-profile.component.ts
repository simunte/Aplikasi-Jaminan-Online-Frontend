import { LocalStorageService } from 'ngx-webstorage';
import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { MasterDataService } from 'src/app/services/master-data.service';
import { ToastyService } from 'ng2-toasty';
import { changePassword } from '../../auth/login/basic-login/change-password';
import { AuthService } from 'src/app/services/base_services/auth.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [
    './user-profile.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class UserProfileComponent implements OnInit {
  editProfile = true;
  editProfileIcon = 'icofont-edit';
  isNasabah: boolean = true;

  userProfile: any = {};
  changePassword: any = {};
  newPassword: any;
  reTypePassword: any;
  showPasswordNew: boolean = false;
  showPasswordRe: boolean = false;
  userId:any;


  constructor(
    private masterDataService: MasterDataService,
    private toastService: ToastService  ,
    private authService : AuthenticationService,
    private localStorageService: LocalStorageService,
    private router: Router,) {
  }

  ngOnInit() {
    this.masterDataService.getUser(this.localStorageService.retrieve('username')).subscribe(data => {
      this.userProfile = data
    });
  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
    this.changePassword = {}
  }

  changePasswords() {
    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    var userId = this.localStorageService.retrieve('userId')
    if (this.newPassword == null || this.reTypePassword == null) {
      this.toastService.warning('Password tidak boleh kosong')
    } else if (this.newPassword != this.reTypePassword) {
      this.toastService.warning('Password tidak sama')
    } else if (!strongRegex.test(this.newPassword)) {
      this.toastService.warning('Password terdiri minimal 8 character, terdiri dari special character dan alphanumeric');
    } else {
      let request = new changePassword();
      request.userId = userId;
      request.newPassword = this.newPassword;
      request.reType = this.reTypePassword;
      this.authService.changePassword(request).subscribe(data => {
        if (data) {
          this.toastService.success('Berhasil ubah password');
        }        
      }, error => {
        let errorBody = error._body ? JSON.parse(error._body) : null;
        this.toastService.error(errorBody.message);
      })
    }

  }

}
