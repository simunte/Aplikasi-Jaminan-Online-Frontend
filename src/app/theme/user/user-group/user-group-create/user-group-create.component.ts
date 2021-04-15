import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterDataService } from 'src/app/services/master-data.service';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { Role } from '../role';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UpdateTemp } from '../update-temp';
import { ModalBasicComponent } from 'src/app/shared/modal-basic/modal-basic.component';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastService } from 'src/app/services/toast.service';
import { SpinnerComponent } from 'src/app/shared/spinner/spinner.component';

@Component({
  selector: 'app-user-group-create',
  templateUrl: './user-group-create.component.html',
  styleUrls: ['./user-group-create.component.scss']
})
export class UserGroupCreateComponent implements OnInit {

  userGroup: any;
  param: any
  menus = [];
  idRole: any;
  groupName: any;
  response: any;
  inUpdate: any;
  note: any;


  @ViewChild('modalNote') modalNote: ModalBasicComponent
  @ViewChild('spinner') spinner : SpinnerComponent;
  constructor(
    private masterDataService: MasterDataService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: ActivatedRoute,
    private route: Router,
    private localStorageService: LocalStorageService
  ) {

  }

  ngOnInit() {
    this.masterDataService.getAllMenus().subscribe(data => {
      this.menus = data.map(menu => {
        menu.create_access = false
        menu.approval_access = false
        menu.update_access = false
        menu.approval_access = false
        menu.read_access = false
        menu.delete_access = false

        return menu;
      });

      this.param = this.router.snapshot.paramMap.get('id')
      this.getRoleById(this.param);
    })

  }

  getRoleById(param) {
    this.note = ''
    this.masterDataService.getRoleMenu(param).subscribe(role => {
      if (role.status == 'WAITING FOR APPROVAL' || role.status == 'REJECTED') {
        if (role.status == 'WAITING FOR APPROVAL') {
          this.inUpdate = true;
        } else if (role.status == 'REJECTED') {
          this.inUpdate = false;
        }

        this.masterDataService.getRoleTemp(param).subscribe(role => {
          let toJson = role.data
          let jsonFromStr = toJson.replace(/["']/g, '"');
          let roles = JSON.parse(jsonFromStr)

          this.groupName = roles.name
          this.idRole = roles.id;
          // this.menus = roles.menus;
          this.setMenuRole(roles.menus)
          this.note = roles.note;
        })
      } else {
        this.groupName = role.name
        this.idRole = role.id;
        // this.menus = role.menus;
        this.setMenuRole(role.menus)

      }
    })
  }


  handleCheckBox(event, name, index) {
    var checked = event.target.checked;
    this.menus.map((data, i) => {
      if (name == 'create' && checked == true) {
        this.menus[index].create_access = true;
      } else if (name == 'update' && checked == true) {
        this.menus[index].update_access = true;
      } if (name == 'approval' && checked == true) {
        this.menus[index].approval_access = true;
      } else if (name == 'delete' && checked == true) {
        this.menus[index].delete_access = true;
      } else if (name == 'read' && checked == true) {
        this.menus[index].read_access = true;
      }

      if (name == 'create' && checked == false) {
        this.menus[index].create_access = false;
      } else if (name == 'update' && checked == false) {
        this.menus[index].update_access = false;
      } if (name == 'approval' && checked == false) {
        this.menus[index].approval_access = false;
      } else if (name == 'delete' && checked == false) {
        this.menus[index].delete_access = false;
      } else if (name == 'read' && checked == false) {
        this.menus[index].read_access = false;
      }
    })

  }

  deleteMenu(id) {
    this.menus.splice(id, 1)
  }

  setMenuRole(roles: any) {
    roles.forEach(role => {
      this.menus = this.menus.map(x => {
        if (x.menu_id == role.menu_id) {
          x = role;
        }
        return x;
      });
    });
  }

  submit(reject) {
    this.spinner.isSpinnerVisible = true;
    if(reject){
      if(this.note == null || this.note == ""){
        this.spinner.isSpinnerVisible = false;
       return this.toastService.error('Komentar tidak boleh kosong');
      }
    }
    
    
    let request = new Role();
    request.id = this.idRole
    request.name = this.groupName;
    request.activated = true;
    request.menus = this.menus.filter(val => {
      if (val.create_access != false ||
        val.approval_access != false ||
        val.update_access != false ||
        val.approval_access != false ||
        val.read_access != false ||
        val.delete_access != false) {
        return val;
      }
    });
    request.note = this.note
    let stringJson = JSON.stringify(request);
    let newStringJson = stringJson.replace(/["']/g, "'");
    let requestTemp = new UpdateTemp();
    requestTemp.roleId = this.idRole
    requestTemp.data = newStringJson
    requestTemp.isReject = reject
    requestTemp.note = this.note
    requestTemp.name = this.groupName;
    this.masterDataService.saveRoleTemp(requestTemp).subscribe(data => {
      if (data) {
        this.toastService.success('Update User Group Berhasil')
        this.route.navigate(['user/user-group']);
        this.spinner.isSpinnerVisible=false;
      }
    }, error => {
      this.spinner.isSpinnerVisible=false;
      let errorBody = error._body ? JSON.parse(error._body) : null;
      this.toastService.error(errorBody.message || errorBody.error_description);
    })
  }

  approve() {
    this.spinner.isSpinnerVisible=true;
    let request = new Role();
    request.id = this.idRole
    request.name = this.groupName;
    request.activated = true;
    request.menus = this.menus.filter(val => {
      if (val.create_access != false ||
        val.approval_access != false ||
        val.update_access != false ||
        val.approval_access != false ||
        val.read_access != false ||
        val.delete_access != false) {
        return val;
      }
    });
    this.masterDataService.addRole(request).subscribe(data => {
      this.toastService.success("Berhasil Approve")
      this.route.navigate(['user/user-group']);
      this.spinner.isSpinnerVisible=false;
    }, error => {
      let errorBody = error._body ? JSON.parse(error._body) : null;
      this.toastService.error(errorBody.message || errorBody.error_description);
      this.spinner.isSpinnerVisible=false;
      //this.route.navigate(['user/user-group']);
    });
  }

  reject() {
    
    this.note = null
    this.modalNote.show();
  }

  checkPrivilage(access): boolean {
    let privilage = this.localStorageService.retrieve('privilege');
    let roleMenu = privilage.menus.filter(x => x.alias_menu == 'user_groups')[0];

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
