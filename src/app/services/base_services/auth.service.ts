import { Injectable } from '@angular/core';
// import { LocalStorageModule } from 'angular-2-local-storage';
// import {LocalStorageService} from 'ngx-webstorage';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable()
export class AuthService {

  constructor(public localStorageService: LocalStorageService) { }
  public isAuthenticated(): boolean {
    const token = this.localStorageService.retrieve('token');

    // this.attribute = this.storage.retrieve('boundValue');
    let result;
    if (token == null) {
      result = false;
    }
    else {
      result = true
    }
    // Check whether the token is expired and return
    // true or false
    return result;
    // return !this.jwtHelper.isTokenExpired(token);
  }

}
