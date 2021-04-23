import { Component, OnInit, ViewChild } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {HttpClient} from '@angular/common/http';
import {Observable, from} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {BankGuaranteeService} from '../../../../services/bank-guarantee.service';
import {MasterDataService} from '../../../../services/master-data.service';
import {FileManagementService} from '../../../../services/file-management.service';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import {ToastrService} from 'ngx-toastr';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-registration-create',
  templateUrl: './registration-create.component.html',
  styleUrls: ['./registration-create.component.scss'],
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
export class RegistrationCreateComponent implements OnInit {
  @ViewChild('spinner') spinner: SpinnerComponent;

  placement = 'top-left';
  constructor(
    public httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private masterDataService: MasterDataService,
    private localStorageService: LocalStorageService,
    private fileManagementService: FileManagementService,
    private registrationService: BankGuaranteeService
  ) { }

  // TAB
  activeIdTab:any="tab-registration";
  tabConfirmation = false;
  tabHistory = false;
  disableButton:boolean = false;

  // GLOBAL VAR
  maxCharsUraianPekerjaan = 255;
  maxCharsNomorKontrak = 50;
  dataRolePrivilege:any = [];
  usernameAssign:any = "";
  errorMessage = {
    messageErr: '',
    messageBool: false
  }
  downloadPdf:boolean=false;
  disableAction:boolean=false;

  // VAR MASTER DATA
  jenisProdukDDL:any= [];
  jenisJaminanDDL:any= [];
  beneficiaryDDL:any= [];
  unitPenggunaDDL:any= [];
  alamatBankPenerbitDDL:any= [];
  datCurrencyDDL:any= [];

  placeJenisProduk = "--Pilih Jenis Produk--";
  placeJenisJaminan = "--Pilih Jenis Jaminan--";
  placeBeneficiary = "--Pilih Beneficiary--";
  placeUnitPengguna = "--Pilih Unit Pengguna--";
  placeAlamatBankPenerbit = "--Pilih Alamat Bank Penerbit--";
  placeCurreny = "--Pilih Currency--";

  // BODY PAYLOAD
  dataHistoryBankGuarantee:any =[];
  dataRegistration:any = {
    id: '',
    alamat_bank_penerbit_id: '',
    beneficiary_id: '',
    currency_id: '',
    jenis_jaminan_id: '',
    doc_jenis_jaminan: '',
    jenis_produk_id: '',
    nama_bank_penerbit: 'PT. BANK UOB INDONESIA',
    nilai_jaminan: '',
    nilai_kontrak: '',
    nomor_jaminan: '',
    nomor_amendment: '',
    nomor_kontrak: '',
    applicant: '',
    softcopy_jaminan_name: '',
    softcopy_jaminan_url: '',
    tanggal_batas_claim: '',
    tanggal_berakhir: '',
    tanggal_berlaku: '',
    tanggal_terbit: '',
    tenggang_waktu_claim: '',
    unit_pengguna_id: '',
    uraian_pekerjaan: ''
  };

  dataConfirmation:any = {
    id_jaminan: '',
    nomor_konfirmasi_bank: '',
    tanggal_surat_konfirmasi: '',
    username_penanda_tangan: ''
  };

  ngOnInit() {
    this.dataRolePrivilege = this.localStorageService.retrieve('privilege');
    this.usernameAssign = this.localStorageService.retrieve('username');
    this.handleLoadMasterData();
    this.dataRegistration.applicant = this.usernameAssign;
  }

  handleLoadMasterData(){
    this.handleLoadDataBeneficiary();
    this.handleLoadDataCurrency();
    this.handleLoadDataJenisJaminan();
    this.handleLoadDataJenisProduk();
    this.handleLoadDataUnitPengguna();
    this.handleLoadDataAlamatBankPenerbit();
  }

  handleLoadDataBeneficiary(){
    const status = '';
    this.masterDataService.getAllBeneficiary(status).subscribe(data=>{
        const dataList = data.map(x => {
          return {
            value: x.id,
            label: x.nama_beneficiary,
            data: x
          };
        });
      this.beneficiaryDDL = dataList;
      })
  }

