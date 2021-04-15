import { Injectable } from '@angular/core';
import { Http, Headers, ResponseContentType, Response } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { throwError } from 'rxjs';

@Injectable()
export class BaseService {

  constructor(
    private http: Http,
    private localStorageService: LocalStorageService) { }

  

  createHeaderAuthLogin() {
    let headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5hcHA6cGFzc3dvcmQ=');
    return headers;
  }

 
  createHeaderAuth() {
    let headers = new Headers();
    let token = this.getToken();
    headers.append('Authorization', 'bearer ' + token);
    headers.append('Content-Type', 'application/json');
    return headers;
  }
  createHeaderAuthDownload() {
    let headers = new Headers();
    let token = this.getToken();
    headers.append('Authorization', 'bearer ' + token);
    headers.append('Content-Type', 'application/octet-stream');
    return headers;
  }
  createHeaderAuthNoHeader() {
    let headers = new Headers();
    let token = this.getToken();
    headers.append('Authorization', 'bearer ' + token);
    return headers;
  }

  createHeaderBearer() {
    let headers = new Headers();
    let token = this.getToken();
    headers.append('Authorization', 'Bearer ' + token);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  createHeaderNoAuth() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  createHeaderSendEmail() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getData(url) {
    return this.http.get(url)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getAllData(url) {
    return this.http.get(url, { headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError);
  }
  getDataById(url, id) {
    return this.http.get(url + '/' + id, { headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError);
  }
  getDataParam(url, params) {
    return this.http.get(url, { params: params })
      .map(response => response.json())
      .catch(this.handleError);
  }

  getDataHeader(url, params) {
    return this.http.get(url, { params: params, headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError);
  }

  getDataHeaderDownload(url, params) {
    return this.http.get(url, { params: params, headers: this.createHeaderAuthDownload(), responseType: ResponseContentType.Blob, })
      .map(response => {
        return {
          filename: 'filename.pdf',
          data: response.blob()
        }
      })
      .catch(this.handleError);
  }

  getDataHeaderNoParams(url) {
    return this.http.get(url, { headers: this.createHeaderAuth() })
      .map(response => response.json())
  }

  getDataHeaderCustome(url) {
    return this.http.get(url, { headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError);
  }

  getDataHeaderById(url, id, params) {
    return this.http.get(url + '/' + id, { params: params, headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError);
  }

  getDataHeaderByIdNoParams(url, id) {
    return this.http.get(url + '/' + id, { headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError);
  }

  createData(url, data) {
    return this.http.post(url, data)
      .map(response => response.json())
      .catch(this.handleError)
  }

  createDataBearer(url) {
    return this.http.get(url, { headers: this.createHeaderBearer() })
      .map(response => response.json())
  }

  postData(url, data) {
    return this.http.post(url, data, { headers: this.createHeaderAuth() })
      .map(response => response.json())
  }
  postAcitveDirectory(url, username, password) {
    return this.http.post(url + '/' + username + '/' + password, '')
      .map(response => response.json())
      .catch(this.handleError);
  }
  putData(url, data) {
    return this.http.put(url, data, { headers: this.createHeaderAuth() })
      .map(response => response.json())
  }
  changeDataStatus(url, data) {
    return this.http.put(url, data, { headers: this.createHeaderAuth() })
      .map(response => response.json())
  }
  postWithParams(url, data, param) {
    return this.http.post(url, data, { params: param, headers: this.createHeaderAuth() })
      .map(response => response.json())
  }
  postNoAuth(url, data) {
    return this.http.post(url, data)
      .map(response => response.json())
  }
  postNoAuthWithParam(url, data, param) {
    return this.http.post(url, data, { params: param })
      .map(response => response.json())
  }
  createDataParam(url, data) {
    return this.http.post(url, data, { headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError)
  }
  createDataParamLogin(url, data) {
    return this.http.post(url, data, { headers: this.createHeaderAuthLogin() })
      .map(response => response.json())
      .catch(this.handleError)
  }
  createDataUpload(url, data, param) {
    return this.http.post(url, data, { params: param })
      .map(response => response.json())
      .catch(this.handleError)
  }
  postFileUpload(url, data) {
    return this.http.post(url, data, { headers: this.createHeaderAuthNoHeader() })
      .map(response => response.json())
  }
  deleteDataTrans(url) {
    return this.http.delete(url, { headers: this.createHeaderAuth() })
      .map(response => response.json())
  }
  createDataHeader(url, data, params) {
    return this.http.post(url, data, { params: params, headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError)
  }

  createDataHanleSelfError(url, data, params) {
    return this.http.post(url, data, { params: params, headers: this.createHeaderAuth() })
      .map(response => response.json())
  }

  updateData(url, data, params) {
    return this.http.put(url, data, { params: params, headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError)
  }

  updateDataNoParams(url, data) {
    return this.http.put(url, data, { headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError)
  }

  updateDataParam(url, data, id, params) {
    return this.http.put(url, data, { params: params })
      .map(response => response.json())
      .catch(this.handleError)
  }
  updateDataHeader(url, data, params) {
    return this.http.put(url + '/' + data.id, data, { params: params, headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError)
  }
  updateDataHeaderNoId(url, data, params) {
    return this.http.put(url + '/', data, { params: params, headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError)
  }
  updateDataHeaderStatus(url, id, params) {
    return this.http.put(url + '/' + id, {}, { params: params, headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError)
  }
  deleteDataHeaderParam(url, params) {
    return this.http.delete(url, { params: params, headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError)
  }
  deleteDataHeaderBody(url, data) {
    return this.http.delete(url, { body: data, headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError)
  }
  deleteData(url, id, params) {
    return this.http.delete(url + '/' + id, { params: params, headers: this.createHeaderAuth() })
      .map(response => response.json())
      .catch(this.handleError)
  }
  deleteDataParam(url, params) {
    return this.http.delete(url, { params: params })
      .map(response => response.json())
      .catch(this.handleError)
  }
  deleteDataNoParam(url, data) {
    return this.http.delete(url, {
      headers: this.createHeaderAuth(),
      body: data
    })
      .map(response => response.json())
  }

  getToken() {
    return this.localStorageService.retrieve('token');
  }

  getAauth() {
    return this.localStorageService.retrieve('auth');
  }
  getRole() {
    return this.localStorageService.retrieve('allRole');
  }

  private handleError(error) {
    if (error.status === 0) {
      if (JSON.parse(error._body).error === 'invalid_token') {
        alert('Your Session Might Be Expired, Please Login Again!');
        localStorage.clear();
        location.replace(location.origin);
      }
    } else if (error.status === 400) {
      return throwError(error);
    } else if (error.status === 401) {
      if (JSON.parse(error._body).error === 'invalid_token') {
        localStorage.clear();
        location.replace(location.origin);
      }
    } else if (error.status === 404) {
      return throwError(error);
    }
    return throwError(error);
  }
}
