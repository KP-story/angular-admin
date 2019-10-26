import {HttpErrorResponse} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {ErrorTransPipe} from '../pipes/error-trans.pipe';
import {forkJoin} from 'rxjs';

export abstract class BaseComponent {

  INTERNAL_ERROR = 'ERR-500';
  TIMEOUT_ERROR = 'ERR-100';
  LOST_CONNECTION_ERROR = 'ERR-200';

  constructor(protected  errorTranslate: ErrorTransPipe) {
  }

  excuteHttpRequest(headerName, func, success: (value: any) => void) {
    try {
      func.subscribe(response => {
        if (response.resultCode === '0') {
          success(response);
          this.onRequestSuccess(response);

        } else {
          this._onError(headerName, response.resultCode);
        }
      }, error => {
        this._onError(headerName, error);
      });
    } catch (error) {
      this._onError(headerName, error);
    }
  }

  excuteConcurrentHttpRequest(headerName, func: any[], allSuccess: boolean, success: (value: any[]) => void) {
    try {
      forkJoin(func).subscribe(responses => {

        if (allSuccess) {
          for (const response of responses) {
          }
          success(responses);
          this.onRequestSuccess(responses);
        } else {
          success(responses);
          this.onRequestSuccess(responses);

        }


      }, error => {
        this._onError(headerName, error);

      });
      // func.subscribe(response => {
      //   if (response.resultCode === '0') {
      //     success(response);
      //     this.onRequestSuccess(response);
      //
      //   } else {
      //     this._onError(headerName, response.resultCode);
      //   }
      // }, error => {
      //   this._onError(headerName, error);
      // });
    } catch (error) {
      this._onError(headerName, error);
    }
  }


  abstract onRequestSuccess(response);

  abstract onError(functionName, errorCode, errorMsg, detailError);

  abstract onErrorClearly(functionName, errorClearly);


  _onError(functionName, error: any) {
    console.error(error);
    if (error == null) {
      return;
    }
    let errorCode = this.INTERNAL_ERROR;
    let errorMsg;
    let detailError;
    if (error instanceof HttpErrorResponse) {
      errorMsg = 'Error code ' + error.error.resultCode + ': message ' + error.error.resultMsg;
      errorCode = error.error.resultCode;
      detailError = error.error.detailError;

    } else if (typeof error === 'string') {
      errorCode = error;

    } else if (error.name === 'TimeoutError') {
      errorMsg = 'Timeout!';
      errorCode = this.TIMEOUT_ERROR;

    } else {
      errorCode = this.LOST_CONNECTION_ERROR;
      errorMsg = 'Cant not connect to server';
    }

    this.onError(functionName, errorCode, errorMsg, detailError)
    ;
    this.onErrorClearly(functionName, this.errorTranslate.transform(errorCode, detailError));
  }


}


