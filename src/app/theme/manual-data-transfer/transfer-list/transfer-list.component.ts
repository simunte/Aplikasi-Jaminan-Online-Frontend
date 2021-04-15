import {Component, OnInit, ViewChild} from '@angular/core';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Router, ActivatedRoute } from '@angular/router';
import {BankGuaranteeService} from '../../../services/bank-guarantee.service';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss']
})
export class TransferListComponent implements OnInit {
  @ViewChild('spinner') spinner: SpinnerComponent;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public filter: any = {};

  dataRolePrivilege :any =[];
  bgStatus: string = '';
  dataList: any = [];
  reqSend: any = [];
  actionCheck = false;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private registrationService: BankGuaranteeService
  ) { }

  ngOnInit() {
    this.dataRolePrivilege = this.localStorageService.retrieve('privilege');
    this.handleLoadFirstData();
  }

  handleLoadFirstData(){
    this.getListAllBg();
  }

  getListAllBg(){ 
    const status = this.route.snapshot.paramMap.get('bg_status');
    if(status !== null || status !== ''){
      this.bgStatus = status;
    }else{
      this.bgStatus = null;
    }
    this.registrationService.getAllManualDataTransfer().subscribe(data=>{
        this.dataList = data;
    })
    if(this.dataRolePrivilege.code === 'TRO_CHECKER'){
      this.actionCheck=true;
    }
  }   

  handleCheckedToProses(item){
    item.checked = !item.checked
  }

  handleKirimBankGuarantee(){
    this.spinner.isSpinnerVisible = true;
    this.reqSend = [];
    this.dataList.map( data =>{
      if(data.checked){
        this.reqSend.push({
          id: data.id
        })
      }
    });
    this.registrationService.sendManualDataTransfer(this.reqSend).subscribe(data=>{
      this.handleLoadFirstData();
      this.spinner.isSpinnerVisible = false;
    }, (error:any) => {
        var error = JSON.parse(error._body);
        this.toastrService.error(error.message != null ? error.message : 'Gagal Mengirimkan ke ABG');
        this.spinner.isSpinnerVisible = false;
    });
  }

  filterChanged(event: any) {
    this.filter = JSON.parse(JSON.stringify(this.filter));
  }

  
}
