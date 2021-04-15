import { FileManagementService } from './../../../services/file-management.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterDataService } from 'src/app/services/master-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalBasicComponent } from 'src/app/shared/modal-basic/modal-basic.component';
import { ApproveOrReject } from './approve-reject';
import { CreateUser } from './user-access-create/create-user';
import { BankGuaranteeService } from 'src/app/services/bank-guarantee.service';
import { LocalStorageService } from 'ngx-webstorage';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import swal from 'sweetalert2';
import { ToastService } from 'src/app/services/toast.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-access',
  templateUrl: './user-access.component.html',
  styleUrls: ['./user-access.component.scss'],
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
export class UserAccessComponent implements OnInit {

  public dataUser: Observable<any>;
  //default
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public filter: any = {};

  employeeName: string = null;
  employeeEmail: string = null;
  role: string = null;
  userGroup: any;
  beneficiary: any;
  username: string = null;
  group: any;
  status: any;
  userId: any;
  note: string = null;
  showBeneficiary: boolean = false;
  showSignature: boolean = false;
  selectedRole: any;
  selectedRoleObj = [];
  selectedBeneficiary: any;
  selectedBeneficiaryObj: any;
  urlSignature: any;
  position: any;
  allRole: [];
  roleDDL: [];
  detailUser: any;
  originalFileName: any;
  keyword: any;
  showAC: any;
  roleLoggedIn: any;
  tempUsername: any;
  hideApprove: boolean = true;
  deleteUser = [];
  response: any;
  isExternal: boolean;
  allBeneficiary: any= [];
  beneficaryDDL: [];
  signature: any;
  statusUser: any;
  paramStatus: any;
  hideUnlock: boolean = true;
  hideResetPassword: boolean = true;
  signatureLoaded = false;
  historyData: any = [];


  downloadKind: any = ["XLSX"]

  @ViewChild('modalDetail') modalDetail: ModalBasicComponent
  @ViewChild('modalNote') modalNote: ModalBasicComponent
  @ViewChild('modalReject') modalReject: ModalBasicComponent
  @ViewChild("upload") upload;
  @ViewChild('spinner') spinner : SpinnerComponent;
  constructor(
    private masterDataService: MasterDataService,
    private router: Router,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private registrationService: BankGuaranteeService,
    private localStorageService: LocalStorageService,
    private fileManagementService: FileManagementService,
    private sanitizer: DomSanitizer,
    private translate : TranslateService) { }


  ngOnInit() {
    this.getAllUser()
    this.getAllRole()
    this.getRoleUserLoggedIn()
    this.getAllBeneficiray()

  }

  filterChanged(event: any) {
    this.filter = JSON.parse(JSON.stringify(this.filter));
  }

  getAllUser() {
    const status = this.route.snapshot.paramMap.get('u_status');
    this.paramStatus = status;
    this.masterDataService.getAllUser(this.paramStatus).subscribe(data => {
      this.dataUser = data
    })
  }

