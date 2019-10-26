import {Component, OnInit, HostListener, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/autho/auth.service';
import {MessageService} from 'primeng/api';
import {UserPermissionService} from '../../services/autho/user-permission.service';
import {BaseComponentToastr} from '../../customizes/view/base-component-toastr';
import {ErrorTransPipe} from '../../customizes/pipes/error-trans.pipe';
import {LoadingButtonService} from '../../customizes/services/loading-button.service';
import {LoadingButtonComponent} from '../../customizes/view/loading-button/loading-button.component';

@Component({

  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent extends BaseComponentToastr implements OnInit {

  username = '';
  password = '';
  errorMsg = null;
  lockInput = false;
  btLoginId = 'LoginBt';


  returnUrl;
  @ViewChild('submitbt', {static: false}) btSummit: LoadingButtonComponent;

  @HostListener('document:keydown.enter', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (this.btSummit) {
      if (!this.btSummit.disabled) {
        this.loadingButtonService.start(this.btLoginId);
        this.login();
      }
    }
  }

  login() {

    this.lockInput = true;
    this.excuteHttpRequest('Login', this.authService.login({username: this.username, password: this.password}), success => {
        this.errorMsg = null;
        localStorage.setItem('currentUser', JSON.stringify({username: this.username, token: success.token}));
        this.userPermissionService.getSyncPermissionsOfUser(this.username).then();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'account';
        this.router.navigate([this.returnUrl]);
      }
    );


  }


  onRequestSuccess(response: any) {
    this.lockInput = false;

    this.loadingButtonService.stop(this.btLoginId);
  }

  onError(functionName: any, errorCode: any, errorMsg: any, detailError: any) {
  }

  onErrorClearly(functionName, errorClearly) {
    super.onErrorClearly(functionName, errorClearly);
    this.lockInput = false;
    this.errorMsg = errorClearly;
    this.loadingButtonService.stop(this.btLoginId);
  }


  constructor(private loadingButtonService: LoadingButtonService, public authService: AuthService, public router: Router, private route: ActivatedRoute, public messageService: MessageService, private userPermissionService: UserPermissionService, public  errorTransate: ErrorTransPipe) {
    super(messageService, errorTransate);
  }

  onchange() {
    this.errorMsg = null;
  }

  ngOnInit() {
    this.lockInput = false;
    localStorage.clear();

  }

  forgotPassword() {
    this.errorMsg = 'Liên hệ admin để khôi phục lại';
  }
}
