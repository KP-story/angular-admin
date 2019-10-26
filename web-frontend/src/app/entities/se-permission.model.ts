import {SeOperation} from './se-operation.model';
import {SeResource} from './se-resource.model';

export class SePermission {
  public name: string;
  public seOperation: SeOperation;
  public seResourceByResource: SeResource;
  public status: number;
  public createdTime: Date;

}
