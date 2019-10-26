import {Component, OnInit, EventEmitter} from '@angular/core';

import {MenuEvent} from '../../../../entities/menu-event';
import {UsersManagerMetadata} from './usersManager.metadata';
import {LazyLoadEvent, TreeNode} from 'primeng/primeng';
import {ConfirmationService, MessageService} from 'primeng/components/common/api';
import {BaseCurdView} from '../../../../customizes/view/curd-view/base-curd-view';
import {HttpParams} from '@angular/common/http';
import {AccountService} from '../../../../services/authen/account.service';
import {UserPermissionService} from '../../../../services/autho/user-permission.service';
import {ErrorTransPipe} from '../../../../customizes/pipes/error-trans.pipe';

@Component({
  selector: 'app-users-manager',
  templateUrl: './users-manager.component.html',
  styleUrls: ['./users-manager.component.scss']
  , providers: [ConfirmationService, MessageService]

})
export class UsersManagerComponent extends BaseCurdView implements OnInit {
  maxRowInPage = 2;
  conditionsSearch: any;
  userSelection;
  currentData: TreeNode[];

  reloadUserDetail: EventEmitter<String> = new EventEmitter();
  // update(data: any) {
  //   super.update(data);

  //   if (data.data.status === 'Active') {
  //     data.data.status = 1;
  //   }     if (data.data.status === 'Inactive') {
  //     data.data.status = 0;

  //   }
  //   this.excuteHttpRequest(this.accountService, 'updateUser', data.data, success => {
  //     this.fireSubmitSuccess.emit("success");
  //     this.loadUser({username:data.data.username},0);

  //   })
  // }
  onNewButtonClick() {
    this.userSelection = null;
    this.reloadUserDetail.next(this.userSelection);

  }

  approveDelete() {
    super.approveDelete();

    const users: string[] = [];
    for (const entry of this.deleteEntries) {
      users.push(entry.data.username);
    }

    this.excuteHttpRequest('Delete User', this.accountService.deleteMulti(users), success => {
      this.loadUser(null, 0);
    });
  }

  onViewItem(event: TreeNode) {
    this.userSelection = event.data.username;
    this.reloadUserDetail.next(this.userSelection);
  }

  onUserChange() {
    this.loadUser(this.conditionsSearch, 0);

  }

  // create(data: any) {
  //   super.create(data);
  //   if (data.data.status === 'Active') {
  //     data.data.status = 1;
  //   } else {
  //     data.data.status = 0;

  //   }
  //   this.excuteHttpRequest(this.accountService, 'createUser', data.data, success => {
  //     this.fireSubmitSuccess.emit("success");
  //     this.loadUser({username:data.data.username},0);

  //   });

  // }
  search(data: any) {
    this.conditionsSearch = data.data;
    this.loadUser(this.conditionsSearch, 0);
  }

  loadUser(conditions: any, firstIndex) {
    this.isUpdateRequest = true;
    this.tableLoading = true;
    let httpParams = new HttpParams();
    if (conditions) {
      if (conditions.username != null && conditions.username.length < 2) {
        conditions.username = null;
      } else {
        httpParams = httpParams.set('username', conditions.username);
      }
      if (conditions.fullname != null && conditions.fullname.length < 2) {
        conditions.fullname = null;
      } else {
        httpParams = httpParams.set('fullname', conditions.fullname);
      }
      if (conditions.phone != null && conditions.phone.length < 2) {
        conditions.phone = null;
      } else {
        httpParams = httpParams.set('phone', conditions.phone);
      }
      if (conditions.email != null && conditions.email.length < 2) {
        conditions.email = null;
      } else {
        httpParams = httpParams.set('email', conditions.email);
      }
      if (conditions.status === 'Active') {
        conditions.status = 1;
        httpParams = httpParams.set('status', conditions.status);

      } else if (conditions.status === 'Inactive') {
        conditions.status = 0;
        httpParams = httpParams.set('status', conditions.status);

      }
    }
    this.excuteHttpRequest('Search User', this.accountService.find(httpParams, this.maxRowInPage, firstIndex - 1), success => {

      this.data = [];
      this.currentData = [];
      this.totalRecords = success.amUser.totalElements;
      for (const user of success.amUser.content) {
        if (user.status === 1) {
          user.status = 'Active';
        } else {
          user.status = 'Inactive';
        }
        const node = {
          data: user
        };
        this.data.push(node);
        this.currentData.push(node);

      }
      this.tableLoading = false;

      this.errorMsg = null;
    });
  }

  constructor(private accountService: AccountService, public confirmationService: ConfirmationService, public messageService: MessageService, public userPermissionsService: UserPermissionService, protected  errorTransate: ErrorTransPipe) {
    super(confirmationService, messageService, userPermissionsService, errorTransate);
  }


  loadPageLazy(event: LazyLoadEvent) {
    if (event.globalFilter) {
      this.data = this.globalFilter(event.globalFilter, this.currentData);
    } else {
      setTimeout(() => {
        this.loadUser(this.conditionsSearch, event.first);

      });
    }
  }

  ngOnInit() {
    this.supportDelete = 3;
    this.currentResources = 'account:user';
    super.ngOnInit();
    this.cols = [
      {field: 'username', header: 'Username'},
      {field: 'fullname', header: 'Fullname'},
      {field: 'phone', header: 'Phone'},
      {field: 'createdTime', header: 'Created Time'},
      {field: 'status', header: 'Status', decoration: 'badge-primary:value===\'Active\',badge-danger:value===\'Inactive\',badge badge-pill:true'},
    ];

    this.createFormDescription = UsersManagerMetadata.VIEW_CREATE_FORM;
    this.updateFormDescription = UsersManagerMetadata.VIEW_UPDATE_FORM;
    this.searchFormDescription = UsersManagerMetadata.SEARCH_VIEW;

  }

  onRequestSuccess(response) {
  }


}