  handleLoadDataCurrency(){
    const status = '';
    this.masterDataService.getAllCurrency(status).subscribe(data => {
        const dataList = data.map(x => {
          return {
            value: x.id,
            label: x.currency,
            data: x
          };
        });
      this.datCurrencyDDL = dataList;
    })
  }

  handleLoadDataJenisJaminan(){
    this.masterDataService.getAllJenisJaminan(status).subscribe(data => {
        const dataList = data.map(x => {
          return {
            value: x.id,
            label: x.jenis_jaminan,
            data: x
          };
        });
      this.jenisJaminanDDL = dataList;
    })
  }

  handleLoadDataJenisProduk(){
    const status = '';
    this.masterDataService.getAllJenisProduk(status).subscribe(data => {
      const dataProd = data.map(x => {
        return {
          value: x.id,
          label: x.jenis_produk,
          data: x
        };
      });
    this.jenisProdukDDL = dataProd;
    })
  }

  handleLoadDataUnitPengguna(){
    const status = '';
    this.masterDataService.getAllUnitPengguna(status).subscribe(data =>{
        const dataList = data.map(x => {
          return {
            value: x.id,
            label: x.unit_pengguna,
            data: x
          };
        });
      this.unitPenggunaDDL = dataList;
    })
  }

  handleLoadDataAlamatBankPenerbit(){
    this.masterDataService.getAllAlamatBank().subscribe(data =>{
        const dataList = data.map(x => {
          return {
            value: x.id,
            label: x.alamat_bank_penerbit,
            data: x
          };
        });
      this.alamatBankPenerbitDDL = dataList;
    })
  }

  changeCurrency(data){
    this.dataRegistration.currency_id = data.value;
    this.placeCurreny = data.label;
  }

  changeJenisProduk(data){
    this.dataRegistration.jenis_produk_id = data.value;
    this.placeJenisProduk  = data.label;
  }

  jaminanCode='';
  changeJenisJaminan(data){
    this.dataRegistration.jenis_jaminan_id = data.value;
    this.jaminanCode = data.data.code_jaminan;
    this.placeJenisJaminan = data.label;
  }

  changeBeneficiary(data){
    this.dataRegistration.beneficiary_id = data.value;
    this.placeBeneficiary  = data.label;
  }

  changeUnitPengguna(data){
    this.dataRegistration.unit_pengguna_id = data.value;
    this.placeUnitPengguna  = data.label;
  }
  changeAlamatBankPenerbit(data){
    this.dataRegistration.alamat_bank_penerbit_id = data.value;
    this.placeAlamatBankPenerbit  = data.label;
  }

  onSelectedPublishDate(date){
    var tempDate = `${date.year}/${date.month}/${date.day}`;
    var tempDateTime = new Date(tempDate).getTime();
    this.dataRegistration.tanggal_terbit = tempDateTime;
  }
  onSelectedEffectiveDate(date){
    var tempDate = `${date.year}/${date.month}/${date.day}`;
    var tempDateTime = new Date(tempDate).getTime();
    this.dataRegistration.tanggal_berlaku = tempDateTime;
  }
  onSelectedEndDate(date){
    var tempDate = `${date.year}/${date.month}/${date.day}`;
    var tempDateTime = new Date(tempDate).getTime();
    this.dataRegistration.tanggal_berakhir = tempDateTime;

    this.dataRegistration.tanggal_batas_claim = new Date(this.dataRegistration.tanggal_berakhir).setDate(new Date(tempDate).getDate() + Number(this.dataRegistration.tenggang_waktu_claim));
  }
  onMaxClaimDate(date){
    var tempDate = `${date.year}/${date.month}/${date.day}`;
    var tempDateTime = new Date(tempDate).getTime();
    this.dataRegistration.tanggal_batas_claim = tempDateTime;
  }
  onConfirmationDate(date){
    var tempDate = `${date.year}/${date.month}/${date.day}`;
    var tempDateTime = new Date(tempDate).getTime();
    this.dataConfirmation.tanggal_surat_konfirmasi = tempDateTime;
  }
  onConfirmationAccDate(date){
    var tempDate = `${date.year}/${date.month}/${date.day}`;
    var tempDateTime = new Date(tempDate).getTime();
    this.dataConfirmation.tanggal_terima_surat_konfirmasi = tempDateTime;
  }
  handleCalculateClaimDate(){
    let tgl_berakhir = new Date(this.dataRegistration.tanggal_berakhir);
    this.dataRegistration.tanggal_batas_claim = tgl_berakhir.setDate(tgl_berakhir.getDate() + Number(this.dataRegistration.tenggang_waktu_claim))
  }

