import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
  isLoading: boolean = false;
  show() {
    this.isLoading = true;
  }
  hide() {
    this.isLoading = false;
  }
}
