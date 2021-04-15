import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BankGuaranteeService } from '../../../services/bank-guarantee.service';
import { FileManagementService } from '../../../services/file-management.service';


@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: [
    './verification.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss']
})
export class VerificationComponent implements OnInit {
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public filter: any = {};

  dataList: any;
  bgStatus: string = '';
  exxportXlsCsvData: any = [];
  downloadKind: any = ["CSV", "XLSX"]
  listOfColumn: any = [];

  constructor(public httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private fileManagementService: FileManagementService,
    private registrationService: BankGuaranteeService) { }

  ngOnInit() {
    this.handleLoadFirstData();
  }

  getListAllBg() {
    const status = this.route.snapshot.paramMap.get('bg_status');
    if (status !== null || status !== '') {
      this.bgStatus = status;
    } else {
      this.bgStatus = null;
    }
    const menu = 'VERIFIKASI';
    this.registrationService.getBankGuaranteePln(this.bgStatus, menu).subscribe(data => {
      this.dataList = data;
    })
  }

  setRowClass(color) {
    let cls = '';
    switch (color) {
      case 'red':
        cls = "bg-danger";
        break;
      case 'green':
        cls = "bg-success";
        break;
      case 'yellow':
        cls = "bg-warning";
        break;
      default:
        break;
    }
    return cls;
  }

  loadDataExport() {
    this.exxportXlsCsvData = [];
    for (let i = 0; i < this.dataList.length; i++) {
      let newData = {
        nomor_jaminan: this.dataList[i].nomor_jaminan,
        nomor_amendment: this.dataList[i].nomor_amendment,
        applicant: this.dataList[i].applicant,
        jenis_produk: this.dataList[i].jenis_produk,
        jenis_jaminan: this.dataList[i].jenis_jaminan,
        nama_beneficiary: this.dataList[i].nama_beneficiary,
        unit_pengguna: this.dataList[i].unit_pengguna,
        nama_bank_penerbit: this.dataList[i].nama_bank_penerbit,
        alamat_bank_penerbit: this.dataList[i].alamat_bank_penerbit,
        nomor_kontrak: this.dataList[i].nomor_kontrak,
        uraian_pekerjaan: this.dataList[i].uraian_pekerjaan,
        currency: this.dataList[i].currency,
        nilai_jaminan: this.dataList[i].nilai_jaminan,
        tanggal_terbit: new Date(this.dataList[i].tanggal_terbit),
        tanggal_berlaku: new Date(this.dataList[i].tanggal_berlaku),
        tanggal_berakhir: new Date(this.dataList[i].tanggal_berakhir),
        tenggang_waktu_claim: this.dataList[i].tenggang_waktu_claim,
        tanggal_batas_claim: new Date(this.dataList[i].tanggal_batas_claim),
        bank_guarantee_status: this.dataList[i].bank_guarantee_status
      }
      this.exxportXlsCsvData.push(newData);
    }
  }

  exportToCSV() {
    this.loadDataExport();
    let fileName = "Bank Guarantee";
    this.fileManagementService.exportCsv(this.exxportXlsCsvData, fileName);
  }

  exportAsXLSX() {
    this.loadDataExport();
    let fileName = "Bank Guarantee";
    // this.fileManagementService.exportAsExcelFile(this.exxportXlsCsvData, fileName);
    this.fileManagementService.exportAsExcelFileByElement('exportTable', fileName);
  }

  exportData(data) {
    if (data === "CSV") {
      this.exportToCSV();
    } else {
      this.exportAsXLSX();
    }
    return false;
  }

  handleLoadFirstData() {
    this.handleColumnList();
  }

  listObj: any = [];
  handleColumnList() {
    this.registrationService.getColumnDetail().subscribe(data => {
      if (data.message != 'ERROR') {
        let stringNew = data.list_of_column;
        let newStringify = stringNew.replace(/["']/g, '"');
        this.listObj = JSON.parse(newStringify);
      } else {
        // this.toastrService.error('error',data.message);
      }
      (error: any) => {
        var error = JSON.parse(error._body);
        // this.toastrService.error('error',error.message);
      }
      this.getListAllBg();
    })
  }

  personalizationColumn() {
    let stringJson = JSON.stringify(this.listObj);
    let newStringify = stringJson.replace(/["']/g, "'");
    let request = {
      list_of_column: newStringify
    };
    this.registrationService.saveColumnUser(request).subscribe(data => {
      if (data.message != 'ERROR') {
        this.handleLoadFirstData();
        setTimeout(() => {
          this.closeModalPersonalization();
        }, 1000);
      } else {
        // this.toastrService.error('error',data.message);
      }
      (error: any) => {
        var error = JSON.parse(error._body);
        // this.toastrService.error('error',error.message);
      }
    })
  }

  showModalPersonalization() {
    document.querySelector('#' + "modalPersonalization").classList.add('md-show');
  }

  closeModalPersonalization() {
    this.handleColumnList();
    document.querySelector('#' + "modalPersonalization").classList.remove('md-show');
  }

  columnChecked(data) {
    data.column_show = !data.column_show;
  }

  filterChanged(event: any) {
    this.filter = JSON.parse(JSON.stringify(this.filter));
  }
}
