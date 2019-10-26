import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../customizes/services/crud-service';
import {HttpClient} from '@angular/common/http';
import {SERVER_API_URL} from '../../customizes/app-constant';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends AbstractCrudService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  public createAndGrant(data: any) {
    return this.post(data, this.getBaseUrl() + '/create_grant');

  }

  getApiName() {
    return 'sePermission';
  }
}
