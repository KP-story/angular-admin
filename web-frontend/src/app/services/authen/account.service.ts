import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../customizes/services/crud-service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends AbstractCrudService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  resetPassword(data: any) {
    return this.post(data, this.getBaseUrl() + '/resetPassword');
  }

  getInfoByUsername(username: string) {
    const httpparams = new HttpParams().set('username', username);

    return this.get(httpparams, this.getBaseUrl() + '/detail');
  }

  getApiName() {
    return 'amUser';
  }
}
