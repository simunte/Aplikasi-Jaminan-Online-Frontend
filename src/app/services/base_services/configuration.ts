export class Configuration {
  //BASE
  public static get BASE_HOST(): string { return 'https://ajo.bgonline.uob.co.id/'; }
  // public static get BASE_HOST(): string { return 'http://localhost:8083/'; }
  public static get BASE_URL(): string { return 'api/v1/'; }
  public static get BASE_URL_APU(): string { return 'apu/v1/'; }
  public static get API_URL(): string { return this.BASE_HOST + this.BASE_URL; }
  public static get APU_URL(): string { return this.BASE_HOST + this.BASE_URL_APU; }

  //API LIST
  public static get LOGIN(): string { return this.BASE_HOST + 'oauth/token'; }
  public static get LOGOUT(): string { return this.API_URL + 'logout'; }
  public static get USER(): string { return this.API_URL + 'users'; }
  public static get ROLE(): string { return this.API_URL + 'role'; }
  public static get ROLE_CUSTOMIZE(): string { return this.API_URL + 'role-customize'; }
  public static get REGISTRATION(): string { return this.API_URL + 'registration'; }
  public static get CONFIRMATION(): string { return this.API_URL + 'confirmation'; }
  public static get FILE(): string { return this.API_URL + 'file'; }
  public static get HISTORY(): string { return this.API_URL + 'history'; }
  public static get DASHBOARD(): string { return this.API_URL + 'dashboard'; }
  public static get MENUS(): string { return this.API_URL + 'menus'; }
  public static get COLUMN(): string { return this.API_URL + 'column'; }
  public static get DELETEROLE(): string { return this.API_URL + 'delete-role'; }
  public static get APPROVEORREJECT(): string { return this.API_URL + 'action'; }
  public static get ROLEUSER(): string { return this.API_URL + 'role-user-login'; }
  public static get FIRSTLOGIN(): string { return this.API_URL + 'first-login'; }
  public static get CHANGE_PASSWORD(): string { return this.API_URL + 'change-password'; }
  public static get APPROVE_REJECT_USER(): string { return this.API_URL + 'users/approve-reject'; }
  public static get DELETE_USER(): string { return this.API_URL + 'delete-user'; }
  public static get ROLE_TEMP(): string { return this.API_URL + 'role-temp'; }
  public static get MANUAL_DATA_TRANSFER(): string { return this.API_URL + 'manual/transfer'; }
  public static get USER_UNLOCK(): string { return this.API_URL + 'unlock'; }
  public static get LOGIN_ATTEMPT(): string { return this.APU_URL + 'count'; }
  public static get RESET_PASSWORD(): string { return this.API_URL + 'reset-password'; }
  public static get USER_HISTORY(): string { return this.API_URL + 'user-history'; }
  public static get RESET_COUNT_DISABLED(): string { return this.APU_URL + 'reset-count-disabled'; }
  public static get AUDIT_TRAIL(): string { return this.API_URL + 'audit/trail'; }

  //MASTER DATA
  public static get CURRENCY(): string { return this.API_URL + 'currency'; }
  public static get JAMINAN(): string { return this.API_URL + 'jaminan'; }
  public static get PRODUK(): string { return this.API_URL + 'produk'; }
  public static get PENGGUNA(): string { return this.API_URL + 'pengguna'; }
  public static get URAIAN_PEKERJAAN(): string { return this.API_URL + 'uraian/pekerjaan'; }
  public static get BENEFICIARY(): string { return this.API_URL + 'beneficiary'; }
  public static get CONFIGURATION(): string { return this.API_URL + 'master/configuration'; }
  public static get ALAMAT_BANK_PENERBIT(): string { return this.API_URL + 'alamat/bank/penerbit'; }

  //------------------------MENU----------------------------------//
  // public static get user(): string { return 'user';}
  // public static get role(): string { return 'roles';}
  public static get home(): string { return 'home'; }
  public static get bank_guarantee(): string { return 'bank_guarantee'; }
  public static get rekapitulasi(): string { return 'rekapitulasi'; }
  public static get verifikasi(): string { return 'verifikasi'; }
  public static get settlement(): string { return 'settlement'; }
  public static get user_access(): string { return 'user_access'; }
  public static get user_groups(): string { return 'user_groups'; }
  public static get transaction(): string { return 'transaction'; }
  public static get trans_guarantee(): string { return 'trans_guarantee'; }
  public static get trans_product(): string { return 'trans_product'; }
  public static get trans_detail_job(): string { return 'trans_detail_job'; }
  public static get trans_currency(): string { return 'trans_currency'; }
  public static get trans_unit_pengguna(): string { return 'trans_unit_pengguna'; }
  public static get trans_alamat_bank_penerbit(): string { return 'trans_alamat_bank_penerbit'; }
  public static get configuration(): string { return 'configuration'; }
  public static get conf_email(): string { return 'conf_email'; }
  public static get conf_configuration(): string { return 'conf_configuration'; }
  public static get conf_beneficiary(): string { return 'conf_beneficiary'; }
  public static get conf_parameter(): string { return 'conf_parameter'; }
  public static get manual_data_transfer(): string { return 'manual_data_transfer'; }
  public static get audit_trail(): string { return 'audit_trail'; }
}
