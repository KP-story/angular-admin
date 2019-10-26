import {getUrlScheme} from '@angular/compiler';
import {HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import {SERVER_API_URL} from '../app-constant';

export abstract class AbstractCrudService implements CurdService {

  protected constructor(protected httpClient: HttpClient) {

  }

  static httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Max-Age': '600'
  });

  listAll<T>();
  listAll<T>(pageSize?: number, pageNumber?: number) {
    let condition = new HttpParams();
    if (pageSize) {
      condition = condition.set('size', pageSize + '');

    }
    if (pageNumber) {
      condition = condition.set('page', pageNumber + '');
    }
    return this.list<T>(condition, this.getListingUrl());

  }

  find<T>(condition: HttpParams, pageSize?: number, pageNumber?: number) {
    if (pageSize) {
      condition = condition.set('size', pageSize + '');

    }
    if (pageNumber) {
      condition = condition.set('page', pageNumber + '');
    }
    return this.list<T>(condition, this.getSearchUrl());
  }

  public list<T>(params: HttpParams, url: string) {
    return this.httpClient.get<T>(url, {headers: AbstractCrudService.httpHeaders, params: params});
  }

  public get<T>(params: HttpParams, url) {
    console.log(JSON.stringify(params));

    return this.httpClient.get<T>(url, {headers: AbstractCrudService.httpHeaders, params: params});
  }

  public put<T>(params: HttpParams, data: any, url) {
    return this.httpClient.put<T>(url, JSON.stringify(data), {headers: AbstractCrudService.httpHeaders, params: params});
  }

  public del<T>(params: HttpParams, url) {
    return this.httpClient.delete<T>(url, {headers: AbstractCrudService.httpHeaders, params: params});
  }

  public delMulti<T>(data: any, url) {
    return this.httpClient.post<T>(url + '/delete', JSON.stringify(data), {headers: AbstractCrudService.httpHeaders});
  }

  public post<T>(data: any, url) {
    return this.httpClient.post<T>(url, JSON.stringify(data), {headers: AbstractCrudService.httpHeaders});
  }

  public abstract getApiName();

  public getBaseUrl(): string {
    return SERVER_API_URL + '/' + this.getApiName();
  }

  public getMultipleUrl(): string {
    return SERVER_API_URL + '/' + this.getApiName() + '/multiple';
  }

  public getListingUrl(): string {
    return SERVER_API_URL + '/' + this.getApiName() + '/list';
  }

  public getSearchUrl(): string {
    return SERVER_API_URL + '/' + this.getApiName() + '/search';
  }

  view<T>(id: any) {
    return this.get<T>(null, this.getBaseUrl() + '/' + id);
  }

  create<T>(data: any) {
    return this.post<T>(data, this.getBaseUrl());
  }

  update<T>(id: any, data: any) {
    return this.put<T>(null, data, this.getBaseUrl() + '/' + id);
  }

  delete<T>(id: any) {
    return this.del<T>(null, this.getBaseUrl() + '/' + id);
  }

  deleteMulti<T>(data: any) {
    return this.delMulti<T>(data, this.getMultipleUrl());
  }
}

export interface CurdService {
  getApiName(): String;

  view<T>(id: any);

  create<T>(data: any);

  update<T>(id: any, data: any);

  delete<T>(id: any);

  listAll<T>();

  listAll<T>(pageSize: number, pageNumber: number);

  find<T>(condition: HttpParams);

  find<T>(condition: HttpParams, pageSize: number, pageNumber: number);

  list<T>(data: any, url: String);

  put<T>(condition, data: any, url: String);

  del<T>(data: any, url: String);

  post<T>(data: any, url: String);
}
