import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileManagementService } from 'src/app/services/file-management.service';
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import locale from '@angular/common/locales/id';

@Component({
  selector: 'app-guarantee-detail',
  templateUrl: './guarantee-detail.component.html',
  styleUrls: ['./guarantee-detail.component.scss'],
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

export class GuaranteeDetailComponent implements OnInit {
  @Input() dataRegistration: any = {};
  @Input() dataConfirmation: any = {};
  @Output() TabChange = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private fileManagementService: FileManagementService, ) { }

  ngOnInit() {
  }


  handleDownloadPDF() {
    let fileName = this.dataRegistration.softcopy_jaminan_url;
    let newFileName = fileName.slice(fileName.lastIndexOf("/") + 1, fileName.length);
    this.fileManagementService.downloadFile('pdf', newFileName);
    return false;
  }

  handleDownloadSuratKonfirmasi() {
    const tanda_tangan = true;
    this.fileManagementService.downloadSuratKonfirmasi('pdf', this.dataRegistration.id, tanda_tangan);
    return false;
  }

  tabChange(event: any) {
    this.TabChange.emit(event.nextId);
  }
}