  public fileName = ""
  @ViewChild("softcopyJaminan") softcopyJaminan
  @ViewChild("uploadJenisJaminanDoc") uploadJenisJaminanDoc
  onSelectedSoftcopyJaminan(docType){
    var files: { [key: string]: File } = {};
    switch(docType){
      case "jjsd":
        files = this.uploadJenisJaminanDoc.nativeElement.files;
        break;
      default:
        files = this.softcopyJaminan.nativeElement.files;
        break;
    }
    var formData  = new FormData();
    var extention = files[0].name.match(/\.[0-9a-z]+$/i);
    if (extention[0]==".pdf"){
      if(files[0].size < 5000000){
        formData.append('file',files[0]);
        const idJaminan = this.dataRegistration.id;
        const codeJaminan = this.jaminanCode;
        const tanggalTerbit = this.dataRegistration.tanggal_terbit;
        if(docType == "jjsd"){
          this.registrationService.postUploadSupportDocument(formData).subscribe(data =>{
            this.dataRegistration.doc_jenis_jaminan = data.fileSaveUrl;
          },
          (error : any)=>{
            var error = JSON.parse(error._body);
            this.toastrService.warning('error', error.message);
          })
        }else{
          this.registrationService.postUploadFileJaminan(formData,"pdf", idJaminan, codeJaminan, tanggalTerbit).subscribe(data=>{
            this.dataRegistration.softcopy_jaminan_name = data.originalFileName;
            this.dataRegistration.softcopy_jaminan_url = data.fileSaveUrl;
            this.downloadPdf = true;
          },
            (error : any)=>{
              var error = JSON.parse(error._body);
              this.toastrService.warning('error', error.message);
            }
          );
        }
      } else {
        this.toastrService.warning('warning', 'File size can not bigger than 5MB');
      }
    } else {
      this.toastrService.warning('warning', 'Not Support Type File');
    }
    formData.append('file',files[0]);
  }

  handleDownloadPDF(){
    let fileName = this.dataRegistration.softcopy_jaminan_url;
    let newFileName = fileName.slice(fileName.lastIndexOf("/")+1,fileName.length);
    this.fileManagementService.downloadFile('pdf',newFileName);
  }

  handleDownloadPDFJaminan(){
    this.fileManagementService.downloadSupportDocument(this.dataRegistration.doc_jenis_jaminan);
  }

  handleHistoryByNomorJaminan(){
    this.registrationService.getHistoryByNomorJaminan(this.dataConfirmation.id_jaminan).subscribe(data=>{
      if(data != null){
        this.dataHistoryBankGuarantee = data;
      }
    })
  }

  onTabChange($event){
    this.activeIdTab = $event.nextId
  }

  handleSaveRegistration(){
    this.spinner.isSpinnerVisible = true;
    this.handleValidationRegistration(this.dataRegistration);
    if(this.errorMessage.messageBool){
      this.registrationService.saveBgRegistration(this.dataRegistration).subscribe(data=>{
        if(data) {
          this.spinner.isSpinnerVisible = false;
          this.activeIdTab = "tab-confirmation";
          this.tabConfirmation = true;
          this.dataConfirmation = data;
          this.dataRegistration.id = data.id_jaminan;
        }
        (error : any)=>{
          var error = JSON.parse(error._body);
          this.toastrService.error('error',error.message);
        }
      },(error : any)=>{
        this.spinner.isSpinnerVisible = false;
        var error = JSON.parse(error._body);
        this.toastrService.error('error',error.message);
      })
    }else{
      this.spinner.isSpinnerVisible = false;
      this.toastrService.error('error',this.errorMessage.messageErr);
    }
  }

