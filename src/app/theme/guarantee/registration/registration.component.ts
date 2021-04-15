import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import { Observable, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {BankGuaranteeService} from '../../../services/bank-guarantee.service';
import { FileManagementService } from '../../../services/file-management.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { ToastService } from 'src/app/services/toast.service';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import {ToastrService} from 'ngx-toastr';
import swal from 'sweetalert2';

export class BankGuarantee {
  id: number;
  bgNo: string;
  reffNo: number;
  applicant: string;
  currency: string;
  amount: string;
  publishDate: string;
  status: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: [
    './registration.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'],
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
export class RegistrationComponent implements OnInit {
  @ViewChild('spinner') spinner: SpinnerComponent;
  public data: Observable<BankGuarantee>;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public filter: any = {};

  // tobe delete
  public userName: string;
  public userID: string;
  public userProPic: string;
  public userEmail: string;
  public userPosition: string;
  public userOffice: string;
  public userAge: number;
  public userContact: string;
  public userDate: string;

  public userId: number;
  public userBgNo: string;
  public userReffNo: number;
  public userApplicant: string;
  public userCurrency: string;
  public userAmount: string;
  public userPublishDate: string;
  public userStatus: string;

  dataList: any = [];
  bgStatus: string = '';
  dataRolePrivilege :any =[];
  checkBoxShow : boolean = false;
  downloadFile = false;
  
  reqDeleted : any =[];

  //privilege
  createPriv = false;
  updatePriv = false;
  readPriv = false;
  approvePriv = false;
  deletePriv = false;

  @Input('modalDefault') modalDefault: any;

  constructor(
    public httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private fileManagementService: FileManagementService,
    private localStorageService: LocalStorageService,
    private toastService: ToastService,
    private registrationService: BankGuaranteeService) { }

  ngOnInit() {
    this.data = this.httpClient.get<BankGuarantee>(`assets/data/bg.json`);
    this.dataRolePrivilege = this.localStorageService.retrieve('privilege');
    this.checkPrivilege();
    this.handleLoadFirstData();
  }

  openMyModal(event) {
    document.querySelector('#' + event).classList.add('md-show');
  }

  openMyModalData(event) {
    this.userId = this.data[event]['id'];
    this.userBgNo = this.data[event]['bg_no'];
    this.userReffNo = this.data[event]['reff_no'];
    this.userApplicant = this.data[event]['applicant'];
    this.userCurrency = this.data[event]['currency'];
    this.userAmount = this.data[event]['amount'];
    this.userPublishDate = this.data[event]['publish_date'];
    this.userStatus = this.data[event]['status'];
  }

  closeMyModal(event) {
    ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  }

  getListAllBg(){
    const status = this.route.snapshot.paramMap.get('bg_status');
    if(status !== null || status !== ''){
      this.bgStatus = status;
    }else{
      this.bgStatus = null;
    }
    this.registrationService.getAllBg(this.bgStatus).subscribe(data=>{
        this.dataList = data;
    })
  }

  
  helloWorld() {
      alert('Hello world!');
  }

  handleCheckedToProses(item){
    item.checked = !item.checked
  }


  handleDeleteData(){
    this.reqDeleted = [];
    this.dataList.map( data =>{
      if(data.checked){
        this.reqDeleted.push({
          id: data.id
        })
      }
    });
    if(this.reqDeleted.length < 1){
      this.toastrService.warning('warning', 'Tidak Ada Bank Guaransi yang dipilih!!!');
    }else{
      swal({
        text: 'Are you sure want to delete this item?',
        type: 'error',
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.value) {
          this.spinner.isSpinnerVisible = true;
          this.registrationService.deleteDataBankGuarantee(this.reqDeleted).subscribe(data=>{
            this.modalDefault.hide();
          },error => {
            let errorBody = JSON.parse(error._body);
            this.toastService.error(errorBody.message || errorBody.error_description('failed to updated.'));
          });
          setTimeout(() => {
            this.spinner.isSpinnerVisible = false;
            this.getListAllBg();
          }, 1000);
        }else{
          this.spinner.isSpinnerVisible=false;
        }
      });
    }
    
  }

  handleLoadFirstData(){
      this.getListAllBg();
  }

  handleDownloadSuratKonfirmasi(id_jaminan){
    const tanda_tangan = false;
    this.fileManagementService.downloadSuratKonfirmasi('pdf',id_jaminan, tanda_tangan);
  }

  filterChanged(event: any) {
    this.filter = JSON.parse(JSON.stringify(this.filter));
  }
  checkPrivilege(){
    this.dataRolePrivilege.menus.forEach(menus => {
      if(menus.alias_menu == 'bank_guarantee'){
        if(menus.create_access){
          this.createPriv = true;
        }
        if(menus.read_access){
          this.readPriv = true;
        }
        if(menus.update_access){
          this.updatePriv = true;
        }
        if(menus.delete_access){
          this.deletePriv = true;
        }
        if(menus.approval_access){
          this.approvePriv = true;
        }
      }
    });
  }

  statusCheck(statusBG){
    let resultDelete = false;
    if(statusBG == "BG FROM STAGING" 
    || statusBG == "PENDING BG"
    || statusBG == "REJECTED BG"){
      resultDelete = true;
    }
    return resultDelete;
  }
}
