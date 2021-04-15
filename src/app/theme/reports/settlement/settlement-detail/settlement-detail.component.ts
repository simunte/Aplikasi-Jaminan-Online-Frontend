import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { BankGuaranteeService } from 'src/app/services/bank-guarantee.service';
import { ToastService } from 'src/app/services/toast.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-settlement-detail',
  templateUrl: './settlement-detail.component.html',
  styleUrls: [
    './settlement-detail.component.scss',
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

export class SettlementDetailComponent implements OnInit {
  dataRegistration: any = {};
  dataConfirmation: any = {};
  tabActive = 'guarantee';
  tabGuarantee = 'guarantee';
  tabConfirmation = 'confirmation';

  ACTION_SETTLE = 'SETTLEMENT';
  notes = '';
  privilage: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private registrationService: BankGuaranteeService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService) {
  }

  ngOnInit() {
    this.privilage = this.localStorageService.retrieve('privilege');
    this.handleLoadData();
  }

  handleLoadData() {
    const nomor_jaminan = this.route.snapshot.paramMap.get('id_jaminan');
    this.registrationService.getBgByNomorJaminan(nomor_jaminan).subscribe(data => {
      if (data) {
        this.dataRegistration = data;
      }
    });
    this.registrationService.getBgConfirmationByNomorJaminan(nomor_jaminan).subscribe(data => {
      if (data) {
        this.dataConfirmation = data;
      }
    });
  }

  tabChange(event: any) {
    this.tabActive = event
  }

  approval() {
    const data = { id_jaminan: this.dataRegistration.id, action: this.ACTION_SETTLE, notes: this.notes }
    this.registrationService.approvalBankGuarantee(data).subscribe(resp => {
      this.toastService.success('No. Jamininan ' + this.dataRegistration.nomor_jaminan + ' successfully settled.');
      this.router.navigate(['./report/settlement']);
    }, error => {
      let errorBody = error._body ? JSON.parse(error._body) : null;
      this.toastService.error(errorBody.message || errorBody.error_description || ('No. Jamininan ' + this.dataRegistration.nomor_jaminan + ' failed to settled.'));
    });
  }

  checkPrivilage(): boolean {
    if((this.dataRegistration.bank_guarantee_status === 'VERIFIED BG' && this.privilage.code === 'TRO_MAKER')
      || (this.dataRegistration.bank_guarantee_status === 'WAITING CHECKER SETTLEMENT' && this.privilage.code === 'TRO_CHECKER')
      || (this.dataRegistration.bank_guarantee_status === 'VERIFIED BG' && this.privilage.code === 'BENEFICIARY_USER')){
      return true;
    }else{
      return false;
    }
  }
}
