import { Injectable } from '@angular/core';
import { BaseService } from './base_services/base.service';
import { Http } from '@angular/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Configuration } from './base_services/configuration';

@Injectable()
export class MasterDataService extends BaseService {

  constructor(
    http: Http,
    localStorageService: LocalStorageService) {
    super(http, localStorageService);
  }

  //ALAMAT BANK PENERBIT
  getAllAlamatBank() {
    let request = {};
    return this.getDataHeader(Configuration.ALAMAT_BANK_PENERBIT, request);
  }
  addAlamatBank(data) {
    return this.postData(Configuration.ALAMAT_BANK_PENERBIT, data);
  }
  updateAlamatBank(data) {
    return this.putData(Configuration.ALAMAT_BANK_PENERBIT, data);
  }

  //BENEFICIARY
  getAllBeneficiary(status) {
    let request = { "status": status };
    return this.getDataHeader(Configuration.BENEFICIARY, request);
  }
  addBeneficiary(data) {
    return this.postData(Configuration.BENEFICIARY, data);
  }
  updateBeneficiary(data) {
    return this.putData(Configuration.BENEFICIARY, data);
  }

  deleteBeneficiary(data) {
    return this.deleteDataHeaderBody(Configuration.BENEFICIARY, data);
  }

  approvalBeneficiary(data: any) {
    return this.postData(Configuration.BENEFICIARY + '/approval', data);
  }

  //MASTER CONFIGURATION
  getMasterConfigurationById() {
    return this.getDataHeaderByIdNoParams(Configuration.CONFIGURATION, 1);
  }

  getAllMasterConfiguration(status) {
    let request = { "status": status };
    return this.getDataHeader(Configuration.CONFIGURATION, request);
  }
  addMasterConfiguration(data) {
    return this.postData(Configuration.CONFIGURATION, data);
  }
  updateMasterConfiguration(data) {
    return this.putData(Configuration.CONFIGURATION, data);
  }

  deleteMasterConfiguration(data) {
    return this.deleteDataHeaderBody(Configuration.CONFIGURATION, data);
  }

  approvalMasterConfiguration(data: any) {
    return this.postData(Configuration.CONFIGURATION + '/approval', data);
  }

  //CURRENCY
  getAllCurrency(status) {
    let request = { "status": status };
    return this.getDataHeader(Configuration.CURRENCY, request);
  }
  addCurrency(data) {
    return this.postData(Configuration.CURRENCY, data);
  }
  updateCurrency(data) {
    return this.putData(Configuration.CURRENCY, data);
  }

  deleteCurrency(data) {
    return this.deleteDataHeaderBody(Configuration.CURRENCY, data);
  }

  approvalCurrency(data: any) {
    return this.postData(Configuration.CURRENCY + '/approval', data);
  }

  //JENIS-JAMINAN
  getAllJenisJaminan(status) {
    let request = { "status": status };
    return this.getDataHeader(Configuration.JAMINAN, request);
  }
  addJenisJaminan(data) {
    return this.postData(Configuration.JAMINAN, data);
  }
  updateJenisJaminan(data) {
    return this.putData(Configuration.JAMINAN, data);
  }

  deleteJenisJaminan(data) {
    return this.deleteDataHeaderBody(Configuration.JAMINAN, data);
  }

  approvalJenisJaminan(data: any) {
    return this.postData(Configuration.JAMINAN + '/approval', data);
  }

  //JENIS-PRODUK
  getAllJenisProduk(status) {
    let request = { "status": status };
    return this.getDataHeader(Configuration.PRODUK, request);
  }
  addJenisProduk(data) {
    return this.postData(Configuration.PRODUK, data);
  }
  updateJenisProduk(data) {
    return this.putData(Configuration.PRODUK, data);
  }

  deleteJenisProduk(data) {
    return this.deleteDataHeaderBody(Configuration.PRODUK, data);
  }

  approvalJenisProduk(data: any) {
    return this.postData(Configuration.PRODUK + '/approval', data);
  }

  //UNIT-PENGGUNA
  getAllUnitPengguna(status) {
    let request = { "status": status };
    return this.getDataHeader(Configuration.PENGGUNA, request);
  }
  addUnitPengguna(data) {
    return this.postData(Configuration.PENGGUNA, data);
  }
  updateUnitPengguna(data) {
    return this.putData(Configuration.PENGGUNA, data);
  }

