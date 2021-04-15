import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { MasterDataService } from 'src/app/services/master-data.service';
import { menus } from './menus';
import { Role } from './role'
import { Approve } from './approve';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {



  form: FormGroup;
  allRole = []
  //default
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  public filter: any = {};

  ngOnInit() {
    this.getAllRole();
  }

  constructor(private formBuilder: FormBuilder,
    private masterDataService: MasterDataService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router) {
    this.form = this.formBuilder.group({
      role: new FormArray([]),
      allRole: new FormArray([])
    });


  }

  filterChanged(event: any) {
    this.filter = JSON.parse(JSON.stringify(this.filter));
  }

  getAllRole() {
    const status = this.route.snapshot.paramMap.get('status');
    this.masterDataService.getAllRoleMenu(status).subscribe(data => {
      this.allRole = data;
    })
  }


}

