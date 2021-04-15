import { Injectable } from '@angular/core';
import { ToastyService, ToastOptions } from 'ng2-toasty';

@Injectable()
export class ToastService {

  constructor(
    private toastyService: ToastyService) {
  }

  showToast(options) {
    this.toastyService.clearAll();

    const toastOptions: ToastOptions = {
      title: options.title,
      msg: options.msg,
      showClose: true,
      // timeout: options.timeout,
      theme: 'default',
    };

    switch (options.type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }

  showToaster(type: string, msg: string) {
    this.toastyService.clearAll();

    const toastOptions: ToastOptions = {
      title: '',
      msg: msg,
      showClose: true,
      theme: 'default',
    };

    switch (type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }
  }

  success(msg) {
    const toastOptions: ToastOptions = {
      title: '',
      msg: msg,
      showClose: true,
      theme: 'default',
    };
    this.toastyService.success(toastOptions);
  }

  info(msg) {
    const toastOptions: ToastOptions = {
      title: '',
      msg: msg,
      showClose: true,
      theme: 'default',
    };
    this.toastyService.info(toastOptions);
  }

  warning(msg) {
    const toastOptions: ToastOptions = {
      title: '',
      msg: msg,
      showClose: true,
      theme: 'default',
    };
    this.toastyService.warning(toastOptions);
  }

  error(msg) {
    const toastOptions: ToastOptions = {
      title: '',
      msg: msg,
      showClose: true,
      theme: 'default',
    };
    this.toastyService.error(toastOptions);
  }
}
