import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Pipe({
  name: 'errorTrans'
})
export class ErrorTransPipe implements PipeTransform {

  transform(resultCode: any, errorDetail: any[]): any {
    let error = '';
    if (errorDetail && errorDetail.length > 0) {
      for (const detail of errorDetail) {
        const e = this.translateService.instant('errorCode.' + detail);
        if (e) {
          error = error + ',' + e;
        }
      }

    } else if (resultCode != null) {
      error = this.translateService.instant('errorCode.' + resultCode);
    }

    if (errorDetail != null && errorDetail.length > 0) {
      error = error.substring(1, error.length);
      return error;

    } else {
      return error === '' ? 'Server Error' : error;
    }
  }

  constructor(public translateService: TranslateService) {
  }

}
