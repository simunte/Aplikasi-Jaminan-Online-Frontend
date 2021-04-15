import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';
import { MasterDataService } from 'src/app/services/master-data.service';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalBasicComponent } from 'src/app/shared/modal-basic/modal-basic.component';
import { LocalStorageService } from 'ngx-webstorage';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-master-configuration',
  templateUrl: './master-configuration.component.html',
  styleUrls: ['./master-configuration.component.scss',
    '../../../../../assets/icon/icofont/css/icofont.scss',
    '../../../../../../node_modules/sweetalert2/src/sweetalert2.scss']
})
export class MasterConfigurationComponent implements OnInit {
  @ViewChild('modalComment') modalComment: ModalBasicComponent;
  @ViewChild('spinner') spinner: SpinnerComponent;

  MODE_EDIT = 'edit';
  MODE_APPROVE = 'approval';
  MODE_VIEW = 'view';
  public showNotes = false;
  public request: any = {};

  public moduleString = 'Master Configuration';
  public position = 'top-right';
  public formMode: string = this.MODE_EDIT;

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
    // const status = this.route.snapshot.paramMap.get('status');
    this.service.getMasterConfigurationById().subscribe(data => {
      if (data) {
        this.request = data;
        if(this.request.status == "REJECTED"){
            this.showNotes = true
        } 
        this.checkButtonPrivilege(this.request);
      } else {
        this.formMode = this.MODE_EDIT;
      }
    }, error => {
    });
  }

  checkButtonPrivilege(data){
    if (this.request.status.toUpperCase().indexOf('WAITING FOR') !== -1 && this.localStorageService.retrieve('username') !== data.modified_by) {
      this.formMode = this.MODE_APPROVE;
    }else if (this.request.status.toUpperCase().indexOf('REJECTED') !== -1 && this.localStorageService.retrieve('username') !== data.modified_by){
      this.formMode = this.MODE_EDIT;
    }else if(this.request.status.toUpperCase().indexOf('WAITING FOR') !== -1 && this.localStorageService.retrieve('username') === data.modified_by){
      this.formMode = this.MODE_VIEW;
    }else if (this.request.status.toUpperCase().indexOf('REJECTED') !== -1 && this.localStorageService.retrieve('username') === data.modified_by){
      this.formMode = this.MODE_VIEW;
    }else{
      this.formMode = this.MODE_EDIT;
    }
  }

  submit() {
    this.spinner.isSpinnerVisible = true;
    let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    if (!strongRegex.test(this.request.password)) {
      this.toastService.warning('Password terdiri minimal 8 character, terdiri dari special character dan alphanumeric');
      this.spinner.isSpinnerVisible = false;
    } else if (this.request.id) {
      this.service.updateMasterConfiguration(this.request).subscribe(data => {
        this.toastService.success(this.moduleString + ' successfully updated.');
        this.spinner.isSpinnerVisible = false;
        this.loadData();
      }, error => {
        let errorBody = error._body ? JSON.parse(error._body) : null;
        this.toastService.error(errorBody.message || errorBody.error_description || (this.moduleString + ' failed to updated.'));
        this.spinner.isSpinnerVisible = false;
      });
    } else {
      this.service.addMasterConfiguration(this.request).subscribe(data => {
        this.toastService.success(this.moduleString + ' successfully saved.');
        this.spinner.isSpinnerVisible = false;
        this.loadData();
      }, error => {
        let errorBody = error._body ? JSON.parse(error._body) : null;
        this.toastService.error(errorBody.message || errorBody.error_description || (this.moduleString + ' failed to saved.'));
        this.spinner.isSpinnerVisible = false;
      });
    }
  }

  approve(approved: boolean) {
    if (this.localStorageService.retrieve('username') === this.request.modified_by) {
      this.toastService.warning('You cannot approve this item.');
    } else {
      if (!approved) {
        this.request.notes = "";
        this.modalComment.show();
      } else {
        this.spinner.isSpinnerVisible = true;
        const data = { approval: approved, id: this.request.id, notes: this.request.notes };
        this.service.approvalMasterConfiguration(data).subscribe(resp => {
          this.toastService.success(this.moduleString + ' successfully approved.');
          this.spinner.isSpinnerVisible = false;
          this.loadData();
        }, error => {
          let errorBody = error._body ? JSON.parse(error._body) : null;
          this.toastService.error(errorBody.message || errorBody.error_description || (this.moduleString + ' failed to approved.'));
          this.spinner.isSpinnerVisible = false;
        });
      }
    }
  }

  reject() {
    this.spinner.isSpinnerVisible = true;
    const data = { approval: false, id: this.request.id, notes: this.request.notes };
    this.service.approvalMasterConfiguration(data).subscribe(resp => {
      this.toastService.success(this.moduleString + ' successfully rejected.');
      this.modalComment.hide();
      this.spinner.isSpinnerVisible = false;
      this.loadData();
    }, error => {
      let errorBody = error._body ? JSON.parse(error._body) : null;
      this.toastService.error(errorBody.message || errorBody.error_description || (this.moduleString + ' failed to rejected.'));
      this.spinner.isSpinnerVisible = false;
    });
  }

  // checkPrivilage(): boolean {
  //   let privilage = this.localStorageService.retrieve('privilege');
  //   return (privilage.code === 'IT')
  // }

  checkPrivilage(access): boolean {
    let privilage = this.localStorageService.retrieve('privilege');
    let roleMenu = privilage.menus.filter(x => x.alias_menu == 'conf_configuration')[0];

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
