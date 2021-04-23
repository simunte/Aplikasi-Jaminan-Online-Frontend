import {Component, OnInit, ViewChild} from '@angular/core';
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
import { id } from '@swimlane/ngx-datatable/release/utils';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export class UserProfile {
  name: string;
  position: string;
  office: string;
  age: number;
  date: any;
  salary: string;
}

@Component({
  selector: 'app-registration-edit',
  templateUrl: './registration-edit.component.html',
  styleUrls: [
    './registration-edit.component.scss',
    '../../../../../assets/icon/icofont/css/icofont.scss'
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
export class RegistrationEditComponent implements OnInit {
  maxCharsUraianPekerjaan = 255;
  maxCharsNomorKontrak = 50;
  placement = 'top-left';
  @ViewChild('spinner') spinner: SpinnerComponent;
  editProfile = true;
  editProfileIcon = 'icofont-edit';

  editAbout = true;
  editAboutIcon = 'icofont-edit';

  public editor;
  public editorContent: string;
  public editorConfig = {
    placeholder: 'About Your Self'
  };

  public data: Observable<UserProfile>;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  profitChartOption: any;

  //MY VAR
  dataRegistration:any = [];
  dataConfirmation:any = [];
  dataBeneficiary:any = [];
  dataCurrency:any = [];
  dataJenisJaminan:any = [];
  dataJenisProduk:any = [];
  dataUnitPengguna:any = [];
  dataUraianPekerjaan:any = [];
  dataHistoryBankGuarantee:any =[];
  dataAlamatBankPenerbit:any =[];
  activeIdTab:any="tab-registration";
  existSoftCopyJaminan:boolean=false;
  draft:boolean=false;
  today = new Date();
  todayDate = new Date();
  tempBatasClaimDate:any;
  submitAction: string;


  selectedUraianPekerjaan:any = [];
  selectedUraianPekerjaanTitle ="-- pilih --";
  selectedUnitPengguna:any=[];
  selectedUnitPenggunaTitle="-- pilih --";
  selectedCurrency:any = [];
  selectCurrencyTitle = "-- pilih --";
  selectedJenisProduk:any = [];
  selectedJenisProdukTitle ="-- pilih --";
  selectedJenisJaminan:any =[];
  selectedJenisJaminanTitle = "-- pilih --";
  selectedBeneficiary:any = [];
  selectedBeneficiaryTitle="-- pilih --";
  selectedAlamatBank:any = [];
  selectedAlamatBankTitle="-- pilih --";
  dataRolePrivilege:any = [];
  usernameAssign:any = "";
  alasan_reject:any="";

  jenisProdukDDL: [];

  disableAction = true;
  disableAmount = true;
  disableTglSurat = true;

  //button
  nextRegButton = false;
  saveDraftButton = false;
  submitButton = false;
  approveButton = false;
  rejectButton = false;
  nextButton = false;
  showDownloadSuratJaminan= false;
  showDownloadSuratKonfirmasi= false;
  //payload save registration
  //

  //privilege
  createPriv = false;
  updatePriv = false;
  readPriv = false;
  approvePriv = false;
  deletePriv = false;


  //tabactive
  tabConfirmation = false;
  tabHistory = false;

  constructor(public httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private masterDataService: MasterDataService,
    private localStorageService: LocalStorageService,
    private fileManagementService: FileManagementService,
    private registrationService: BankGuaranteeService) {
  }

  ngOnInit() {
    this.spinner.isSpinnerVisible = true;
    this.dataRolePrivilege = this.localStorageService.retrieve('privilege');
    this.usernameAssign = this.localStorageService.retrieve('username');
    this.checkPrivilege();
    this.handleLoadData();
    this.spinner.isSpinnerVisible= false;

    setTimeout(() => {}, 2800);

    this.data = this.httpClient.get<UserProfile>(`assets/data/data.json`);

    setTimeout(() => {
      this.profitChartOption = {
        tooltip: {
          trigger: 'item',
          formatter: function(params) {
            const date = new Date(params.value[0]);
            let data = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ';
            data += date.getHours() + ':' + date.getMinutes();
            return data + '<br/>' + params.value[1] + ', ' + params.value[2];
          },
          responsive: true
        },
        dataZoom: {
          show: true,
          start: 70
        },
        legend: {
          data: ['Profit']
        },
        grid: {
          y2: 80
        },
        xAxis: [{
          type: 'time',
          splitNumber: 10
        }],
        yAxis: [{
          type: 'value'
        }],
        series: [{
          name: 'Profit',
          type: 'line',
          showAllSymbol: true,
          symbolSize: function(value) {
            return Math.round(value[2] / 10) + 2;
          },
          data: (function() {
            const d: any = [];
            let len = 0;
            const now = new Date();
            while (len++ < 200) {
              const random1: any = (Math.random() * 30).toFixed(2);
              const random2: any = (Math.random() * 100).toFixed(2);
              d.push([ new Date(2014, 9, 1, 0, len * 10000), random1 - 0, random2 - 0 ]);
            }
            return d;
          })()
        }]
      };
    }, 1);
  }

  toggleEditProfile() {
    this.editProfileIcon = (this.editProfileIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editProfile = !this.editProfile;
  }

  toggleEditAbout() {
    this.editAboutIcon = (this.editAboutIcon === 'icofont-close') ? 'icofont-edit' : 'icofont-close';
    this.editAbout = !this.editAbout;
  }

  onEditorBlured(quill) {
  }

  onEditorFocused(quill) {
  }

  onEditorCreated(quill) {
    this.editor = quill;
  }

  onContentChanged({ quill, html, text }) {
  }

  handleLoadData(){
    const id_jaminan = this.route.snapshot.paramMap.get('id_jaminan');

    this.registrationService.getDetailBankGuarantee(id_jaminan).subscribe(data=>{
      if(data != null){
        this.dataRegistration = data.registration_data;
        this.dataConfirmation = data.confirmation_data;
        this.tempBatasClaimDate = this.dataRegistration.tanggal_batas_claim;
        this.handleDefaultTitle(data.registration_data);
        this.dataRegistration.applicant = this.usernameAssign;
        if(this.dataRegistration.bank_guarantee_status=='PENDING BG' || this.dataRegistration.bank_guarantee_status=='BG FROM STAGING' || this.dataRegistration.bank_guarantee_status=='REJECTED BG'){
          this.existSoftCopyJaminan=true;
        }
        if(this.dataRegistration.softcopy_jaminan_name !== null){
          this.showDownloadSuratJaminan=true;
        }
        if(this.dataRegistration.nama_bank_penerbit == '' || this.dataRegistration.nama_bank_penerbit == null){
          this.dataRegistration.nama_bank_penerbit = 'PT. BANK UOB INDONESIA'
        }
        if(this.dataRegistration.bank_guarantee_status == "PENDING BG"
        || this.dataRegistration.bank_guarantee_status == "REJECTED BG"
        || this.dataRegistration.bank_guarantee_status == "BG FROM STAGING"){
          this.handleLoadDataBeneficiary();
          this.handleLoadDataCurrency();
          this.handleLoadDataJenisJaminan();
          this.handleLoadDataJenisProduk();
          this.handleLoadDataUnitPengguna();
          this.handleLoadDataAlamatBankPenerbit();
        }
        this.handleButtonRowCondition();
      }
    })
    this.handleHistoryByNomorJaminan();
  }

  handleDefaultTitle(data){
    if(data.jenis_produk != null){
      this.selectedJenisProdukTitle = data.jenis_produk;
    }
    if(data.jenis_jaminan != null){
      this.selectedJenisJaminanTitle = data.jenis_jaminan;
    }
    if(data.nama_beneficiary != null){
      this.selectedBeneficiaryTitle = data.nama_beneficiary;
    }
    if(data.unit_pengguna != null){
      this.selectedUnitPenggunaTitle = data.unit_pengguna;
    }
    if(data.uraian_pekerjaan != null){
      this.selectedUraianPekerjaanTitle = data.uraian_pekerjaan;
    }
    if(data.currency != null){
      this.selectCurrencyTitle = data.currency;
    }
    if(data.alamat_bank_penerbit != null){
      this.selectedAlamatBankTitle = data.alamat_bank_penerbit;
    }
  }

  beneficiaryDDL:[];
  handleLoadDataBeneficiary(){
    const status = '';
    this.masterDataService.getAllBeneficiary(status).subscribe(data=>{
      this.dataBeneficiary = data;
        for(var i=0; i<this.dataBeneficiary.length;i++){
          if(this.selectedBeneficiaryTitle == this.dataBeneficiary[i].nama_beneficiary){
            this.selectedBeneficiary = this.dataBeneficiary[i];
          }
        }
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

  datCurrencyDDL:[];
  handleLoadDataCurrency(){
    const status = '';
    this.masterDataService.getAllCurrency(status).subscribe(data => {
      this.dataCurrency = data;
        for(var i=0; i<this.dataCurrency.length;i++){
          if(this.selectCurrencyTitle === this.dataCurrency[i].currency){
            this.selectedCurrency = this.dataCurrency[i];
          }
        }
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

  jenisJaminanDDL:[];
  handleLoadDataJenisJaminan(){
    const status = '';
    this.masterDataService.getAllJenisJaminan(status).subscribe(data => {
      this.dataJenisJaminan = data;
        for(var i=0; i<this.dataJenisJaminan.length;i++){
          if(this.selectedJenisJaminanTitle === this.dataJenisJaminan[i].jenis_jaminan){
            this.selectedJenisJaminan = this.dataJenisJaminan[i];
          }
        }
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
      this.dataJenisProduk = data;
      for(var i=0; i<this.dataJenisProduk.length;i++){
        if(this.selectedJenisProdukTitle === this.dataJenisProduk[i].jenis_produk){
          this.selectedJenisProduk = this.dataJenisProduk[i];
        }
      }
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

  unitPenggunaDDL:[];
  handleLoadDataUnitPengguna(){
    const status = '';
    this.masterDataService.getAllUnitPengguna(status).subscribe(data =>{
      this.dataUnitPengguna = data;
        for(var i=0; i<this.dataUnitPengguna.length;i++){
          if(this.selectedUnitPenggunaTitle === this.dataUnitPengguna[i].unit_pengguna){
            this.selectedUnitPengguna = this.dataUnitPengguna[i];
          }
        }
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

  alamatBankPenerbitDDL:[];
  handleLoadDataAlamatBankPenerbit(){
    this.masterDataService.getAllAlamatBank().subscribe(data =>{
      this.dataAlamatBankPenerbit = data;
        for(var i=0; i<this.dataAlamatBankPenerbit.length;i++){
          if(this.selectedAlamatBankTitle === this.dataAlamatBankPenerbit[i].alamat_bank_penerbit){
            this.selectedAlamatBank = this.dataAlamatBankPenerbit[i];
          }
        }

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

  onTabChange($event){
    this.activeIdTab = $event.nextId
  }

  changeCurrency(data){
    this.selectedCurrency = data.data;
    this.selectCurrencyTitle = this.selectedCurrency.currency;
  }

  changeJenisProduk(data){
    this.selectedJenisProduk = data.data;
    this.selectedJenisProdukTitle = this.selectedJenisProduk.jenis_produk;
  }

  changeJenisJaminan(data){
    this.selectedJenisJaminan = data.data;
    this.selectedJenisJaminanTitle = this.selectedJenisJaminan.jenis_jaminan;
  }

  changeBeneficiary(data){
    this.selectedBeneficiary = data.data;
    this.selectedBeneficiaryTitle = this.selectedBeneficiary.nama_beneficiary;
  }

  changeUnitPengguna(data){
    this.selectedUnitPengguna = data.data;
    this.selectedUnitPenggunaTitle = this.selectedUnitPengguna.unit_pengguna;
  }
  changeAlamatBankPenerbit(data){
    this.selectedAlamatBank = data.data;
    this.selectedAlamatBankTitle = this.selectedAlamatBank.alamat_bank_penerbit;
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
  public fileName = ""
  @ViewChild("softcopyJaminan") softcopyJaminan
  onSelectedSoftcopyJaminan(){
    const files: { [key: string]: File } = this.softcopyJaminan.nativeElement.files;
    var formData  = new FormData();
    var extention = files[0].name.match(/\.[0-9a-z]+$/i);
    if (extention[0]==".pdf"){
      if(files[0].size < 5000000){
        formData.append('file',files[0]);
        const idJaminan = this.dataRegistration.id;
        const codeJaminan = this.selectedJenisJaminan.code_jaminan;
        const tanggalTerbit = this.dataRegistration.tanggal_terbit;
        this.registrationService.postUploadFileJaminan(formData,"pdf", idJaminan, codeJaminan, tanggalTerbit).subscribe(data=>{
          this.dataRegistration.softcopy_jaminan_name = data.originalFileName;
          this.dataRegistration.softcopy_jaminan_url = data.fileSaveUrl;
          this.showDownloadSuratJaminan=true;
        },
          (error : any)=>{
            var error = JSON.parse(error._body);
            this.toastrService.warning('error', error.message);
          }
        );
      } else {
        this.toastrService.warning('warning', 'File size can not bigger than 5MB');
      }
    } else {
      this.toastrService.warning('warning', 'Not Support Type File');
    }
    formData.append('file',files[0]);
  }

  continue = true;
  handleSaveRegistration(){
    this.spinner.isSpinnerVisible = true;
    setTimeout(()=>{
      var createRegistrationRequest ={
        id : this.dataRegistration.id,
        alamat_bank_penerbit_id: this.selectedAlamatBank.id,
        beneficiary_id: this.selectedBeneficiary.id,
        currency_id: this.selectedCurrency.id,
        jenis_jaminan_id: this.selectedJenisJaminan.id,
        doc_jenis_jaminan: this.dataRegistration.doc_jenis_jaminan,
        jenis_produk_id: this.selectedJenisProduk.id,
        nama_bank_penerbit: this.dataRegistration.nama_bank_penerbit,
        nilai_jaminan: this.dataRegistration.nilai_jaminan,
        nilai_kontrak: this.dataRegistration.nilai_kontrak,
        nomor_jaminan: this.dataRegistration.nomor_jaminan,
        nomor_amendment: this.dataRegistration.nomor_amendment,
        nomor_kontrak: this.dataRegistration.nomor_kontrak,
        applicant: this.dataRegistration.applicant,
        softcopy_jaminan_name: this.dataRegistration.softcopy_jaminan_name,
        softcopy_jaminan_url: this.dataRegistration.softcopy_jaminan_url,
        tanggal_batas_claim: this.dataRegistration.tanggal_batas_claim,
        tanggal_berakhir: this.dataRegistration.tanggal_berakhir,
        tanggal_berlaku: this.dataRegistration.tanggal_berlaku,
        tanggal_terbit: this.dataRegistration.tanggal_terbit,
        tenggang_waktu_claim: this.dataRegistration.tenggang_waktu_claim,
        unit_pengguna_id: this.selectedUnitPengguna.id,
        uraian_pekerjaan: this.dataRegistration.uraian_pekerjaan
      }
      this.handleValidationRegistration(createRegistrationRequest);
      if(this.continue){
        this.registrationService.saveBgRegistration(createRegistrationRequest).subscribe(data=>{
          if(data) {
            this.spinner.isSpinnerVisible = false;
            this.activeIdTab = "tab-confirmation";
            this.tabConfirmation = true;
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
      }
    }, 1000);
  }

  handleSaveConfirmation(draft){
    var createBgConfirmation={
      id_jaminan: this.dataRegistration.id,
      nomor_konfirmasi_bank: this.dataConfirmation.nomor_konfirmasi_bank,
      tanggal_surat_konfirmasi: this.dataConfirmation.tanggal_surat_konfirmasi,
      username_penanda_tangan: this.usernameAssign
    }

    if(createBgConfirmation.tanggal_surat_konfirmasi === '' || createBgConfirmation.tanggal_surat_konfirmasi === null){
      createBgConfirmation.tanggal_surat_konfirmasi = new Date(this.today).getTime();
    }
    this.registrationService.saveBgConfirmation(createBgConfirmation, draft).subscribe(data=>{
      if(data) {
        this.activeIdTab = "tab-confirmation";
      }
      (error : any)=>{
        var error = JSON.parse(error._body);
        this.toastrService.error('error',error.message);
        this.spinner.isSpinnerVisible = false;
      }
    },(error : any)=>{
      this.spinner.isSpinnerVisible = false;
      var error = JSON.parse(error._body);
      this.toastrService.error('error',error.message);
    })
  }

  handleSubmit(){
    this.spinner.isSpinnerVisible = true;
    this.draft=false;
    this.registrationService.getDraftSubmit(this.dataRegistration.id, this.draft).subscribe(data=>{
      this.resetButton();
      this.handleHistoryByNomorJaminan();
      this.handleLoadData();
      this.tabHistory = true;
      this.toastrService.success('success','Menunggu Approval Checker');
      this.activeIdTab = "tab-history";
      this.spinner.isSpinnerVisible = false;
    },(error : any)=>{
      this.spinner.isSpinnerVisible = false;
      var error = JSON.parse(error._body);
      this.toastrService.error('error',error.message);
    });
  }

  handleSaveAsDraft(){
    this.spinner.isSpinnerVisible = true;
    this.draft=true;
    this.registrationService.getDraftSubmit(this.dataRegistration.id, this.draft).subscribe(data=>{
      this.resetButton();
      this.handleHistoryByNomorJaminan();
      this.handleLoadData();
      this.toastrService.success('success','Berhasil Simpan Sebagai Draft');
      this.activeIdTab = "tab-history";
      this.tabHistory = true;
      this.spinner.isSpinnerVisible = false;
    },(error : any)=>{
      this.spinner.isSpinnerVisible = false;
      var error = JSON.parse(error._body);
      this.toastrService.error('error',error.message);
    });
  }

  handleDownloadPDFJaminan(){
    this.fileManagementService.downloadSupportDocument(this.dataRegistration.doc_jenis_jaminan);
  }

  handleApprovalAcc(){
    this.spinner.isSpinnerVisible = true;
    this.handleSaveConfirmation(false);
    switch(this.dataRolePrivilege.code){
      case "TRO_MAKER":
        this.submitAction = "APPROVAL";
        break;
      case "TRO_CHECKER":
        this.submitAction = "VERIFICATION";
        break;
      case "KOMITE":
        this.submitAction = "VALIDATION";
        break;
      case "BENEFICIARY_USER":
        this.submitAction = "CONFIRMATION";
        break;
    }
    var approvalRequest = {
        id_jaminan: this.dataRegistration.id,
        action:this.submitAction,
        notes:""
    }
    setTimeout(()=>{
      this.registrationService.approvalBankGuarantee(approvalRequest).subscribe(data=>{
        this.resetButton();
        this.handleHistoryByNomorJaminan();
        this.handleLoadData();
        this.toastrService.success('success','Bank Guarantee Approved');
        this.activeIdTab = "tab-history";
        this.tabHistory = true;
        this.spinner.isSpinnerVisible = false;
      },
      (error : any)=>{
        var error = JSON.parse(error._body);
        this.toastrService.error(error.message);
        this.spinner.isSpinnerVisible = false;
      });
    },1000);
  }

  handleApprovalRej(){
    this.spinner.isSpinnerVisible = true;
    this.handleSaveConfirmation(false);
    var approvalRequest = {
        id_jaminan: this.dataRegistration.id,
        action:"REJECTION",
        notes:this.alasan_reject
    }
    setTimeout(()=>{
        this.registrationService.approvalBankGuarantee(approvalRequest).subscribe(data=>{
          this.closeModalAlasanReject();
          this.resetButton();
          this.handleLoadData();
          this.handleHistoryByNomorJaminan();
          this.toastrService.success('success','Berhasil Simpan Data Registration')
          this.activeIdTab = "tab-history";
          this.tabHistory = true;
          this.spinner.isSpinnerVisible = false;
        },
        (error : any)=>{
          var error = JSON.parse(error._body);
          this.toastrService.error(error.message);
          this.closeModalAlasanReject();
          this.spinner.isSpinnerVisible = false;
        });
    },1000);
  }

  handleNextRegistration(){
    this.activeIdTab = "tab-confirmation";
  }

  handleDownloadPDF(){
    let fileName = this.dataRegistration.softcopy_jaminan_url;
    let newFileName = fileName.slice(fileName.lastIndexOf("/")+1,fileName.length);
    this.fileManagementService.downloadFile('pdf',newFileName);
  }

  handleDownloadSuratKonfirmasi(){
    const tanda_tangan = true;
    this.fileManagementService.downloadSuratKonfirmasi('pdf',this.dataRegistration.id, true);
  }

  handleHistoryByNomorJaminan(){
    let idJaminan = this.route.snapshot.paramMap.get('id_jaminan');
    this.registrationService.getHistoryByNomorJaminan(idJaminan).subscribe(data=>{
      if(data != null){
        this.dataHistoryBankGuarantee = data;
      }
    })
  }

  showModalAlasanReject(){
    document.querySelector('#'+"modalAlasanReject").classList.add('md-show');
  }

  closeModalAlasanReject() {
    this.alasan_reject="";
    document.querySelector('#'+"modalAlasanReject").classList.remove('md-show');
  }

  handleButtonRowCondition(){
    if(this.readPriv
      && this.updatePriv == false
      && this.createPriv == false
      && this.approvePriv == false
      && this.deletePriv == false){
        this.tabConfirmation = true;
        this.tabHistory = true;
        this.nextButton = true;
        this.nextRegButton = false;
    }
    else if(this.updatePriv || this.createPriv){
      if(this.dataRegistration.bank_guarantee_status == "PENDING BG"
      || this.dataRegistration.bank_guarantee_status == "REJECTED BG"
      || this.dataRegistration.bank_guarantee_status == "BG FROM STAGING"){
        if(this.dataRegistration.bank_guarantee_status == "REJECTED BG"){
          this.tabConfirmation = true;
          this.tabHistory = true;
        }
        if(this.dataRegistration.manual_bg){
          this.disableAmount = false;
        }
        this.disableAction = false;
        this.nextRegButton = true;
        this.saveDraftButton = true;
        this.submitButton = true;
      }else if(this.dataRegistration.bank_guarantee_status == "WAITING FOR APPROVAL"){
        this.disableTglSurat = false;
        this.tabConfirmation = true;
        this.tabHistory = true;
        if(this.activeIdTab = "tab-registration"){
          this.nextButton = true;
        }
      }else{
        this.showDownloadSuratKonfirmasi = true;
        this.tabConfirmation = true;
        this.tabHistory = true;
        this.nextButton = true;
        this.nextRegButton = false;
      }
    }
    else if(this.approvePriv){
      this.tabConfirmation = true;
      this.tabHistory = true;
      this.nextRegButton = false;
      if(this.dataRegistration.bank_guarantee_status == 'WAITING FOR APPROVAL'
      ||this.dataRegistration.bank_guarantee_status == 'WAITING FOR VERIFICATION'
      ||this.dataRegistration.bank_guarantee_status == 'WAITING FOR VALIDATION'
      ||this.dataRegistration.bank_guarantee_status == 'WAITING FOR CONFIRMATION'){
        this.approveButton = true;
        this.rejectButton = true;
        this.nextButton = false;
      }
      else if(this.dataRegistration.bank_guarantee_status !== 'WAITING FOR APPROVAL'
      && this.dataRegistration.bank_guarantee_status !== 'PENDING BG'
      && this.dataRegistration.bank_guarantee_status !== 'REJECTED BG'
      && this.dataRegistration.bank_guarantee_status !== "BG FROM STAGING"){
        this.showDownloadSuratKonfirmasi = true;
        this.nextButton = true;
        this.nextRegButton = false;
      }else{
        this.nextButton = true;
        this.nextRegButton = false;
      }
    }
  }

  resetButton(){
    this.disableAction = true;
    this.disableTglSurat = true;
    this.nextRegButton = false;
    this.saveDraftButton = false;
    this.submitButton = false;
    this.approveButton = false;
    this.rejectButton = false;
    this.nextButton = false;
    this.showDownloadSuratJaminan= false;
    this.showDownloadSuratKonfirmasi= false;
  }

  handleCalculateClaimDate(){
    this.dataRegistration.tanggal_batas_claim = this.tempBatasClaimDate;
    let tgl_berakhir = new Date(this.dataRegistration.tanggal_berakhir);
    this.dataRegistration.tanggal_batas_claim = tgl_berakhir.setDate(tgl_berakhir.getDate() + Number(this.dataRegistration.tenggang_waktu_claim))
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

  handleValidationRegistration(data){
    if(typeof(this.selectedAlamatBank.id) == 'undefined'){
      this.toastrService.error('error','Alamat Bank Penerbit tidak boleh kosong');
      this.continue = false;
    }else if(typeof(this.selectedBeneficiary.id) == 'undefined'){
      this.toastrService.error('error','Beneficiary tidak boleh kosong');
      this.continue = false;
    }else if(typeof(this.selectedCurrency.id) == 'undefined'){
      this.toastrService.error('error','Currency tidak boleh kosong');
      this.continue = false;
    }else if(typeof(this.selectedJenisJaminan.id) == 'undefined'){
      this.toastrService.error('error','Jenis Jaminan tidak boleh kosong');
      this.continue = false;
    }else if(typeof(this.selectedJenisProduk.id) == 'undefined'){
      this.toastrService.error('error','Jenis Produk tidak boleh kosong');
      this.continue = false;
    }else if(data.nama_bank_penerbit == '' || data.nama_bank_penerbit == null){
      this.toastrService.error('error','Nama Bank Penerbit tidak boleh kosong');
      this.continue = false;
    }else if(data.nilai_jaminan == '' || data.nilai_jaminan == null){
      this.toastrService.error('error','Nilai Jaminan  tidak boleh kosong');
      this.continue = false;
    }else if(data.nomor_jaminan == '' || data.nomor_jaminan == null){
      this.toastrService.error('error','Nomor Jaminan tidak boleh kosong');
      this.continue = false;
    }else if(data.nomor_amendment == '' || data.nomor_amendment == null){
      this.toastrService.error('error','Nomor Amendment tidak boleh kosong');
      this.continue = false;
    }else if(data.nomor_kontrak == ''|| data.nomor_kontrak == null){
      this.toastrService.error('error','Nomor Kontrak tidak boleh kosong');
      this.continue = false;
    }else if(data.applicant == '' || data.applicant == null){
      this.toastrService.error('error','Applicant tidak boleh kosong');
      this.continue = false;
    }else if(data.softcopy_jaminan_name == '' || data.softcopy_jaminan_name == null){
      this.toastrService.error('error','Softcopy Jaminan harus diupload');
      this.continue = false;
    }else if(data.tanggal_batas_claim == '' || data.tanggal_batas_claim == null){
      this.toastrService.error('error','Tanggal Batas Claim tidak boleh kosong');
      this.continue = false;
    }else if(data.tanggal_berakhir == '' || data.tanggal_berakhir == null){
      this.toastrService.error('error','Tanggal Berakhir tidak boleh kosong');
      this.continue = false;
    }else if(data.tanggal_berlaku == '' || data.tanggal_berlaku == null){
      this.toastrService.error('error','Tanggal Berlaku tidak boleh kosong');
      this.continue = false;
    }else if(data.tanggal_terbit == '' || data.tanggal_terbit == null){
      this.toastrService.error('error','Tanggal Terbit tidak boleh kosong');
      this.continue = false;
    }else if(data.tenggang_waktu_claim == '' || data.tenggang_waktu_claim == null){
      this.toastrService.error('error','Tenggang Waktu Claim tidak boleh kosong');
      this.continue = false;
    }else if(this.selectedUnitPengguna.id == '' || this.selectedUnitPengguna.id == null){
      this.toastrService.error('error','Unit Pengguna tidak boleh kosong');
      this.continue = false;
    }else if(data.uraian_pekerjaan == '' || data.uraian_pekerjaan == null){
      this.toastrService.error('error','Uraian Pekerjaan tidak boleh kosong');
      this.continue = false;
    }else{
      this.continue = true;
    }
  }
}
