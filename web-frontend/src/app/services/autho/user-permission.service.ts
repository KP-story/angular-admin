import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AuthService} from './auth.service';
import {NgIf} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserPermissionService {
  private permissionsSource
    = new BehaviorSubject([]);
  public currentPermission = this.permissionsSource.asObservable();

  public getValue(): string[] {
    return this.permissionsSource.getValue();
  }

  public hasPermission(permissions: string[]): boolean {

    for (const requireP of permissions) {
      if (this.getValue().includes(requireP)) {
        return true;
      }
    }
    return false;
  }

  constructor(private  authService: AuthService, private authenService: AuthService) {
  }

  getAsyncPermissionsOfUser(user: string) {
    this.authService.getPermissionsOfUser(user).subscribe(responseMsg => {

      if (responseMsg.resultCode === '0') {
        this.permissionsSource.next(responseMsg.permissions);
      } else {
        this.authenService.logout();

      }
    }, error => {
      this.authenService.logout();

    });

  }

  getPermissionsOfUser(user: string): Promise<any> {
    return this.authService.getPermissionsOfUser(user).toPromise();
  }

  async getSyncPermissionsOfUser(user: string) {
    const responseMsg = await this.getPermissionsOfUser(user);

    if (responseMsg.resultCode === '0') {
      this.permissionsSource.next(responseMsg.permissions);
    } else {
      this.authenService.logout();

    }


  }

}
