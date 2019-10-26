import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';
import {BaseComponentToastr} from '../../../../customizes/view/base-component-toastr';
import {AuthService} from '../../../../services/autho/auth.service';
import {ErrorTransPipe} from '../../../../customizes/pipes/error-trans.pipe';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']

})
export class ChangePasswordComponent extends BaseComponentToastr implements OnInit {
  username;
  lockInput = false;
  btName = 'submit';
  repeatPassword;
  oldPassword;
  newPassword;
  errorMsg = null;

  resetView() {
    this.oldPassword = null;
    this.newPassword = null;
    this.repeatPassword = null;
  }

  submit() {

    this.lockInput = true;
    this.excuteHttpRequest('Change Password', this.authenService.changePassword({username: this.username, oldPassword: this.oldPassword, newPassword: this.newPassword}), success => {
      this.lockInput = false;
      this.resetView();
      this.errorMsg = null;
      this.authenService.logout();


    });


  }

  constructor(private authenService: AuthService, protected messageService: MessageService, protected  errorTranslate: ErrorTransPipe) {
    super(messageService, errorTranslate);
  }

  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const account = JSON.parse(currentUser);
      this.username = account.username;
    }
    if (this.username == null) {

      this.authenService.logout();

    }
  }

  onError(functionName, errorCode, errorMsg, detailError) {

  }

  onErrorClearly(functionName, errorClearly) {
    super.onErrorClearly(functionName, errorClearly);
    this.lockInput = false;
    this.errorMsg = errorClearly;
  }

  onRequestSuccess(response) {
    this.notifySuccess('successfull', 'Change Password');
  }

}
