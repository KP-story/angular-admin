import {SePermission} from './se-permission.model';

export class SeRole {
  public name: string;
  public permissions: SePermission[];
  public status: number;
  public description: string;
  public createdTime: Date;

}
