import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterDataService } from 'src/app/services/master-data.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Route, Router } from '@angular/router'
import * as _ from 'lodash';
import { CreateUser } from './create-user';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastService } from 'src/app/services/toast.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { translateTemplates } from '@swimlane/ngx-datatable/release/utils';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { BankGuaranteeService } from 'src/app/services/bank-guarantee.service';
import { FileManagementService } from 'src/app/services/file-management.service';

@Component({
  selector: 'app-user-nasabah',
  templateUrl: './user-nasabah.component.html',
  styleUrls: ['./user-nasabah.component.scss'],
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
export class UserNasabahComponent implements OnInit {
  @ViewChild("uploadOne") uploadOne;
  @ViewChild("uploadTwo") uploadTwo;
  @ViewChild("uploadThree") uploadThree;
  @ViewChild("uploadFour") uploadFour;
  @ViewChild("uploadFive") uploadFive;
  @ViewChild("uploadSix") uploadSix;
  @ViewChild("uploadSeven") uploadSeven;
  @ViewChild("uploadEight") uploadEight;
  @ViewChild("uploadNine") uploadNine;
  @ViewChild("uploadTen") uploadTen;
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

  //ngmodel
  supportDocument = [];
  id: number = null;
  username: string = null;
  completeName
  companyName
  position
  npwpNumber
  idNumber
  employeeEmail: string = null;
  urlSignature: any;
  originalFileName: any;
  allUserAD: [];
  data: any;
  keyword: any;
  showAC: boolean = false;
  response: any;
  chooseGroup :any;

  public fileName = "";
  roleDDL: [];
  beneficaryDDL: [];

  constructor(
    private masterDataService: MasterDataService,
    private bankGuaranteeService: BankGuaranteeService,
    private localStorageservice: LocalStorageService,
    private toastService: ToastService,
    private router: Router,
    private transService : TranslateService,
    private sanitizer : DomSanitizer,
    private fileManagementService : FileManagementService
  ) { }

  ngOnInit() {
    this.chooseGroup="";
    this.spinner.isSpinnerVisible = false;
    var username = this.localStorageservice.retrieve("username");
    this.username = username;
    this.loadDetailNasabah(username);
  }

  removeDocumentFromList(jenisDoc) : boolean{
    var result = false;
    if(this.supportDocument.length > 0){
      this.supportDocument.forEach(res => {
        if(res.jenis_file == jenisDoc){
          const index: number = this.supportDocument.indexOf(res);
          if (index !== -1) {
              this.supportDocument.splice(index, 1);
              result = true;
          }
        }else{
          result = true;
        }
      })
    }else{
      result = true;
    }
    return result;
  }


  uploadDocument(jenisDoc, urutanInp:number) {
    var urutan : number = Number(urutanInp);
    if(this.removeDocumentFromList(jenisDoc)){
      var files: { [key: string]: File } = {};
      switch(urutan){
        case 1:
          files = this.uploadOne.nativeElement.files;
          break;
        case 2:
          files = this.uploadTwo.nativeElement.files;
          break;
        case 3:
          files = this.uploadThree.nativeElement.files;
          break;
        case 4:
          files = this.uploadFour.nativeElement.files;
          break;
        case 5:
          files = this.uploadFive.nativeElement.files;
          break;
        case 6:
          files = this.uploadSix.nativeElement.files;
          break;
        case 7:
          files = this.uploadSeven.nativeElement.files;
          break;
        case 8:
          files = this.uploadEight.nativeElement.files;
          break;
        case 9:
          files = this.uploadNine.nativeElement.files;
          break;
        case 10:
          files = this.uploadTen.nativeElement.files;
          break;
      }
      var formData = new FormData();
      var extention = files[0].name.match(/\.[0-9a-z]+$/i);
      let acceptExtension = ['.pdf', '.doc', '.docs', '.png', '.jpg', '.jpeg']
      if (_.indexOf(acceptExtension, extention[0].toLowerCase()) != -1) {
        if (files[0].size < 1048576) {
          formData.append('file', files[0]);
          this.bankGuaranteeService.postUploadSupportDocument(formData).subscribe(data => {
            var tempdoc = {
              "jenis_file": jenisDoc,
              "nama_file": data.originalFileName,
              "nama_file_encrypt": data.newFileName,
              "url_file": data.fileSaveUrl
            }
            this.supportDocument.push(tempdoc);
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
    }else{
      this.toastService.warning("Cannot Upload File (Uknown Error)")
    }
  }

  saveDetailNasabah(){
    this.spinner.isSpinnerVisible = true;
    if(this.onValidationCheck()){
      var reqPayload = {
        "company_name": this.companyName,
        "complete_name": this.completeName,
        "email": this.employeeEmail,
        "id": this.id,
        "id_number": this.idNumber,
        "npwp_number": this.npwpNumber,
        "position": this.position,
        "support_document": this.supportDocument,
        "username": this.username
      }
      this.masterDataService.saveDetailNasabah(reqPayload).subscribe(data => {
        if (data) {
          this.toastService.success('Sukses tambah user')
          this.router.navigate(['/dashboard'])
          this.spinner.isSpinnerVisible = false;
        }
      }, error => {
        this.spinner.isSpinnerVisible = false;
        let errorBody = error._body ? JSON.parse(error._body) : null;
        this.toastService.error(errorBody.message || errorBody.error_description);
      })
    }
  }

  onValidationCheck() : boolean{
    var result = false;
    if(this.companyName == ''){
      this.toastService.warning("Nama Perusahaan Tidak boleh kosong");
      this.spinner.isSpinnerVisible = false;
    }else if(this.completeName == ''){
      this.toastService.warning("Nama Lengkap Tidak boleh kosong");
      this.spinner.isSpinnerVisible = false;
    }else if(this.idNumber == ''){
      this.toastService.warning("Nomor KTP Tidak boleh kosong");
      this.spinner.isSpinnerVisible = false;
    }else if(this.npwpNumber == ''){
      this.toastService.warning("Nomor NPWP Tidak boleh kosong");
      this.spinner.isSpinnerVisible = false;
    }else if(this.position == ''){
      this.toastService.warning("Posisi/Jabatan Tidak boleh kosong");
      this.spinner.isSpinnerVisible = false;
    }else if(this.supportDocument.length < 10){
      this.toastService.warning("Dokumen Tidak Lengkap");
      this.spinner.isSpinnerVisible = false;
    }else if(this.employeeEmail == '' || this.username == ''){
      this.toastService.warning("Username dan Email Tidak boleh kosong");
      this.spinner.isSpinnerVisible = false;
    }else{
      result = true;
    }
    return result;
  }

  loadDetailNasabah(username){
    this.masterDataService.getDetailNasabah(username).subscribe(data => {
      if(data != {} && data != null&& data.id != null ){
        this.companyName = data.company_name ;
        this.completeName = data.complete_name ;
        this.employeeEmail = data.email ;
        this.id = data.id ;
        this.idNumber = data.id_number ;
        this.npwpNumber = data.npwp_number ;
        this.position = data.position ;
        this.supportDocument = data.support_document;
        this.username = data.username;
      }
    })
  }

  signature;
  signatureLoaded = false;
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

  handleDownloadPDF(jenisFile){
    this.supportDocument.forEach(data => {
      if(data.jenis_file == jenisFile){
        if(jenisFile == "Signature"){
          this.fileManagementService.downloadSignatureNasabah(data.url_file).subscribe(blob => {
            this.createImageFromBlob(blob);
          }, error => {
            this.signatureLoaded = true;
            this.signature = null;
          });  
        }else{
          this.fileManagementService.downloadSupportDocument(data.url_file);
        }
      }
    })
  }

  selectEvent(data) {
    this.username = data.username;
    this.employeeEmail = data.email;

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
    objRequest.email = this.employeeEmail;
    objRequest.beneficiaryId = this.selectedBeneficiaryObj;
    objRequest.signature = this.urlSignature;
    objRequest.position = this.position;
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
