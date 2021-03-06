import {Injectable} from '@angular/core';
import {AbstractCrudService} from '../../customizes/services/crud-service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OperationService extends AbstractCrudService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  getApiName() {
    return 'seOperation';
  }
}
