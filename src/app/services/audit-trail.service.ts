import { Injectable } from '@angular/core';
import { BaseService } from './base_services/base.service';
import { Http } from '@angular/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Configuration } from './base_services/configuration';

@Injectable()
export class AuditTrailService extends BaseService{
    constructor(
        http: Http,
        localStorageService: LocalStorageService) {
        super(http, localStorageService);
    }

    getAllAuditLog(startDateFilter, endDateFilter, moduleFilter){
        let request = {"startDate": startDateFilter, "endDate": endDateFilter, "module":moduleFilter};
        return this.getDataHeader(Configuration.AUDIT_TRAIL, request);
    }
}