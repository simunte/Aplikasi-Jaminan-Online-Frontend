import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankGuaranteeService } from 'src/app/services/bank-guarantee.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { ModalBasicComponent } from 'src/app/shared/modal-basic/modal-basic.component';
import { ToastService } from 'src/app/services/toast.service';
import { LocalStorageService } from 'ngx-webstorage';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-verification-detail',
  templateUrl: './verification-detail.component.html',
  styleUrls: [
    './verification-detail.component.scss',
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

export class VerificationDetailComponent implements OnInit {
  @ViewChild('modalComment') modalComment: ModalBasicComponent;
  @ViewChild('spinner') spinner: SpinnerComponent;
  dataRegistration: any = {};
  dataConfirmation: any = {};
  tabActive = 'guarantee';
  tabGuarantee = 'guarantee';
  tabConfirmation = 'confirmation';

  ACTION_REJECT = 'REJECTION';
  ACTION_VERIFY = 'VERIFICATION'
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

  approval(action: string) {
    if (action == this.ACTION_REJECT) {
      this.modalComment.show();
    } else {
      this.spinner.isSpinnerVisible = true;
      const data = { id_jaminan: this.dataRegistration.id, action: action, notes: this.notes }
      this.registrationService.approvalBankGuarantee(data).subscribe(data => {
        this.toastService.success('No. Jamininan ' + this.dataRegistration.nomor_jaminan + ' successfully verified.');
        this.router.navigate(['./report/verification']);
        this.spinner.isSpinnerVisible = false;
      }, error => {
        let errorBody = error._body ? JSON.parse(error._body) : null;
        this.toastService.error(errorBody.message || errorBody.error_description || ('No. Jamininan ' + this.dataRegistration.nomor_jaminan + ' failed to verified.'));
        this.spinner.isSpinnerVisible = false;
      });
    }
  }

  reject() {
    this.spinner.isSpinnerVisible = true;
    const data = { id_jaminan: this.dataRegistration.id, action: this.ACTION_REJECT, notes: this.notes }
    this.registrationService.approvalBankGuarantee(data).subscribe(data => {
      this.toastService.success('No. Jamininan ' + this.dataRegistration.nomor_jaminan + ' successfully rejected.');
      this.router.navigate(['./report/verification']);
      this.spinner.isSpinnerVisible = false;
    }, error => {
      let errorBody = error._body ? JSON.parse(error._body) : null;
      this.toastService.error(errorBody.message || errorBody.error_description || ('No. Jamininan ' + this.dataRegistration.nomor_jaminan + ' failed to rejected.'));
      this.spinner.isSpinnerVisible = false;
      this.modalComment.hide();
    });
  }

  checkPrivilage(): boolean {
    if((this.dataRegistration.bank_guarantee_status === 'WAITING FOR VERIFICATION' && this.privilage.code === 'TRO_MAKER')
      || (this.dataRegistration.bank_guarantee_status === 'WAITING CHECKER VERIFICATION' && this.privilage.code === 'TRO_CHECKER')
      || (this.dataRegistration.bank_guarantee_status === 'WAITING FOR VERIFICATION' && this.privilage.code === 'BENEFICIARY_USER')){
      return true;
    }else{
      return false;
    }
  }

  checkPrivilageReject(): boolean {
    if((this.dataRegistration.bank_guarantee_status === 'WAITING CHECKER VERIFICATION' && this.privilage.code === 'TRO_CHECKER')
      || (this.dataRegistration.bank_guarantee_status === 'WAITING FOR VERIFICATION' && this.privilage.code === 'BENEFICIARY_USER')){
      return true;
    }else{
      return false;
    }
  }
}
