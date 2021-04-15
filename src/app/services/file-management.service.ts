import { Injectable } from '@angular/core';
import { RequestOptions, ResponseContentType, Http, Headers } from '@angular/http';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { Configuration } from './base_services/configuration';
import { AngularCsv } from 'angular7-csv/dist/Angular-csv';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Observable } from 'rxjs';
// import * as Excel from 'exceljs';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as _ from 'lodash';


const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class FileManagementService {

  constructor(
    private http: Http,
    private localStorageService: LocalStorageService) {
  }

  downloadFileWithPath(fileName: string): Observable<File> {
    let url = Configuration.FILE + "/download-only?fileName=" + fileName;
    let header = new Headers();
    let token = this.localStorageService.retrieve('token');
    header.append('Authorization', 'bearer ' + token);
    header.append('Content-Type', 'application/json');
    let options = new RequestOptions({ responseType: ResponseContentType.Blob, headers: header });
    return this.http
      .get(url, options)
      .map((res: any) => res.blob());
  }

  downloadFile(propertyId: string, fileName: string) {
    let url = Configuration.FILE + "/download?fileName=" + fileName;
    this.createPDF(url);
  }

  downloadSuratKonfirmasi(propertyId: string, idJaminan: string, tanda_tangan) {
    let url = Configuration.FILE + "/export/confirmation?idJaminan=" + idJaminan+"&ttdFile="+tanda_tangan;
    this.createPDF(url);
  }

  createPDF(url) {
    let header = new Headers();
    let token = this.localStorageService.retrieve('token');
    header.append('Authorization', 'bearer ' + token);
    header.append('Content-Type', 'application/json');
    let options = new RequestOptions({ responseType: ResponseContentType.Blob, headers: header });
    this.http.get(url, options).subscribe(res => {
      const blob = new Blob([res.blob()], { type: 'application/pdf' });
      var fileUrl = URL.createObjectURL(blob);
      window.open(fileUrl)
    });
  }
  createPostPDF(url, data) {
    let header = new Headers();
    let token = this.localStorageService.retrieve('token');
    header.append('Authorization', 'bearer ' + token);
    header.append('Content-Type', 'application/json');
    let options = new RequestOptions({ responseType: ResponseContentType.Blob, headers: header });
    this.http.post(url, data, options).subscribe(res => {
      const blob = new Blob([res.blob()], { type: 'application/pdf' });
      var fileUrl = URL.createObjectURL(blob);
      window.open(fileUrl)
    });
  }

  csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalseparator: '.',
    showLabels: false,
    showTitle: false,
    title: '',
    useBom: true,
    noDownload: false,
    headers: ["Nomor Jaminan", "Nomor Amendment", "Applicant",
      "Jenis Produk", "Jenis Jaminan", "Nama Beneficiary",
      "Unit Pengguna", "Nama Bank Penerbit", "Alamat Bank Penerbit",
      "Nomor Kontrak", "Uraian Pekerjaan", "Currency", "Nilai Jaminan",
      "Tanggal Terbit", "Tanggal Berlaku", "Tanggal Berakhir",
      "Tenggang Waktu Claim", "Tanggal Batas Claim", "Bank Guarantee Status"]
  };

  exportCsv(data, fileName) {
    new AngularCsv(data, fileName, this.csvOptions);
  }

  public exportAsExcelFile(data: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  public exportAsExcelFileByElement(element: string, excelFileName: string): void {
    let table: any = document.getElementById(element);
    let workbook = new Excel.Workbook();
    let worksheet = workbook.addWorksheet('Guarantee', { pageSetup: { fitToPage: true, fitToHeight: 5, fitToWidth: 7 } });
    let coulmnHeader = [];
    let tableHeaders = Array.from(table.tHead.getElementsByTagName('th'));
    tableHeaders.forEach((val: any, idx) => {
      coulmnHeader.push({ header: val.innerText.trim(), key: idx, width: val.innerText.length });
    });
    worksheet.columns = coulmnHeader;

    let tableRows = Array.from(table.tBodies[0].getElementsByTagName('tr'));
    let rowColors = [];
    tableRows.forEach((val: any, idx) => {
      rowColors.push(val.getAttribute('class'));
      let tableColumns = Array.from(val.getElementsByTagName('td'));
      var data = []
      tableColumns.forEach((val2: any, idx2) => {
        data.push(val2.innerText.trim());
      });
      worksheet.addRow(data);
    })

    //Row Header
    worksheet.getRow(1).eachCell((cell) => {
      cell.border = {
        top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' },
        color: { argb: 'FFFFFFFF' }
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF001f67' },
      };
      cell.font = {
        color: { argb: 'FFFFFFFF' },
        bold: true
      }
    });

    worksheet.eachRow((row, idx) => {
      if (idx != 1) {
        row.eachCell((cell) => {
          let cellColor = 'FFFFFFFF';
          let fontColor = 'FF000000';
          let borderColor = 'FF000000'; //'FFDDDDDD';
          switch (rowColors[idx - 2].replace('ng-star-inserted', '').trim()) {
            case 'bg-danger':
              cellColor = 'FFE1091D';
              fontColor = 'FFFFFFFF';
              borderColor = 'FFFFFFFF';
              break;
            case 'bg-warning':
              cellColor = 'FFFFC107';
              fontColor = 'FFFFFFFF';
              borderColor = 'FFFFFFFF';
              break;
            case 'bg-sucess':
              cellColor = 'FF28A745';
              fontColor = 'FFFFFFFF';
              borderColor = 'FFFFFFFF';
              break;
            default:
              break;
          }

          cell.border = {
            top: { style: 'thin' }, bottom: { style: 'thin' }, left: { style: 'thin' }, right: { style: 'thin' },
            color: { argb: borderColor }
          };

          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: cellColor },
          };

          cell.font = {
            color: { argb: fontColor },
          }
        });
      }
    });


    worksheet.columns.forEach(col => {
      let maxLength = col.width;
      col.values.forEach(val => {
        maxLength = val.length > maxLength ? val.length : maxLength
      });
      col.width = (maxLength * 1.5);
    });

    workbook.xlsx.writeBuffer().then((excelBuffer) => {
      this.saveAsExcelFile(excelBuffer, excelFileName);
    });
  }
}
