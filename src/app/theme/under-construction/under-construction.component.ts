import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class UnderConstruction {
  id: number;
  bgNo: string;
  reffNo: number;
  applicant: string;
  currency: string;
  amount: string;
  publishDate: string;
  status: string;
}

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: [
    './under-construction.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss']
})
export class UnderConstructionComponent implements OnInit {

  dataList: any = [];

  @Input('modalDefault') modalDefault: any;

  constructor(public httpClient: HttpClient) { }

  ngOnInit() {

  }

}
