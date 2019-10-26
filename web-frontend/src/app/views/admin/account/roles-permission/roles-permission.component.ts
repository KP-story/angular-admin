import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {MenuEvent} from '../../../../entities/menu-event';
import {forkJoin} from 'rxjs';
import {ConfirmationService} from 'primeng/components/common/api';
import {BaseComponent} from '../../../../customizes/view/base-component';
import {PermissionService} from '../../../../services/authen/permission.service';
import {ErrorTransPipe} from '../../../../customizes/pipes/error-trans.pipe';
import {RoleService} from '../../../../services/authen/role.service';
import {ResourceService} from '../../../../services/authen/resource.service';

@Component({
  selector: 'app-roles-permission',
  templateUrl: './roles-permission.component.html',
  styleUrls: ['./roles-permission.component.scss'], providers: [ConfirmationService]

})
export class RolesPermissionComponent extends BaseComponent implements OnInit {

  constructor(private resourceService: ResourceService, private roleService: RoleService, private permissionService: PermissionService, private confirmationService: ConfirmationService, protected  errorTranslate: ErrorTransPipe) {
    super(errorTranslate);
  }

  @Input() resourceMenu: any[];
  @Input() roleMenu: any[];
  roleColumns: any;
  resourceColumns: any;
  @Input() resources: TreeNode[];
  @Input() leftLoading;
  @Input() user: string;
  @Input() isPersonal: boolean = false;

  @Input() rightLoading;
  @Input() roleSelection: TreeNode;
  @Input() resourceSelection: TreeNode;
  @Input() roles: TreeNode[];
  @Output() requestFailed: EventEmitter<any> = new EventEmitter();
  @Output() rolesChange: EventEmitter<TreeNode[]> = new EventEmitter();
  @Output() resourcesChange: EventEmitter<TreeNode[]> = new EventEmitter();
  @Output() roleSelectionChange: EventEmitter<TreeNode> = new EventEmitter();
  @Output() resourceSelectionChange: EventEmitter<TreeNode> = new EventEmitter();
  @Output() roleMenuClick: EventEmitter<MenuEvent> = new EventEmitter();
  @Output() resourceMenuClick: EventEmitter<MenuEvent> = new EventEmitter();
  @Input() fireReloadRole?: EventEmitter<string> = new EventEmitter();
  @Input() canDeleteRole: boolean = false;
  @Output() preSentRequest: EventEmitter<string> = new EventEmitter();
  @Output() reloadCompelete: EventEmitter<string> = new EventEmitter();

  dataKey = 'name';
  resourceSeeds: Map<String, TreeNode>;

  deleteEntries: TreeNode;
  private requestName: string;

  addIfNotExitArray(entry: string, arrays: string[]) {
    if (arrays.indexOf(entry) === -1) {
      arrays.push(entry);
    }
  }

  approveDelete() {
    this.preSentRequest.emit('success');

    if (this.deleteEntries.data.permissions && this.deleteEntries.data.permissions.length > 0) {

      this.onErrorClearly(null, 'This role has relations in other object. You must remove all relations before delete role');
    } else {
      const roles: string[] = [];
      roles.push(this.deleteEntries.data.name);

      this.excuteHttpRequest(null, this.roleService.deleteMulti(roles), success => {
        this.reloadRole();
      });
    }
  }

  onMenuClick(menuEvent: MenuEvent) {
    if (menuEvent.event === 'Delete') {
      this.deleteEntries = menuEvent.data;
      this.showDeleteConfirm();
    }
  }

  showDeleteConfirm() {
    this.confirmationService.confirm({
      header: 'Delete Role', message: 'Are you sure that you want to delete this ?',
      icon: 'fa fa-trash', key: 'deleteRoleConfirmDialog',
      accept: () => {
        this.approveDelete();
      }
    });
  }

  ngOnInit() {
    if (this.roleMenu == null) {
      this.roleMenu = [];
    }
    if (this.canDeleteRole) {

      this.roleMenu.push({label: 'Delete', icon: 'pi pi-trash'});

    }

    this.roleColumns = [
      {field: 'name', header: 'Role', width: '60%', decoration: 'text-active:node.data.status===\'Active\''},
      {field: 'status', width: '40%', header: 'Status', decoration: 'badge-primary:value===\'Active\',badge-danger:value===\'Inactive\',badge badge-pill:true'}
    ];
    this.resourceColumns = [
      {field: 'name', title: 'node.data.status===\'Active\'? \'resource \'+value+\' is active\' : \'resource \'+value+\' is inactive\'', header: 'Resource', width: '60%', decoration: 'text-active:node.data.status===\'Active\''},
      {field: 'action', title: 'cell.status===1? \'operation \'+value+\' is active\' : \'operation \'+value+\' is inactive\'', fieldCell: 'name', header: 'Actions can be performed', width: '40%', decoration: 'badge-primary:cell.status===1,badge-danger:cell.status===0,badge badge-pill:true'}

    ];

    setTimeout(() => {
      this.loadData();

    });
    if (this.fireReloadRole) {
      this.fireReloadRole.subscribe(
        complete => {
          if (complete) {
            this.user = complete;
          }
          this.reloadRole();
        }
      );
    }
  }

  onRoleSelect(event) {
    this.roleSelection = event.node;
    this.rightLoading = true;
    this.resources = [];
    const temp = this.mergePermissionData(event.node.data.permissions);
    this.rightLoading = false;
    this.roleSelectionChange.emit(this.roleSelection);
  }

  onRoleUnselect(event) {
    this.resources = [];
    this.roleSelection = null;
    this.roleSelectionChange.emit(this.roleSelection);

  }


