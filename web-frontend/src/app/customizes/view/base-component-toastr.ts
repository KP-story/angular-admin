import {MessageService} from 'primeng/api';
import {BaseComponent} from './base-component';
import {ErrorTransPipe} from '../pipes/error-trans.pipe';

export abstract class BaseComponentToastr extends BaseComponent {

  constructor(protected messageService: MessageService, protected  errorTranslate: ErrorTransPipe) {
    super(errorTranslate);
    this.httpToastrId = 'globalToastr';

  }

  httpToastrId: string;

  toast(messages: any[]) {
    for (const message of messages) {
      this.messageService.add({key: message.key, severity: message.severity, summary: message.summary, detail: message.detail});
    }
  }


  clear() {
    this.messageService.clear();
  }

  public notifySuccess(message, requestName: string) {

    this.messageService.add({key: this.httpToastrId, severity: 'success', summary: requestName, detail: message});


  }

  onErrorClearly(functionName, errorClearly) {
    if (functionName) {
      this.messageService.add({key: this.httpToastrId, severity: 'error', summary: functionName, detail: errorClearly});
    }
  }
}

