import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../customizes/services/crud-service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends AbstractCrudService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  public fetchRoleOfUser(username) {
    const httpParam = new HttpParams().set('username', username);
    return this.get(httpParam, this.getBaseUrl() + '/fetchUserRoles');
  }

  public changeRoleOfUser(data) {
    return this.post(data, this.getBaseUrl() + '/changeRoleOfUser');

  }

  getApiName() {
    return 'seRole';
  }
}