  register() {
    this.router.navigate(['/user/user-access-create']);
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.signature = this.sanitizer.bypassSecurityTrustResourceUrl(reader.result.toString());
      this.signatureLoaded = true;
    }, false);

    if (image) {
      const blob = new Blob([image], { type: 'application/png' });
      reader.readAsDataURL(blob);
    }
  }

  showModal(user) {
    if (user.signature) {
      this.fileManagementService.downloadFileWithPath(user.signature).subscribe(blob => {
        this.createImageFromBlob(blob);
      }, error => {
        this.signatureLoaded = true;
        this.signature = null;
      });
    }

    
    if (user.roles[0].code == 'BENEFICIARY_ADMIN_1' || user.roles[0].code == 'BENEFICIARY_ADMIN_2' || user.roles[0].code == 'BENEFICIARY_USER') {
      this.isExternal = true;
    } else {
      this.isExternal = false;
    }

    if (user.roles[0].code == 'BENEFICIARY_ADMIN_1' || user.roles[0].code == 'BENEFICIARY_ADMIN_2') {
      this.showBeneficiary = true;
    } else {
      this.showBeneficiary = false;
    }

    if (user.status == 'ACTIVE' || user.status == 'REJECTED RESET PASSWORD') {
      this.hideApprove = true;
      this.hideResetPassword = false;
      this.hideUnlock = true;
    } else if (user.status == 'LOCKED') {
      this.hideApprove = true;
      this.hideResetPassword = true;
      this.hideUnlock = false;
    } else {
      this.hideApprove = false;
      this.hideResetPassword = true;
      this.hideUnlock = true;
    }
    
    this.selectedBeneficiary = user.nama_beneficiary;
    for(var i =0; i<this.allBeneficiary.length; i++){ 
      if(this.allBeneficiary[i].nama_beneficiary == user.nama_beneficiary){
        this.selectedBeneficiaryObj = this.allBeneficiary[i].id
      } 
    }
    this.selectedRoleObj = null;
    this.selectedRole = null;
    this.userId = user.id
    this.group = user.roles[0].code
    this.tempUsername = user.username
    this.username = user.username
    this.employeeName = user.first_name
    this.employeeEmail = user.email
    this.status = user.status
    this.note = user.note;
    this.position = user.position
    this.selectedRole = user.roles[0].name;
    this.selectedRoleObj = user.roles[0];
    

    if (this.group == 'TRO_CHECKER') {
      this.showSignature = true;
    } else {
      this.showSignature = false;
    }

    if (user.status == 'REJECTED') {
      this.modalReject.show()
      
    } else {
      this.modalDetail.show();
    }
    this.getUserhistory(user.id);
  }

  reject() {
    this.modalDetail.hide();
    if (this.status == 'WAITING FOR APPROVAL' || this.status == 'WAITING FOR DELETION APPROVAL' || this.status == 'WAITING FOR APPROVAL RESET PASSWORD') {
      this.note = '';
      this.modalNote.show();
    } else {
      this.spinner.isSpinnerVisible=true;
      let request = new ApproveOrReject()
      request.note = this.note
      request.userId = this.userId
      request.action = 'Reject'
      this.masterDataService.approveOrRejectUser(request).subscribe(data => {
        if (data) {
          this.toastService.success("Berhasil Reject")
          this.modalDetail.hide();
          this.modalNote.hide();
          this.spinner.isSpinnerVisible=false;
          this.getAllUser();
        }
      }, error => {
        let errorBody = error._body ? JSON.parse(error._body) : null;
        this.toastService.error(errorBody.message || errorBody.error_description);
        this.spinner.isSpinnerVisible=false;
      });
    }
  }

  action(action) {
    if (action == 'REJECT') {
      if (this.note == null || this.note == "") {
        this.toastService.error("Komentar tidak boleh kosong")
      } else {
        this.spinner.isSpinnerVisible=true;
        let request = new ApproveOrReject()
        request.note = this.note
        request.userId = this.userId
        request.action = action
        this.masterDataService.approveOrRejectUser(request).subscribe(data => {
          if (data) {
            this.toastService.success("Berhasil " + action)
            this.modalDetail.hide();
            this.modalNote.hide();
            this.spinner.isSpinnerVisible=false;
            this.getAllUser();
            
          }
        }, error => {
          let errorBody = error._body ? JSON.parse(error._body) : null;
          this.toastService.error(errorBody.message || errorBody.error_description);
          this.spinner.isSpinnerVisible=false;
        });
      }
    } else {
      this.spinner.isSpinnerVisible=true;
      let request = new ApproveOrReject()
      request.note = this.note
      request.userId = this.userId
      request.action = action
      this.masterDataService.approveOrRejectUser(request).subscribe(data => {
        
        if (data) {
          this.toastService.success("Berhasil " + action)
          this.modalDetail.hide();
          this.modalNote.hide();
          this.spinner.isSpinnerVisible=false;
          this.getAllUser();
          
        }
      }, error => {
        let errorBody = error._body ? JSON.parse(error._body) : null;
        this.toastService.error(errorBody.message || errorBody.error_description);
        this.spinner.isSpinnerVisible=false;
      });
    }
  }

  handleBeneficiary(event) {
    let bnf = event.data
    this.selectedBeneficiaryObj = bnf.id
    this.selectedBeneficiary = bnf.nama_beneficiary;
  }

  handleRole(event) {
    let data = event.data;
    this.selectedRoleObj = data;
    this.selectedRole = data.name;
    if (data.code == 'TRO_CHECKER') {
      this.showSignature = true;
    } else {
      this.showSignature = false;
    }
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


  submit() {
    this.spinner.isSpinnerVisible=true;

    if(this.username == null || this.username == ""){
      this.spinner.isSpinnerVisible=false;
      return this.toastService.error("Username wajib diisi");
    }

    if(this.username.indexOf(' ') !== -1){
      this.spinner.isSpinnerVisible=false;
      return this.toastService.error("username mengandung spasi")
      
    }
    this.spinner.isSpinnerVisible=true;
    let objRequest = new CreateUser();
    objRequest.id = this.userId;
    objRequest.username = this.username;
    objRequest.first_name = this.employeeName;
    objRequest.email = this.employeeEmail;

    objRequest.beneficiaryId = this.selectedBeneficiaryObj;
    objRequest.signature = this.urlSignature;
    objRequest.position = this.position;
    objRequest.roles.push(this.selectedRoleObj)
    this.masterDataService.addUser(objRequest).subscribe(data => {
      this.spinner.isSpinnerVisible=true;
      if (data) {
        this.toastService.success('Sukses update user')
        this.router.navigate(['/user/user-access'])
        this.modalReject.hide();
        this.getAllUser();
        this.spinner.isSpinnerVisible=false;
      }
    }, error => {
      let errorBody = error._body ? JSON.parse(error._body) : null;
      this.toastService.error(errorBody.message || errorBody.error_description);
      this.spinner.isSpinnerVisible=false;
    })
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

  getRoleUserLoggedIn() {
    // this.roleLoggedIn = this.localStorageServie.retrieve('privilege')


    // if (this.roleLoggedIn.code == 'BANK_ADMIN_2_MAKER') {
    //   this.showBeneficiary = true;
    // }
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

  handleCheckBox(data, event, i) {
    let checked = event.target.checked;
    if (checked == true) {
      this.deleteUser.push(data.id)
    } else {
      this.deleteUser = this.deleteUser.filter(x => x != data.id);
    }
  }

  delete() {
    if(this.deleteUser.length == 0){
      return this.toastService.error("User tidak ada yang pilih");
    }

    swal({
      text: this.translate.instant('NOTIF.CONFIRM_DELETE'),
      type: 'error',
      showCancelButton: true,
      confirmButtonText: 'Delete'
    }).then((result) => {
      this.spinner.isSpinnerVisible=true;
      if (result.value) {
        this.masterDataService.deleteuser(this.deleteUser).subscribe(data => {
          if (data) {
            this.toastService.success('Berhasil')
            this.getAllUser();
            this.spinner.isSpinnerVisible=false;
          }
        }, error => {
          let errorBody = error._body ? JSON.parse(error._body) : null;
          this.toastService.error(errorBody.message || errorBody.error_description);
          this.spinner.isSpinnerVisible=false;
        })
      }else{
        this.spinner.isSpinnerVisible=false;
      }
    });

    // this.spinner.isSpinnerVisible=true;
    // this.masterDataService.deleteuser(this.deleteUser).subscribe(data => {
    //   if (data) {
    //     this.toastService.success('Berhasil')
    //     this.getAllUser();
    //     this.spinner.isSpinnerVisible=false;
    //   }
    // }, error => {
    //   let errorBody = error._body ? JSON.parse(error._body) : null;
    //   this.toastService.error(errorBody.message || errorBody.error_description);
    //   this.spinner.isSpinnerVisible=false;
    // })
  }

  exportData(data, tableId) {
    let fileName = 'Outstanding User';
    this.fileManagementService.exportAsExcelFileByElement(tableId, fileName);
    return false;
  }

  checkPrivilageAddDelete(): boolean {
    let privilage = this.localStorageService.retrieve('privilege');
    let allowedRoles = ['SYSTEM_OWNER', 'BANK_ADMIN_1_MAKER', 'BANK_ADMIN_2_MAKER', 'BENEFICIARY_ADMIN_1']
    return _.indexOf(allowedRoles, privilage.code) != -1
  }

  checkPrivilageApproveReject(): boolean {
    let privilage = this.localStorageService.retrieve('privilege');
    let allowedRoles = ['SYSTEM_OWNER', 'BANK_ADMIN_1_CHECKER', 'BANK_ADMIN_2_CHECKER', 'BENEFICIARY_ADMIN_2']
    return _.indexOf(allowedRoles, privilage.code) != -1
  }

  unlockUser() {
    this.spinner.isSpinnerVisible=true;
    this.masterDataService.unlockUser(this.username).subscribe(data => {
      if (data) {
        this.toastService.success("Berhasil Unlock User")
        this.modalDetail.hide();
        this.getAllUser();
        this.spinner.isSpinnerVisible=false;
      }
    }, error => {
      let errorBody = error._body ? JSON.parse(error._body) : null;
      this.toastService.error(errorBody.message || errorBody.error_description);
      this.spinner.isSpinnerVisible=false;
    });
  }

  resetPassword() {
    this.spinner.isSpinnerVisible=true;
    this.masterDataService.resetPassword(this.username).subscribe(data => {
      if (data) {
        this.toastService.success("Berhasil Reset Password")
        this.modalDetail.hide();
        this.getAllUser();
        this.spinner.isSpinnerVisible=false;
      }
    }, error => {
      let errorBody = error._body ? JSON.parse(error._body) : null;
      this.toastService.error(errorBody.message || errorBody.error_description);
      this.spinner.isSpinnerVisible=false;
    });
  }

  getUserhistory(userId) {
    this.masterDataService.getHistoryUser(userId).subscribe(data => {
      this.historyData = data;
    });
  }
}
