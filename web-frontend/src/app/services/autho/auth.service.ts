import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {PasswordEncryptService} from '../../securities/password-encrypt.service';
import {Observable} from 'rxjs';
import {SERVER_API_URL} from '../../customizes/app-constant';

@Injectable()
export class AuthService {
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(request) {
    try {
      localStorage.clear();
      request.password = PasswordEncryptService.encrypt(request.password);
      return this.http.post<any>(SERVER_API_URL + '/auth/login', request);

    } catch (error) {
      throw error;

    }


  }

  changePassword(request) {
    try {
      request.oldPassword = PasswordEncryptService.encrypt(request.oldPassword);
      request.newPassword = PasswordEncryptService.encrypt(request.newPassword);

      if (request.username) {
        return this.http.post<any>(SERVER_API_URL + '/auth/password/change', request);
      } else {
        this.logout();

      }
    } catch (error) {
      throw error;

    }


  }

  getPermissionsOfUser(username) {

    return this.http.get<any>(SERVER_API_URL + '/amUser/getPermissions?username=' + username);

  }

  loginForm(data: any) {
    return this.http.post<any>(SERVER_API_URL + '/auth/login', data);
  }

  logout(): void {
    console.log('logout');
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
