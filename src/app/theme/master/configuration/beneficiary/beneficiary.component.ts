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
  selector: 'app-beneficiary',
  templateUrl: './beneficiary.component.html',
  styleUrls: ['./beneficiary.component.scss',
    '../../../../../assets/icon/icofont/css/icofont.scss',
    '../../../../../../node_modules/sweetalert2/src/sweetalert2.scss']
})
export class BeneficiaryComponent implements OnInit {
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

  public moduleString = 'Beneficiary';
  public position = 'top-right';

  public dialogMode: string;


  constructor(public httpClient: HttpClient,
    public service: MasterDataService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private toastService: ToastService) { }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const status = this.route.snapshot.paramMap.get('status');
    this.data = this.service.getAllBeneficiary(status);
  }

  openMyModal(event) {
    this.request = {};
    this.dialogMode = this.MODE_EDIT;
    this.showNotes = false;
    this.modalDefault.show();
  }

  openDetail(item: any, mode: string) {
    if (mode === this.MODE_EDIT && item.status.toUpperCase().indexOf('REJECT') === -1) {
      this.toastService.warning('You cannot edit this item.');
    } else if (mode === this.MODE_APPROVE && this.localStorageService.retrieve('username') === item.modified_by) {
      this.toastService.warning('You cannot approve this item.');
    } else if (mode === this.MODE_APPROVE && item.status.toUpperCase().indexOf('WAITING FOR') === -1) {
      this.toastService.warning('You cannot approve this item.');
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
      this.toastService.warning('You cannot delete this item.');
    } else {
      swal({
        text: 'Are you sure want to delete this item?',
        type: 'error',
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.value) {
          this.spinner.isSpinnerVisible = true;
          const request = [{ id: item.id }];
          this.service.deleteBeneficiary(request).subscribe(data => {
            this.toastService.success(this.moduleString + ' successfully deleted.');
            this.modalDefault.hide();
            this.spinner.isSpinnerVisible = false;
            this.loadData();
          }, error => {
            let errorBody = error._body ? JSON.parse(error._body) : null;
            this.toastService.error(errorBody.message || errorBody.error_description || (this.moduleString + ' failed to deleted.'));
            this.spinner.isSpinnerVisible = false;
          });
        }
      });
    }
    return false;
  }

  submit() {
    this.spinner.isSpinnerVisible = true;
    if (!this.request.code_beneficiary) {
      this.toastService.warning('Kode must be filled');
      this.spinner.isSpinnerVisible = false;
    } else if (!this.request.nama_beneficiary) {
      this.toastService.warning('Nama Beneficiary must be filled');
      this.spinner.isSpinnerVisible = false;
    } else {
      if (this.request.id) {
        this.service.updateBeneficiary(this.request).subscribe(data => {
          this.toastService.success(this.moduleString + ' successfully updated.');
          this.modalDefault.hide();
          this.spinner.isSpinnerVisible = false;
          this.loadData();
        }, error => {
          let errorBody = error._body ? JSON.parse(error._body) : null;
          this.toastService.error(errorBody.message || errorBody.error_description || (this.moduleString + ' failed to updated.'));
          this.spinner.isSpinnerVisible = false;
        });
      } else {
        this.service.addBeneficiary(this.request).subscribe(data => {
          this.toastService.success(this.moduleString + ' successfully saved.');
          this.modalDefault.hide();
          this.spinner.isSpinnerVisible = false;
          this.loadData();
        }, error => {
          let errorBody = error._body ? JSON.parse(error._body) : null;
          this.toastService.error(errorBody.message || errorBody.error_description || (this.moduleString + ' failed to saved.'));
          this.spinner.isSpinnerVisible = false;
        });
      }
    }
  }

  approve(approved: boolean) {
    if (!approved) {
      this.request.notes = "";
      this.modalComment.show();
      this.spinner.isSpinnerVisible = false;
    } else {
      this.spinner.isSpinnerVisible = true;
      const data = { approval: approved, id: this.request.id, notes: this.request.notes }
      this.service.approvalBeneficiary(data).subscribe(resp => {
        this.toastService.success(this.moduleString + ' successfully approved.');
        this.modalDefault.hide();
        this.spinner.isSpinnerVisible = false;
        this.loadData();
      }, error => {
        let errorBody = error._body ? JSON.parse(error._body) : null;
        this.toastService.error(errorBody.message || errorBody.error_description || (this.moduleString + ' failed to approved.'));
        this.spinner.isSpinnerVisible = false;
      });
    }
  }

  reject() {
    this.spinner.isSpinnerVisible = true;
    const data = { approval: false, id: this.request.id, notes: this.request.notes }
    this.service.approvalBeneficiary(data).subscribe(resp => {
      this.toastService.success(this.moduleString + ' successfully rejected.');
      this.modalComment.hide();
      this.modalDefault.hide();
      this.spinner.isSpinnerVisible = false;
      this.loadData();
    }, error => {
      let errorBody = error._body ? JSON.parse(error._body) : null;
      this.toastService.error(errorBody.message || errorBody.error_description || (this.moduleString + ' failed to rejected.'));
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
    let roleMenu = privilage.menus.filter(x => x.alias_menu == 'conf_beneficiary')[0];

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
