import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Router, ActivatedRoute } from '@angular/router';
import {animate, style, transition, trigger} from '@angular/animations';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import {ToastrService} from 'ngx-toastr';
import { AuditTrailService } from '../../../services/audit-trail.service';
import { ModalBasicComponent } from 'src/app/shared/modal-basic/modal-basic.component';
import { FileManagementService } from '../../../services/file-management.service';


@Component({
  selector: 'app-audit-trail',
  templateUrl: './audit-trail.component.html',
  styleUrls: [
    './audit-trail.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({opacity: 0}),
        animate('400ms ease-in-out', style({opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translate(0)'}),
        animate('400ms ease-in-out', style({opacity: 0}))
      ])
    ])
  ]
})
export class AuditTrailComponent implements OnInit {
  @ViewChild('modalDefault') modalDefault: ModalBasicComponent;
  @ViewChild('spinner') spinner: SpinnerComponent;
  model: NgbDateStruct;
  placement = 'bottom';
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public filter: any = {};
  public request: any = {};
  dataRolePrivilege :any =[];
  downloadKind: any = ["XLSX"]

  public startDateFilter : any = new Date().getTime();
  public endDateFilter : any = new Date().getTime();
  public moduleFilter = 'all';
  public modulPlaceHolder = 'All Module'

  
  defaultDate : any = 
    {
      start_date_default : new Date().getTime(),
      end_date_default : new Date().getTime(),
    }

  modulDDL: any = [
    { value: "all",
      label: "All Module",
      data: "All Module" 
    },
    { value: "User Module",
      label: "User",
      data: "User Module" 
    },
    { value: "Password History Module",
      label: "Password History",
      data: "Password History Module" 
    },
    { value: "Uraian Pekerjaan Module",
      label: "Uraian Pekerjaan",
      data: "Uraian Pekerjaan Module" 
    },
    { value: "Unit Pengguna Module",
      label: "Unit Pengguna",
      data: "Unit Pengguna Module" 
    },
    {value: "Bank Penerbit Module",
      label: "Bank Penerbit",
      data: "Bank Penerbit Module" 
    },
    { value: "BG HISTORY Module",
      label: "BG History",
      data: "BG History Module" 
    },
    { value: "Beneficiary Module",
      label: "Beneficiary",
      data: "Beneficiary Module" 
    },
    { value: "BG REGISTRATION Module",
      label: "BG Registration",
      data: "BG REGISTRATION Module" 
    },
    { value: "Currency Module",
      label: "Currency",
      data: "Currency Module" 
    },
    { value: "Jenis Jaminan Module",
      label: "Jenis Jaminan",
      data: "Jenis Jaminan Module" 
    },{
      value: "Jenis Produk Module",
      label: "Jenis Produk",
      data: "Jenis Produk Module" 
    },
    { value: "Master Configuration Module",
      label: "Master Configuration",
      data: "Master Configuration Module" 
    },
    { value: "Role Module",
      label: "Role",
      data: "Role Module" 
    }
  ]

  dataList: any = [];
  public dialogMode: string;
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private auditTrailService: AuditTrailService,
    private fileManagementService: FileManagementService,
  ) { }

  ngOnInit() {
    this.dataRolePrivilege = this.localStorageService.retrieve('privilege');
    let dateNew = new Date();
    dateNew.setMonth(dateNew.getMonth() - 1 );
    this.startDateFilter = new Date(dateNew).getTime();
    this.defaultDate.start_date_default = this.startDateFilter;
    this.getListAllBg();
  }

  filterChanged(event: any) {
    this.filter = JSON.parse(JSON.stringify(this.filter));
  }

  getListAllBg(){ 
    this.auditTrailService.getAllAuditLog(this.startDateFilter, this.endDateFilter, this.moduleFilter).subscribe(data=>{
        this.dataList = data;
    })
  }  

  openDetail(item: any, mode: string) {
    this.dialogMode = mode;
    this.request = item;
    this.modalDefault.show();
  }

  exportData(idTable) {
    let fileName = "Audit Trail";
    this.fileManagementService.exportAsExcelFileByElement(idTable, fileName);
  }

  getStartDateFilter(date){
    var tempDate = `${date.year}/${date.month}/${date.day}`;
    var tempDateTime = new Date(tempDate).getTime();
    this.startDateFilter = tempDateTime;
  }

  getEndDateFilter(date){
    var tempDate = `${date.year}/${date.month}/${date.day}`;
    var tempDateTime = new Date(tempDate).getTime();
    this.endDateFilter = tempDateTime;
  }

  changeModule(data){
    this.moduleFilter = data.value;
    this.modulPlaceHolder = data.label;
  }
}