  handleSubmit(draft:boolean){
    this.spinner.isSpinnerVisible = true;
    this.registrationService.getDraftSubmit(this.dataConfirmation.id_jaminan, draft).subscribe(data=>{
      this.handleHistoryByNomorJaminan();
      this.tabHistory = true;
      if(draft){
        this.toastrService.success('success','Berhasil Simpan sebagai Pending BG');
      }else{
        this.toastrService.success('success','Menunggu Approval Checker');
        this.disableButton = true;
        this.disableAction = true;
      }
      this.activeIdTab = "tab-history";
      this.spinner.isSpinnerVisible = false;
    },(error : any)=>{
      this.spinner.isSpinnerVisible = false;
      var error = JSON.parse(error._body);
      this.toastrService.error('error',error.message);
    });
  }

  handleValidationRegistration(data){
    if(this.dataRegistration.alamat_bank_penerbit_id == ''){
      this.errorMessage.messageErr = 'Alamat Bank Penerbit tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(this.dataRegistration.beneficiary_id == ''){
      this.errorMessage.messageErr = 'Beneficiary tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(this.dataRegistration.currency_id == ''){
      this.errorMessage.messageErr = 'Currency tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(this.dataRegistration.jenis_jaminan_id == ''){
      this.errorMessage.messageErr = 'Jenis Jaminan tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(this.dataRegistration.jenis_produk_id == ''){
      this.errorMessage.messageErr = 'Jenis Produk tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(data.nama_bank_penerbit == '' || data.nama_bank_penerbit == null){
      this.errorMessage.messageErr = 'Nama Bank Penerbit tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(data.nilai_jaminan == '' || data.nilai_jaminan == null){
      this.errorMessage.messageErr = 'Nilai Jaminan  tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(data.nilai_kontrak == '' || data.nilai_kontrak == null){
      this.errorMessage.messageErr = 'Nilai Kontrak  tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(data.nomor_jaminan == '' || data.nomor_jaminan == null){
      this.errorMessage.messageErr = 'Nomor Jaminan tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(data.nomor_amendment.toString() == '' || Number(data.nomor_amendment) < 0){
      this.errorMessage.messageErr = 'Nomor Amendment tidak boleh kosong atau lebih kecil dari 0';
      this.errorMessage.messageBool = false;
    }else if(data.nomor_kontrak == ''|| data.nomor_kontrak == null){
      this.errorMessage.messageErr = 'Nomor Kontrak tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(data.applicant == '' || data.applicant == null){
      this.errorMessage.messageErr = 'Applicant tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(data.softcopy_jaminan_name == '' || data.softcopy_jaminan_name == null){
      this.errorMessage.messageErr = 'Softcopy Jaminan harus diupload';
      this.errorMessage.messageBool = false;
    }else if(data.tanggal_batas_claim == '' || data.tanggal_batas_claim == null){
      this.errorMessage.messageErr = 'Tanggal Batas Claim tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(data.tanggal_berakhir == '' || data.tanggal_berakhir == null){
      this.errorMessage.messageErr = 'Tanggal Berakhir tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(data.tanggal_berlaku == '' || data.tanggal_berlaku == null){
      this.errorMessage.messageErr = 'Tanggal Berlaku tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(data.tanggal_terbit == '' || data.tanggal_terbit == null){
      this.errorMessage.messageErr = 'Tanggal Terbit tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(data.tenggang_waktu_claim == '' || data.tenggang_waktu_claim == null){
      this.errorMessage.messageErr = 'Tenggang Waktu Claim tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(this.dataRegistration.unit_pengguna_id == '' || this.dataRegistration.unit_pengguna_id == null){
      this.errorMessage.messageErr = 'Unit Pengguna tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else if(data.uraian_pekerjaan == '' || data.uraian_pekerjaan == null){
      this.errorMessage.messageErr = 'Uraian Pekerjaan tidak boleh kosong';
      this.errorMessage.messageBool = false;
    }else{
      this.errorMessage.messageBool = true;
    }
  }
}
