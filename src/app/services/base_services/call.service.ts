import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from './base.service';
import { Configuration } from './configuration';
import { AuthService } from './auth.service';
import {LocalStorageService} from 'ngx-webstorage';
@Injectable()
export class CallService extends BaseService {

	constructor(http: Http, test : AuthService,localStorageService:LocalStorageService) {
    	super(http,localStorageService);
    	test.isAuthenticated();
	}
	getContact (){
		return this.getData(Configuration.BASE_HOST);
	}
}
