import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterDataService } from 'src/app/services/master-data.service';
import { LocalStorageService } from 'ngx-webstorage';
import { CreateUser } from './create-user';
import { BankGuaranteeService } from 'src/app/services/bank-guarantee.service';
import { Route, Router } from '@angular/router'
import * as _ from 'lodash';
import { ToastService } from 'src/app/services/toast.service';
import { translateTemplates } from '@swimlane/ngx-datatable/release/utils';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-user-access-create',
  templateUrl: './user-access-create.component.html',
  styleUrls: ['./user-access-create.component.scss']
})
export class UserAccessCreateComponent implements OnInit {
  @ViewChild("upload") upload;
  @ViewChild('spinner') spinner : SpinnerComponent;
  allRole: [];
  allBeneficiary: [];
  showBeneficiary: boolean = false;
  showSignature: boolean = false;
  selectedRole: any;
  selectedRoleObj = [];
  isSelectedRole: boolean = false;
  selectedBeneficiary: any;
  selectedBeneficiaryObj: any;
  //model
  isExternal: boolean = false;
  username: string = null;
  employeeName: string = null;
  employeeEmail: string = null;
  password: any;
  urlSignature: any;
  originalFileName: any;
  allUserAD: [];
  data: any;
  keyword: any;
  showAC: boolean = false;
  position:  string = null;
  response: any;
  chooseGroup :any;

  public fileName = "";
  roleDDL: [];
  beneficaryDDL: [];

  constructor(
    private masterDataService: MasterDataService,
    private localStorageservice: LocalStorageService,
    private registrationService: BankGuaranteeService,
    private toastService: ToastService,
    private router: Router,
    private transService : TranslateService
  ) { }

  ngOnInit() {
    this.getAllRole();
    this.getAllBeneficiray();
    this.getRoleUserLoggedIn()
    this.chooseGroup=""
  }

  uploadSignature() {
    const files: { [key: string]: File } = this.upload.nativeElement.files;
    var formData = new FormData();
    var extention = files[0].name.match(/\.[0-9a-z]+$/i);
    let acceptExtension = ['.png', '.jpg', '.jpeg', 'gif']

    if (_.indexOf(acceptExtension, extention[0].toLowerCase()) != -1) {
      if (files[0].size < 1048576) {
        formData.append('file', files[0]);
        this.registrationService.postUploadFile(formData, extention[0].toLowerCase().replace('.', '')).subscribe(data => {
          this.originalFileName = data.originalFileName;
          this.urlSignature = data.fileSaveUrl;
        }, error => {
          let errorBody = error._body ? JSON.parse(error._body) : null;
          this.toastService.error(errorBody.message || errorBody.error_description);
        }
        );
      } else {
        this.toastService.warning('File size can not bigger than 1MB');
      }
    } else {
      this.toastService.warning('Not Support Type File');
    }
    formData.append('file', files[0]);
  }

  selectEvent(data) {
    this.username = data.username;
    this.employeeEmail = data.email;
    this.employeeName = data.fullName;

    // do something with selected item
  }

  onChangeSearch(val: string) {
    this.keyword = 'username';
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e) {
    // do something when input is focuse
  }

  getRoleUserLoggedIn() {
    let roleLoggedIn = this.localStorageservice.retrieve('privilege')
    if (roleLoggedIn.code == 'BANK_ADMIN_2_MAKER' || roleLoggedIn.code == 'BENEFICIARY_ADMIN_1') {
      this.showAC = true;
    }

    if (roleLoggedIn.code == 'BANK_ADMIN_2_MAKER') {
      this.showBeneficiary = true;
    }
  }

  getAllRole() {
    this.masterDataService.getAllRoleByUser().subscribe(data => {
      this.allRole = data;
      const test = data.map(x => {
        return {
          value: x.name,
          label: x.name,
          data: x
        };
      });
      this.roleDDL = test;
    })
  }

  handleBeneficiary(event) {
    let bnf = event.data
    this.selectedBeneficiaryObj = bnf.id
    this.selectedBeneficiary = bnf.nama_beneficiary;
  }

  handleRole(event) {
    this.isSelectedRole = true;
    let data = event.data;
    this.selectedRoleObj = data;
    this.selectedRole = data.name;
    if (data.code == 'TRO_CHECKER') {
      this.showSignature = true;
      this.showBeneficiary = false;
      this.isExternal = false;
    } else if(data.code == "BENEFICIARY_USER"){
      this.showBeneficiary = true;
      this.showSignature = false;
      this.isExternal = true;
    }else {
      this.showSignature = false;
      this.showBeneficiary = false;
      this.isExternal = false;
    }
  }

  getAllBeneficiray() {
    const status = '';
    this.masterDataService.getAllBeneficiary(status).subscribe(data => {
      this.allBeneficiary = data;
      const test = data.map(x => {
        return {
          value: x.nama_beneficiary,
          label: x.nama_beneficiary,
          data: x
        };
      });
      this.beneficaryDDL = test;
    })
  }

  submit() {
    this.spinner.isSpinnerVisible = true;
    if(this.username == null || this.username == undefined){
      this.spinner.isSpinnerVisible=false;
      return this.toastService.error("Username wajib diisi");
    }
    if(this.username.indexOf(' ') !== -1){
      this.spinner.isSpinnerVisible = false;
      return this.toastService.error("username mengandung spasi")
    }
    this.spinner.isSpinnerVisible = true;
    let objRequest = new CreateUser();
    
    objRequest.id = null;
    objRequest.username = this.username;
    objRequest.first_name = this.employeeName;
    objRequest.email = this.employeeEmail;
    objRequest.password = this.password;
    objRequest.beneficiaryId = this.selectedBeneficiaryObj;
    objRequest.signature = this.urlSignature;
    objRequest.position = this.position;
    objRequest.isExternal = this.isExternal;
    objRequest.nama_beneficiary = this.selectedBeneficiary;
    if (!this.isSelectedRole) {
      objRequest.roles = null;
    } else {
      objRequest.roles.push(this.selectedRoleObj)
    }
    this.masterDataService.addUser(objRequest).subscribe(data => {
      if (data) {
        this.toastService.success('Sukses tambah user')
        this.router.navigate(['/user/user-access'])
        this.spinner.isSpinnerVisible = false;
      }
    }, error => {
      this.spinner.isSpinnerVisible = false;
      let errorBody = error._body ? JSON.parse(error._body) : null;
      this.toastService.error(errorBody.message || errorBody.error_description);
    })
  }

}
