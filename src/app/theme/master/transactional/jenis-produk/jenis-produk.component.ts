import { TranslateService } from '@ngx-translate/core';
import { MasterDataService } from 'src/app/services/master-data.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalBasicComponent } from 'src/app/shared/modal-basic/modal-basic.component';
import { LocalStorageService } from 'ngx-webstorage';
import swal from 'sweetalert2';
import { ToastService } from 'src/app/services/toast.service';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-jenis-produk',
  templateUrl: './jenis-produk.component.html',
  styleUrls: ['./jenis-produk.component.scss',
    '../../../../../assets/icon/icofont/css/icofont.scss',
    '../../../../../../node_modules/sweetalert2/src/sweetalert2.scss']
})
export class JenisProdukComponent implements OnInit {
  @ViewChild('modalDefault') modalDefault: ModalBasicComponent;
  @ViewChild('modalComment') modalComment: ModalBasicComponent;
  @ViewChild('spinner') spinner: SpinnerComponent;
  MODE_EDIT = 'edit';
  MODE_APPROVE = 'approval';
  MODE_VIEW = 'view';
  public showNotes = false;

  public data: Observable<any>;
  public request: any = {};
  public filter: any = {};

  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';

  // public moduleString = 'Jenis Produk';
  public position = 'top-right';

  public dialogMode: string;


  constructor(public httpClient: HttpClient,
    public service: MasterDataService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private toastService: ToastService,
    private translate: TranslateService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const status = this.route.snapshot.paramMap.get('status');
    this.data = this.service.getAllJenisProduk(status);
  }

  openMyModal(event) {
    this.request = {};
    this.dialogMode = this.MODE_EDIT;
    this.showNotes = false;
    this.modalDefault.show();
  }

  openDetail(item: any, mode: string) {
    if (mode === this.MODE_EDIT && item.status.toUpperCase().indexOf('REJECT') === -1) {
      this.toastService.warning(this.translate.instant('NOTIF.CANNOT_EDIT'));
    } else if (mode === this.MODE_APPROVE && this.localStorageService.retrieve('username') === item.modified_by) {
      this.toastService.warning(this.translate.instant('NOTIF.CANNOT_APPROVE'));
    } else if (mode === this.MODE_APPROVE && item.status.toUpperCase().indexOf('WAITING FOR') === -1) {
      this.toastService.warning(this.translate.instant('NOTIF.CANNOT_APPROVE'));
    } else {
      this.dialogMode = mode;
      this.request = item;
      this.showNotes = item.status.toUpperCase().indexOf('REJECT') !== -1;
      this.modalDefault.show();
    }
    return false;
  }

  deleteItem(item: any) {
    if (item.status.indexOf('WAITING FOR') !== -1) {
      this.toastService.warning(this.translate.instant('NOTIF.CANNOT_DELETE'));
    } else {
      swal({
        text: this.translate.instant('NOTIF.CONFIRM_DELETE'),
        type: 'error',
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.value) {
          this.spinner.isSpinnerVisible = true;
          const request = [{ id: item.id }];
          this.service.deleteJenisProduk(request).subscribe(data => {
            this.toastService.success(this.translate.instant('NOTIF.SUCCESS_DELETE'));
            this.modalDefault.hide();
            this.spinner.isSpinnerVisible = false;
            this.loadData();
          }, error => {
            let errorBody = error._body ? JSON.parse(error._body) : null;
            this.toastService.error(errorBody.message || errorBody.error_description || (this.translate.instant('NOTIF.FAILED_DELETE')));
            this.spinner.isSpinnerVisible = false;
          });
        }
      });
    }
    return false;
  }

  submit() {
    this.spinner.isSpinnerVisible = true;
    if (!this.request.code_produk) {
      this.toastService.warning(this.translate.instant('NOTIF.CODE_REQUIRED'));
      this.spinner.isSpinnerVisible = false;
    } else if (!this.request.jenis_produk) {
      this.toastService.warning(this.translate.instant('NOTIF.PRODUCT_REQUIRED'));
      this.spinner.isSpinnerVisible = false;
    } else {
      if (this.request.id) {
        this.service.updateJenisProduk(this.request).subscribe(data => {
          this.toastService.success(this.translate.instant('NOTIF.SUCCESS_UPDATE'));
          this.modalDefault.hide();
          this.spinner.isSpinnerVisible = false;
          this.loadData();
        }, error => {
          let errorBody = JSON.parse(error._body);
          this.toastService.error(errorBody.message || errorBody.error_description(this.translate.instant('NOTIF.FAILED_UPDATE')));
          this.spinner.isSpinnerVisible = false;
        });
      } else {
        this.service.addJenisProduk(this.request).subscribe(data => {
          this.toastService.success(this.translate.instant('NOTIF.SUCCESS_SAVE'));
          this.modalDefault.hide();
          this.spinner.isSpinnerVisible = false;
          this.loadData();
        }, error => {
          let errorBody = JSON.parse(error._body);
          this.toastService.error(errorBody.message || errorBody.error_description(this.translate.instant('NOTIF.FAILED_SAVE')));
          this.spinner.isSpinnerVisible = false;
        });
      }
    }
  }

  approve(approved: boolean) {
    if (!approved) {
      this.request.notes = "";
      this.modalComment.show();
    } else {
      this.spinner.isSpinnerVisible = true;
      const data = { approval: approved, id: this.request.id, notes: this.request.notes }
      this.service.approvalJenisProduk(data).subscribe(resp => {
        this.toastService.success(this.translate.instant('NOTIF.SUCCESS_APPROVE'));
        this.modalDefault.hide();
        this.spinner.isSpinnerVisible = false;
        this.loadData();
      }, error => {
        let errorBody = JSON.parse(error._body);
        this.toastService.error(errorBody.message || errorBody.error_description(this.translate.instant('NOTIF.FAILED_APPROVE')));
        this.spinner.isSpinnerVisible = false;
      });
    }
  }

  reject() {
    this.spinner.isSpinnerVisible = true;
    const data = { approval: false, id: this.request.id, notes: this.request.notes }
    this.service.approvalJenisProduk(data).subscribe(resp => {
      this.toastService.success(this.translate.instant('NOTIF.SUCCESS_REJECT'));
      this.modalComment.hide();
      this.modalDefault.hide();
      this.spinner.isSpinnerVisible = false;
      this.loadData();
    }, error => {
      let errorBody = JSON.parse(error._body);
      this.toastService.error(errorBody.message || errorBody.error_description(this.translate.instant('NOTIF.FAILED_REJECT')));
      this.spinner.isSpinnerVisible = false;
    });
  }

  filterChanged(event: any) {
    this.filter = JSON.parse(JSON.stringify(this.filter));
  }

  // checkPrivilage(): boolean {
  //   let privilage = this.localStorageService.retrieve('privilege');
  //   return (privilage.code === 'IT')
  // }

  checkPrivilage(access): boolean {
    let privilage = this.localStorageService.retrieve('privilege');
    let roleMenu = privilage.menus.filter(x => x.alias_menu == 'trans_product')[0];

    switch (access) {
      case 'CREATE':
        return roleMenu.create_access;
      case 'UPDATE':
        return roleMenu.update_access;
      case 'DELETE':
        return roleMenu.delete_access;
      case 'APPROVE':
        return roleMenu.approval_access;
      default:
        return false;
    }
  }
}
