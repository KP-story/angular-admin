import {BaseComponentToastr} from './base-component-toastr';
import {MessageService} from 'primeng/api';
import {UserPermissionService} from '../../services/autho/user-permission.service';
import {Input, Output, EventEmitter} from '@angular/core';
import {ErrorTransPipe} from '../pipes/error-trans.pipe';

export abstract class BaseGuard extends BaseComponentToastr {

  constructor(protected userPermissionService: UserPermissionService, protected messageService: MessageService, protected errorStranslate: ErrorTransPipe) {
    super(messageService, errorStranslate);

  }

  permissions: string[];
  @Input() currentResources;
  actions: string[];
  protected canUpdate: boolean;
  @Input() removePermission: string;
  @Input() updatePermission: string;
  @Input() viewPermission: string;
  @Input() addPermission: string;
  @Input() kingPermission: string;
  @Output() removePermissionChange: EventEmitter<string> = new EventEmitter();
  @Output() updatePermissionChange: EventEmitter<string> = new EventEmitter();
  @Output() viewPermissionChange: EventEmitter<string> = new EventEmitter();
  @Output() addPermissionChange: EventEmitter<string> = new EventEmitter();
  @Output() kingPermissionChange: EventEmitter<string> = new EventEmitter();

  acceptPermission(requirePermissions: string[]): boolean {
    return this.userPermissionService.hasPermission(requirePermissions);

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.removePermission = this.currentResources + ':' + 'D';
    this.updatePermission = this.currentResources + ':' + 'U';
    this.viewPermission = this.currentResources + ':' + 'S';
    this.addPermission = this.currentResources + ':' + 'A';
    this.kingPermission = this.currentResources + ':' + '*';
    this.removePermissionChange.emit(this.removePermission);
    this.updatePermissionChange.emit(this.updatePermission);
    this.viewPermissionChange.emit(this.viewPermission);
    this.addPermissionChange.emit(this.addPermission);
    this.kingPermissionChange.emit(this.kingPermission);
    this.canUpdate = this.acceptPermission([this.kingPermission, this.updatePermission]);

    this.permissions = this.userPermissionService.getValue();
    this.userPermissionService.currentPermission.subscribe(permissions => {
      this.permissions = permissions;
      this.checkPermission();

    });
    this.checkPermission();


  }

  checkPermission() {
    this.getActionCanPerformed();

  }

  public getActionCanPerformed() {
    this.actions = [];
    if (this.currentResources) {
      for (const permission of this.permissions) {
        const index = permission.indexOf(this.currentResources);
        if (index !== -1) {
          const temp = permission.substring(index + this.currentResources.length, permission.length);
          if (!temp.includes(':', 2)) {
            this.actions.push(temp.replace(':', ''));
          }
        }
      }

    }

  }

}