  deleteUnitPengguna(data) {
    return this.deleteDataHeaderBody(Configuration.PENGGUNA, data);
  }

  approvalUnitPengguna(data: any) {
    return this.postData(Configuration.PENGGUNA + '/approval', data);
  }

  //ALAMAT-BANK-PENERBIT
  getAllAlamatBankPenerbit(status) {
    let request = { "status": status };
    return this.getDataHeader(Configuration.ALAMAT_BANK_PENERBIT, request);
  }
  addAlamatBankPenerbit(data) {
    return this.postData(Configuration.ALAMAT_BANK_PENERBIT, data);
  }
  updateAlamatBankPenerbit(data) {
    return this.putData(Configuration.ALAMAT_BANK_PENERBIT, data);
  }

  deleteAlamatBankPenerbit(data) {
    return this.deleteDataHeaderBody(Configuration.ALAMAT_BANK_PENERBIT, data);
  }

  approvalAlamatBankPenerbit(data: any) {
    return this.postData(Configuration.ALAMAT_BANK_PENERBIT + '/approval', data);
  }

  //URAIAN-PEKERJAAN
  getAllUraianPekerjaan() {
    let request = {};
    return this.getDataHeader(Configuration.URAIAN_PEKERJAAN, request);
  }
  addUraianPekerjaan(data) {
    return this.postData(Configuration.URAIAN_PEKERJAAN, data);
  }
  updateUraianPekerjaan(data) {
    return this.putData(Configuration.URAIAN_PEKERJAAN, data);
  }

  //ROLE
  getRoleMenu(data) {
    return this.getDataById(Configuration.ROLE, data);
  }

  // getAllRoleMenu(status) {
  //   let request = { "status": status };
  //   return this.getDataHeader(Configuration.ROLE, request);
  // }
  getAllRoleMenu(status) {
    let request = { "status": status };
    return this.getDataHeader(Configuration.ROLE_CUSTOMIZE, request);
  }

  getAllMenus() {
    return this.getAllData(Configuration.MENUS);
  }

  updateRole(data) {
    return this.postData(Configuration.ROLE, data);
  }

  getAllUser(status) {
    let request = { "status": status };
    return this.getDataHeader(Configuration.USER, request);
  }

  addRole(data) {
    return this.postData(Configuration.ROLE, data);
  }

  deleteRole(data) {
    return this.postData(Configuration.DELETEROLE, data);
  }

  approveorreject(data) {
    return this.postData(Configuration.APPROVEORREJECT, data);
  }

  getAllRoleByUser() {
    return this.getAllData(Configuration.ROLEUSER);
  }

  getAllRole() {
    return this.getData(Configuration.ALL_ROLE);
  }


  saveRoleTemp(data) {
    return this.postData(Configuration.ROLE_TEMP, data)
  }

  getRoleTemp(data) {
    return this.getDataById(Configuration.ROLE_TEMP, data)
  }

  //USER
  addUser(data) {
    return this.postData(Configuration.USER, data);
  }

  addUserNasabah(data) {
    return this.postNoAuth(Configuration.USER_NASABAH, data);
  }

  approveOrRejectUser(data) {
    return this.postData(Configuration.APPROVE_REJECT_USER, data);
  }

  deleteuser(data) {
    return this.postData(Configuration.DELETE_USER, data)
  }

  getUser(username) {
    return this.getDataHeaderNoParams(Configuration.USER + "/" + username)
  }

  //NASABAH
  saveDetailNasabah(data) {
    return this.postData(Configuration.NASABAH, data);
  }

  getDetailNasabah(username) {
    return this.getDataHeaderNoParams(Configuration.NASABAH + "/" + username)
  }
  //END NASABAH

  unlockUser(username) {
    return this.postData(Configuration.USER_UNLOCK, username)
  }

  resetPassword(username) {
    return this.postData(Configuration.RESET_PASSWORD, username)
  }

  getHistoryUser(userId) {
    return this.getDataHeaderByIdNoParams(Configuration.USER_HISTORY, userId)
  }
}
