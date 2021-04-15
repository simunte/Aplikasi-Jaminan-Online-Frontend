import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BankGuaranteeService } from 'src/app/services/bank-guarantee.service';
import { FileManagementService } from '../../../../services/file-management.service';

@Component({
  selector: 'app-recapitulation-detail',
  templateUrl: './recapitulation-detail.component.html',
  styleUrls: [
    './recapitulation-detail.component.scss'
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
export class RecapitulationDetailComponent implements OnInit {
  dataRegistration: any = {};
  dataConfirmation: any = {};
  tabActive = 'guarantee';
  tabGuarantee = 'guarantee';
  tabConfirmation = 'confirmation';

  constructor(public httpClient: HttpClient,
    private route: ActivatedRoute,
    private fileManagementService: FileManagementService,
    private registrationService: BankGuaranteeService) {
  }

  ngOnInit() {
    this.handleLoadData();
  }

  handleLoadData() {
    const id_jaminan = this.route.snapshot.paramMap.get('id_jaminan');
    this.registrationService.getBgByNomorJaminan(id_jaminan).subscribe(data => {
      if (data) {
        this.dataRegistration = data;
      }
    });
    this.registrationService.getBgConfirmationByNomorJaminan(id_jaminan).subscribe(data => {
      if (data) {
        this.dataConfirmation = data;
      }
    });
  }

  tabChange(event: any) {
    this.tabActive = event
  }
}
