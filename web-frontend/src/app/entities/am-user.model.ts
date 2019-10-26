import {SeRole} from './se-role.model';

export class AmUser {
  public authMethod: string;
  public status: number;
  public failureCount: number;
  public modifiedId: number;
  public rightType: number;
  public document: string;
  public fullname: string;
  public email: string;
  public seRoleEntities: SeRole[];
  public createdTime: Date;
  public phone: string;
  public passwordBackup: string;
  public username: string;
  public deletedId: number;
  public expireStatus: number;
  public address: string;
  public modifiedPassword: Date;
  public fax: string;
  public password: string;
  public priority: number;
  public mobile: string;
  public createdId: number;
  public lockedDate: Date;
  public userId: number;

}
