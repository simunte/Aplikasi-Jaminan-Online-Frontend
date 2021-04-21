import { Injectable } from '@angular/core';
import { BaseService } from './base_services/base.service';
import { Http } from '@angular/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Configuration } from './base_services/configuration';

@Injectable()
export class BankGuaranteeService extends BaseService {

  constructor(
    http: Http,
    localStorageService: LocalStorageService) {
    super(http, localStorageService);
  }

  getAllBg(status) {
    let request = { "status": status };
    return this.getDataHeader(Configuration.REGISTRATION, request);
  }

  getAllManualDataTransfer() {
    let request = {};
    return this.getDataHeader(Configuration.MANUAL_DATA_TRANSFER, request);
  }

  getDashboard() {
    let request = {};
    return this.getAllData(Configuration.DASHBOARD);
  }
  
  getDetailBankGuarantee(id_jaminan) {
    let request = {};
    return this.getDataHeader(Configuration.REGISTRATION + '/detail/' + id_jaminan, request);
  }

  getBgByNomorJaminan(id_jaminan) {
    let request = {};
    return this.getDataHeader(Configuration.REGISTRATION + '/' + id_jaminan, request);
  }

  getColumnDetail() {
    let request = {};
    return this.getDataHeader(Configuration.COLUMN + '/detail', request);
  }

  saveColumnUser(data) {
    let request = data;
    return this.postData(Configuration.COLUMN, request);
  }

  saveBgRegistration(data) {
    let request = data;
    return this.postData(Configuration.REGISTRATION, request);
  }

  getConfirmationByNomorJaminan(id_jaminan) {
    let request = {};
    return this.getDataHeader(Configuration.CONFIRMATION + "/" + id_jaminan, request);
  }

  getDraftSubmit(id_jaminan, draft) {
    let request = { "draft": draft };
    return this.getDataHeader(Configuration.REGISTRATION + "/draft/" + id_jaminan, request);
  }

  saveBgConfirmation(data, draft) {
    let request = data;
    return this.postData(Configuration.CONFIRMATION + "?draft=" + draft, request)
  }

  getBgConfirmationByNomorJaminan(id_jaminan) {
    let request = {};
    return this.getDataHeader(Configuration.CONFIRMATION + '/' + id_jaminan, request);
  }

  approvalBankGuarantee(data) {
    let request = data;
    return this.postData(Configuration.REGISTRATION + "/approval", request);
  }

  getBankGuaranteePln(status, menu) {
    let request = { "status": status, "menu":menu };
    return this.getDataHeader(Configuration.REGISTRATION + "/bg-pln", request);
  }

  postUploadSupportDocument(file) {
    return this.postFileUpload(Configuration.SUPPORT_FILE, file);
  }

  postUploadFile(file, param) {
    return this.postFileUpload(Configuration.FILE + "/upload?type=" + param, file);
  }

  postUploadFileJaminan(file, param, id_jaminan, code_jaminan, tgl_terbit) {
    return this.postFileUpload(Configuration.FILE + "/upload?type=" + param + "&idJaminan=" + id_jaminan+ "&codeJaminan=" + code_jaminan+ "&tanggalTerbit=" + tgl_terbit, file);
  }

  getHistoryByNomorJaminan(id_jaminan) {
    let request = {};
    return this.getDataHeader(Configuration.HISTORY + "/" + id_jaminan, request);
  }

  deleteDataBankGuarantee(data) {
    let request = data;
    return this.deleteDataHeaderBody(Configuration.REGISTRATION, request);
  }

  sendManualDataTransfer(data){
    let request = data;
    return this.postData(Configuration.MANUAL_DATA_TRANSFER, request);
  }
}
