import {Component, OnInit, EventEmitter} from '@angular/core';
import {TreeNode, MessageService} from 'primeng/primeng';
import {RoleBasedMetadata} from './rolebased.metadata';
import {MenuEvent} from '../../../../entities/menu-event';
import {forkJoin} from 'rxjs';
import {BaseGuard} from '../../../../customizes/view/base-guard';
import {RoleService} from '../../../../services/authen/role.service';
import {UserPermissionService} from '../../../../services/autho/user-permission.service';
import {ErrorTransPipe} from '../../../../customizes/pipes/error-trans.pipe';
import {OperationService} from '../../../../services/authen/operation.service';
import {PermissionService} from '../../../../services/authen/permission.service';


@Component({
  selector: 'app-rolebased',
  templateUrl: './rolebased.component.html',
  styleUrls: ['./rolebased.component.scss']
  , providers: [MessageService]

})
export class RolebasedComponent extends BaseGuard implements OnInit {
  resourceMenu: any[];
  roleMenu: any[];
  operations: any[];
  dynamicForm;
  canDeleteRole: boolean;
  submission;
  isCollapsed: boolean = true;
  disabledForm: boolean = false;
  typeUpdate: number;
  roleSelection: TreeNode;
  resourceSelection: TreeNode;
  isUpdateRequest;
  errorMsg;
  header = 'header.role';

  constructor(private roleService: RoleService, private permissionService: PermissionService, private operationService: OperationService, public messageService: MessageService, protected userPermissionService: UserPermissionService, protected errorStranslate: ErrorTransPipe) {
    super(userPermissionService, messageService, errorStranslate);
  }

  fireReloadRole: EventEmitter<String> = new EventEmitter();
  fireSubmitSuccess: EventEmitter<String> = new EventEmitter();
  fireSubmitFailed: EventEmitter<String> = new EventEmitter();

  onPreSentRequest() {
    this.errorMsg = null;
  }

  ngOnInit(): void {
    this.currentResources = 'account:role';
    super.ngOnInit();
    if (this.acceptPermission([this.kingPermission, this.removePermission])) {
      this.canDeleteRole = true;
    } else {
      this.canDeleteRole = false;
    }
    this.dynamicForm = RoleBasedMetadata.ROLE_CREATE_FORM;
    if (this.acceptPermission([this.kingPermission, this.updatePermission])) {
      this.resourceMenu = [{label: 'Edit Permission', icon: 'pi pi-search'}];
      this.roleMenu = [{label: 'Edit', icon: 'pi pi-search'}];
    }

    setTimeout(() => {
      this.excuteHttpRequest(null, this.operationService.listAll(), success => {
        this.operations = [];
        for (const operation of success.seOperation) {
          if (operation.status === 1) {
            const node = {
              value: operation.code, label: operation.name
            };
            this.operations.push(node);

          }
        }
      });
    });

  }

  submitForm(event) {
    this.isUpdateRequest = true;
    switch (this.typeUpdate) {
      case 1:

        if (event.data.status === 'Active') {
          event.data.status = 1;
        } else {
          event.data.status = 0;
        }
        this.excuteHttpRequest('Create Role', this.roleService.create(event.data), success => {
          this.fireSubmitSuccess.emit('success');

          this.fireReloadRole.next();
        });
        break;
      case 2:
        if (event.data.status === 'Active') {
          event.data.status = 1;
        } else {
          event.data.status = 0;
        }

        this.excuteHttpRequest('Update role', this.roleService.update(event.data.name, {name: event.data.name, status: event.data.status}), success => {
          this.fireSubmitSuccess.emit('success');
          this.fireReloadRole.next();

        });
        break;
      case 3:
        this.excuteHttpRequest('Grant permission for role ', this.permissionService.createAndGrant({role: this.roleSelection.data.name, resource: this.resourceSelection.data.name, operations: event.data.action, recursive: event.data.recursive}), success => {
          this.fireSubmitSuccess.emit('success');
          this.isCollapsed = true;
          this.disabledForm = false;
          this.fireReloadRole.next();
        });
        break;

    }

  }

  onRoleMenuClick(event: MenuEvent) {
    if (event.event === 'Edit') {
      this.submission = {data: event.data.data};
      this.dynamicForm = {...RoleBasedMetadata.ROLE_UPDATE_FORM};
      window.scroll(0, 0);
      this.isCollapsed = false;
      this.typeUpdate = 2;
    }

  }

  onResourceMenuClick(event) {
    console.log(event.event);
    if (event.event === 'Edit Permission') {
      const form = JSON.parse(JSON.stringify(RoleBasedMetadata.PERMISSION_EDIT_FORM));
      form.components[0].label = 'Role ' + this.roleSelection.data.name + ' can peform actions in ' + event.data.data.name;
      form.components[0].data.values = this.operations;
      this.resourceSelection = {...event.data};
      this.submission = {data: {action: this.getActionInPermission(this.roleSelection, this.resourceSelection)}};
      window.scroll(0, 0);
      this.isCollapsed = false;
      this.dynamicForm = form;
      this.typeUpdate = 3;
      this.disabledForm = true;

    }
  }

  getActionInPermission(role: TreeNode, resource: TreeNode): string[] {
    const actions = [];
    for (const permission of role.data.permissions) {
      if (permission.seResourceByResource.name === resource.data.name) {
        actions[actions.length] = permission.seOperation.code;
      }

    }
    return actions;

  }

  onButtonClick() {
    this.dynamicForm = {...RoleBasedMetadata.ROLE_CREATE_FORM};
    this.typeUpdate = 1;
    this.disabledForm = false;

  }

  onError(functionName, errorCode, errorMsg, detailError) {

  }

  onErrorClearly(functionName, errorClearly) {
    super.onErrorClearly(functionName, errorClearly);
    window.scroll(0, 0);
    if (this.isUpdateRequest) {
      this.fireSubmitFailed.emit(errorClearly);
    } else {
      this.errorMsg = errorClearly;
    }
  }

  onRequestSuccess(response) {
    this.errorMsg = null;

  }


}
