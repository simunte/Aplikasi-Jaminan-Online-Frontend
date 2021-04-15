import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './base_services/base.service';
import { Configuration } from './base_services/configuration';
import { AuthService } from './base_services/auth.service';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { User } from '../class/user.model';

@Injectable()
export class AuthenticationService extends BaseService {
  private _user = new ReplaySubject<User>(1);

  constructor(http: Http, auth: AuthService, localStorageService: LocalStorageService) {
    super(http, localStorageService);
    auth.isAuthenticated();
    let user;
    if (localStorage.getItem('user')) {
      user = JSON.parse(localStorage.getItem('user'));
    } else {
      user = { name: 'Anonymous', roles: ['Anonym'] };
    }
    this._user.next(<User>user);
  }

  login(data) {
    return this.createDataParamLogin(Configuration.LOGIN, data);
  }
  logout() {
    return this.createDataBearer(Configuration.LOGOUT);
  }
  parseJWT(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  getRoleByUsername(username) {
    let request = {};
    return this.getDataHeader(Configuration.USER + '/' + username, request);
  }
  getPrivilegeByRoleId(id) {
    let request = {};
    return this.getDataHeader(Configuration.ROLE + '/' + id, request);
  }
  firstLogin(data) {
    return this.postData(Configuration.FIRSTLOGIN, data);
  }
  changePassword(data) {
    return this.postData(Configuration.CHANGE_PASSWORD, data)
  }

  getAttempt(username) {
    return this.postNoAuth(Configuration.LOGIN_ATTEMPT, username);
  }

  resetCountDisabled(username) {
   return this.postData(Configuration.RESET_COUNT_DISABLED, username);
 }

}
