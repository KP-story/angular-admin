import {Injectable} from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpInterceptor,
  HttpErrorResponse, HttpUserEvent, HttpProgressEvent, HttpResponse,
  HttpHeaderResponse, HttpSentEvent
} from '@angular/common/http';
import {AuthService} from './auth.service';
import {catchError, finalize} from 'rxjs/operators';
import {throwError, from} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';

import {timeout} from 'rxjs/operators';
import {LoaderService} from '../loader.service';
import {TIME_OUT} from '../../customizes/app-constant';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService, public toast: ToastrService, private loaderService: LoaderService) {
  }

  // tslint:disable-next-line:max-line-length
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any> | any> {
    // add authorization header with jwt token if available
    this.loaderService.show();
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      try {
        const account = JSON.parse(currentUser);
        request = this.addTokenToRequest(request, account.token);

      } catch (error) {
        this.authService.logout();
      }
    }

    const timeoutValue = Number(request.headers.get('timeout')) || TIME_OUT;
    return next.handle(request).pipe(timeout(timeoutValue),
      catchError(error => {

        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 401:
            case 203: {
              this.toast.error(error && error.error.reason ? error.error.reason : '');
              this.authService.logout();
              return throwError(error);
            }
            default:
              return throwError(error);
          }
        }
        return throwError(error);

      }), finalize(() => this.loaderService.hide()));


  }

  private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({setHeaders: {Authorization: `Bearer ${token}`}});
  }
}