  reloadRole() {
    this.preSentRequest.emit('success');

    if (this.isPersonal && this.user == null) {
      this.roles = [];
      this.resources = [];

      return;
    }
    this.requestName = 'Get Roles';
    this.roles = [];

    this.excuteHttpRequest(null, this.isPersonal ? this.roleService.fetchRoleOfUser(this.user) : this.roleService.listAll(), success => {
      this.roles = [];
      this.rolesChange.emit(this.roles);
      let newRoleSelection;
      for (const role of success.seRole) {
        if (role.status === 1) {
          role.status = 'Active';
        } else {
          role.status = 'Inactive';
        }
        const node = {
          data: role
        };

        if (this.roleSelection != null && role.name === this.roleSelection.data.name) {
          newRoleSelection = node;
        }
        this.roles.push(node);

      }
      this.rolesChange.emit(this.roles);

      this.resources = [];
      if (newRoleSelection == null) {
        if (this.roles.length > 0) {
          newRoleSelection = this.roles[0];
        }
      }
      this.roleSelection = newRoleSelection;
      if (this.roleSelection) {
        const temp = this.mergePermissionData(this.roleSelection.data.permissions);

      }

      this.roleSelectionChange.emit(this.roleSelection);
      this.reloadCompelete.emit('success');
    });
  }

  loadData() {
    this.preSentRequest.emit('success');

    this.leftLoading = true;
    this.rightLoading = true;

    if (this.isPersonal && this.user == null) {
      this.roles = [];
      this.rolesChange.emit(this.roles);
      this.requestName = 'Get All Resources';
      this.excuteHttpRequest(null, this.resourceService.listAll(), success => {
        this.resources = [];
        this.toggleData(success.seResource);
        this.rightLoading = false;
        this.leftLoading = false;
        if (this.roleSelection) {
          const temp = this.mergePermissionData(this.roleSelection.data.permissions);
        }
        this.roleSelectionChange.emit(this.roleSelection);
      });

    } else {
      this.requestName = 'Get Roles';

      this.excuteConcurrentHttpRequest(null, [(this.isPersonal ? this.roleService.fetchRoleOfUser(this.user) : this.roleService.listAll())
          , this.resourceService.listAll()], true, success => {

          const roleResponse = success[0];
          const resourceResponse = success[1];
          this.roles = [];
          this.rolesChange.emit(this.roles);

          for (const role of roleResponse.seRole) {
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
          this.rolesChange.emit(this.roles);

          if (this.roles.length > 0) {
            this.roleSelection = this.roles[0];
          }
          this.roleSelectionChange.emit(this.roleSelection);
          this.resources = [];
          this.toggleData(resourceResponse.seResource);
          this.rightLoading = false;
          this.leftLoading = false;
          if (this.roleSelection) {
            const temp = this.mergePermissionData(this.roleSelection.data.permissions);
          }
          this.roleSelectionChange.emit(this.roleSelection);

        }
      );

    }


  }

  onResourceSelect(event) {
    this.resourceSelection = event.node;
    this.resourceSelectionChange.emit(this.resourceSelection);
  }

  onResourceUnselect(event) {
    this.resourceSelection = null;
    this.resourceSelectionChange.emit(this.resourceSelection);
  }

  toggleData(resources: any) {
    this.resourceSeeds = new Map<String, TreeNode>();

    for (const resource of resources) {

      if (resource.status === 1) {
        resource.status = 'Active';
      } else {
        resource.status = 'Inactive';
      }
      let parent: TreeNode;
      let child: TreeNode;
      child = this.resourceSeeds.get(resource.name);
      if (child == null) {
        child = {data: resource, children: []};
      }

      if (resource.seResourceByParent) {
        if (resource.seResourceByParent === 1) {
          resource.seResourceByParent.status = 'Active';
        } else {
          resource.seResourceByParent.status = 'Inactive';
        }
        parent = this.resourceSeeds.get(resource.seResourceByParent.name);

        if (parent == null) {

          parent = {data: resource.seResourceByParent, children: []};
        }
        if (parent.data.status === 'Inactive') {
          child.data.status = 'Inactive';
        }
        parent.children.push(child);
        child.parent = parent;
        this.resourceSeeds.set(parent.data.name, parent);

      }
      this.resourceSeeds.set(child.data.name, child);


    }


  }

  mergePermissionData(permissions: any[]): Map<String, TreeNode> {
    const tempResource: Map<String, TreeNode> = new Map();
    this.resourceSeeds.forEach((value: TreeNode, key: string) => {
      value.data.action = [];
      tempResource.set(key, {...value});

    });
    for (const permission of permissions) {
      const resource = tempResource.get(permission.seResourceByResource.name);
      if (resource != null) {
        if (resource.data.action == null) {
          resource.data.action = [];
        }
        resource.data.action[resource.data.action.length] = permission.seOperation;
      }

    }
    tempResource.forEach((value: TreeNode, key: string) => {

      //   if(value.children!=null&&value.data.action!=null&&value.data.action.length>0)
      //   {
      //     for(let child of value.children)
      //   {
      //       if(child.data.action==null)
      //       {
      //         child.data.action=[];
      //       }
      //       for(let action of value.data.action)
      //       {
      //         this.addIfNotExitArray(action,child.data.action);
      //       }
      //   }
      // }

      if (value.parent == null) {
        this.resources.push(value);
      }

    });
    return tempResource;
  }

  onError(functionName, errorCode, errorMsg, detailError) {
  }

  onErrorClearly(functionName, errorClearly) {
    this.leftLoading = false;
    this.rightLoading = false;
    this.requestName = functionName;
    if (this.requestName === 'Get Roles') {
      this.reloadCompelete.emit('failed');
    }

    this.requestFailed.emit({error: errorClearly, requestName: this.requestName});

  }

  onRequestSuccess(response) {
  }


}
