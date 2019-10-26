import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {UsersDetailMetadata} from './UserDetail.metadata';
import {TreeNode, MessageService} from 'primeng/primeng';
import {BaseComponentToastr} from '../../../../customizes/view/base-component-toastr';
import {AuthService} from '../../../../services/autho/auth.service';
import {AccountService} from '../../../../services/authen/account.service';
import {ErrorTransPipe} from '../../../../customizes/pipes/error-trans.pipe';
import {RoleService} from '../../../../services/authen/role.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'], providers: [MessageService]

})
export class UserDetailComponent extends BaseComponentToastr implements OnInit {

  formDescription;
  isAccountRequest: boolean;
  submission;
  isCollapsed = true;
  @Input() isCurrentUser = true;
  errorMsg;
  @Input() user;
  currentUser;
  fireSubmitSuccess: EventEmitter<String> = new EventEmitter();
  fireSubmitFailed: EventEmitter<String> = new EventEmitter();
  fireReloadRole: EventEmitter<String> = new EventEmitter();
  @Output() userChange: EventEmitter<String> = new EventEmitter();
  @Input() reload?: EventEmitter<String>;

  resourceMenu;
  roleMenu;
  canGrant: boolean = true;

  constructor(private authorService: AuthService, private  roleService: RoleService, private accountService: AccountService, public messageService: MessageService, public  errorTranslate: ErrorTransPipe) {
    super(messageService, errorTranslate);
  }

  roles: TreeNode[];
  userRoles: TreeNode[];

  submit(event) {
    if (this.isCurrentUser || this.user != null) {
      this.update(event);
    } else {
      this.create(event);
    }
  }

  resetPassword() {
    this.excuteHttpRequest('ResetPassword ', this.accountService.resetPassword({username: this.user}), success => {
      this.notifySuccess('Reset password success. You check email to get new password.', 'Reset Password');

    });
  }

  update(data: any) {

    if (data.data.status === 'Active') {
      data.data.status = 1;
    }
    if (data.data.status === 'Inactive') {
      data.data.status = 0;

    }
    this.excuteHttpRequest('Update user ', this.accountService.update(data.data.userId, data.data), success => {
      this.fireSubmitSuccess.emit('success');
      this.userChange.emit('changed');
      this.loadUser(data.data.username);

    });
  }

  create(data: any) {
    if (data.data.status === 'Active') {
      data.data.status = 1;
    } else {
      data.data.status = 0;

    }

    this.excuteHttpRequest('Create User', this.accountService.create(data.data), success => {
      this.fireSubmitSuccess.emit('success');
      this.userChange.emit('changed');
      this.user = data.data.username;
      this.loadUser(data.data.username);
      this.userRoles = [];

    });

  }


  onMoveToTarget(event) {
    const roles: string[] = [];
    for (const role of this.userRoles) {
      roles.push(role.data.name);
    }
    this.changeRolesOfUser(roles, this.currentUser);


  }

  onMoveToSource(event) {
    const roles: string[] = [];
    for (const role of this.userRoles) {
      roles.push(role.data.name);
    }
    this.changeRolesOfUser(roles, this.currentUser);


  }

  onMoveAllToTarget(event) {

  }

  onMoveAllToSource(event) {

  }

  loadUser(username) {
    this.excuteHttpRequest('Get information of  ' + username, this.accountService.getInfoByUsername(username), success => {
      if (success.amUser.status === 1) {
        success.amUser.status = 'Active';
      } else {
        {
          success.amUser.status = 'Inactive';
        }
      }
      this.submission = {data: success.amUser};
      this.currentUser = success.amUser.username;
      this.errorMsg = null;
    });

  }

  changeRolesOfUser(roles: string[], username: string) {
    this.excuteHttpRequest('Change Roles of user: ' + username, this.roleService.changeRoleOfUser({username: username, roles: roles}), success => {
      this.fireReloadRole.next(this.user);
      this.errorMsg = null;
    });
  }

  initView() {
    this.resourceMenu = [];
    this.roleMenu = [];
    if (this.canGrant) {

      this.excuteHttpRequest('Get All Roles', this.roleService.listAll(), success => {
        this.roles = [];

        for (const role of success.seRole) {
          if (role.status === 1) {
            role.status = 'Active';
          } else {
            role.status = 'Inactive';
          }
          const node = {
            data: role
          };
          this.roles.push(node);
        }


      });
    }
    if (this.isCurrentUser) {
      const currentUser = localStorage.getItem('currentUser');
      if (currentUser) {
        const account = JSON.parse(currentUser);
        this.user = account.username;
      }
    }

    if (this.user != null) {
      this.formDescription = {...UsersDetailMetadata.VIEW_UPDATE_FORM};
      this.loadUser(this.user);
    } else {
      this.formDescription = {...UsersDetailMetadata.VIEW_CREATE_FORM};
    }
  }

  onReloadRolesCompelete() {
    this.compareRole();

  }

  ngOnInit() {

    if (this.reload) {
      this.reload.subscribe(complete => {
        this.user = complete;
        this.initView();
        this.isCollapsed = true;
        this.fireReloadRole.next(this.user);
      });
    }

    setTimeout(() => {
      this.initView();


    });

  }

  compareRole() {
    const unGrantedRoles: TreeNode[] = [];
    for (const role of this.roles) {
      let granted = false;

      for (const userRole of this.userRoles) {
        if (userRole.data.name === role.data.name) {
          granted = true;
        }
      }
      if (!granted) {
        unGrantedRoles.push(role);
      }
    }

    this.roles = unGrantedRoles;

  }


  onError(functionName, errorCode, errorMsg, detailError) {
  }

  onRequestSuccess(response) {
    this.errorMsg = null;

  }

  onErrorClearly(functionName, errorClearly) {
    super.onErrorClearly(functionName, errorClearly);
    if (this.isAccountRequest) {
      this.fireSubmitFailed.emit(errorClearly);
    } else {
      this.errorMsg = errorClearly;
    }
  }


}
