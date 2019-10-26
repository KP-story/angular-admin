import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UserPermissionService} from '../../services/autho/user-permission.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private userP: UserPermissionService) {
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const permissions = this.userP.getValue();
        if (permissions) {
              let resource = route.data.resource;
              console.log(resource)
          resource = resource + ':S';
            if (route.data.code && permissions.indexOf(resource) === -1) {
                this.router.navigate(['']);
                return false;
            } else {
                return true;
            }
        }
        this.router.navigate(['login']);
        return false;
    }


}
