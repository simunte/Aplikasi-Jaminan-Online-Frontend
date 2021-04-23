import {  Component, OnInit, ViewEncapsulation } from '@angular/core';
/*import {NotificationsService} from 'angular2-notifications';*/

import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { BankGuaranteeService } from '../../../services/bank-guarantee.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultComponent implements OnInit {

  //MY VAR
  dataRolePrivilege: any = [];
  listDashboard: any;
  constructor(
    private localStorageService: LocalStorageService,
    private registrationService: BankGuaranteeService
  ) { // private servicePNotify: NotificationsService
  }

  ngOnInit() {
    this.dataRolePrivilege = this.localStorageService.retrieve('privilege');
    this.getAllDashboard();
  }

  getAllDashboard() {
    const role_user = this.dataRolePrivilege.name;
    this.registrationService.getDashboard().subscribe(data => {
      this.listDashboard = data;
    });
  }

  handleRouterLink(status, user) {
    if(user == 'user'){
      return '/user/user-access/' + status;
    }else{
      if(status == 'APPROVED BG'){
        return '/report/settlement/' + status;
      }else{
        return '/registration/' + status;
      }
    }
  }

  handleRouterLinkIT(status, master) {
    if (master === 'user') {
      return '/user/user-access/' + status;
    } else if (master === 'user_group') {
      return '/user/user-group/' + status;
    } else if (master === 'alamat_bank_penerbit') {
      return '/master/transactional/alamat-bank-penerbit/' + status;
    } else if (master === 'beneficiary') {
      return '/master/configuration/beneficiary/' + status;
    } else if (master === 'currency') {
      return '/master/transactional/currency/' + status;
    } else if (master === 'jenis_jaminan') {
      return '/master/transactional/jenis-jaminan/' + status;
    } else if (master === 'jenis_produk') {
      return '/master/transactional/jenis-produk/' + status;
    } else if (master === 'unit_pengguna') {
      return '/master/transactional/unit-pengguna/' + status;
    } else {
      return '/master/configuration/master-configuration/' + status;
    }
  }
}
