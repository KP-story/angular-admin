import {EventEmitter, OnInit} from '@angular/core';
import {TreeNode} from 'primeng/primeng';
import {MenuEvent} from '../../../entities/menu-event';
import {ConfirmationService, MessageService} from 'primeng/components/common/api';

import {UserPermissionService} from '../../../services/autho/user-permission.service';
import {BaseGuard} from '../base-guard';
import {ErrorTransPipe} from '../../pipes/error-trans.pipe';

export abstract class BaseCurdView extends BaseGuard implements OnInit {

  constructor(protected confirmationService: ConfirmationService, protected messageService: MessageService, protected userPermissionService: UserPermissionService, protected  errorTransate: ErrorTransPipe) {
    super(userPermissionService, messageService, errorTransate);
  }

  multiRemove = false;
  deleteConfirmHeader = 'Delete Confirmation';
  deleteConfirmMsg = 'Are you sure that you want to delete this ?';
  deleteEntries: TreeNode[];
  supportDelete: number; // 0 ~none, 1 ~single, 2 ~ multi;
  data: TreeNode[];
  searchFormDescription: any;
  cols: any[];
  updateFormDescription;
  createFormDescription;
  errorMsg;
  tableLoading: boolean;
  totalRecords = 0;
  fireSubmitSuccess: EventEmitter<String> = new EventEmitter();
  fireSubmitFailed: EventEmitter<String> = new EventEmitter();
  fireSearchSuccess: EventEmitter<String> = new EventEmitter();
  fireSearchFailed: EventEmitter<String> = new EventEmitter();
  isUpdateRequest: boolean;
  menuItems: any[];

  ngOnInit() {
    super.ngOnInit();
    this.menuItems = [];
    if (this.supportDelete !== 0 && this.acceptPermission([this.kingPermission, this.removePermission])) {
      this.menuItems = [{label: 'Delete', icon: 'pi pi-trash'}];
      if (this.supportDelete === 3) {
        this.multiRemove = true;
      }
    }
  }

  approveDelete() {
    this.isUpdateRequest = false;
  }

  onRemoveButtonClick(selections) {
    console.log('delete click');
    this.deleteEntries = selections;

    this.showDeleteConfirm();
  }

  showDeleteConfirm() {
    this.confirmationService.confirm({
      header: this.deleteConfirmHeader, message: this.deleteConfirmMsg,
      icon: 'fa fa-trash', key: 'confirmDialog',
      accept: () => {
        this.approveDelete();
      }
    });
  }

  onMenuItemClick(menuEvent: MenuEvent) {
    if (menuEvent.event === 'Delete') {
      this.deleteEntries = [];
      this.deleteEntries.push(menuEvent.data);
      this.showDeleteConfirm();
    }
  }


  globalFilter(sample: string, currentData: TreeNode[]): any {
    const results = [];
    if (currentData) {
      currentData.forEach(element => {
        if (this.filterMatchedRecursive(element, sample)) {
          results.push(element);
        }


      });


    }
    return results;

  }

  filterMatchedRecursive(node: TreeNode, sample: string): boolean {

    if (this.constainValue(node.data, sample)) {
      console.log('push');

      return true;
    } else {
      if (node.children) {
        node.children.forEach(element => {
          if (this.filterMatchedRecursive(element, sample)) {
            return true;
          }
        });
      }
    }

    return false;
  }

  constainValue(entry: any, sample: string) {

    for (const col of this.cols) {
      const value = entry[col.field];

      if (value && (value.indexOf(sample.toLowerCase()) >= 0 || value.indexOf(sample.toUpperCase()) >= 0)) {
        return true;
      }
    }

    return false;
  }


  update(data: any) {
    this.isUpdateRequest = true;

  }

  create(data: any) {
    this.isUpdateRequest = true;

  }

  onError(functionName, errorCode, errorMsg, detailError) {

  }

  onErrorClearly(functionName, detailError) {
    super.onErrorClearly(functionName, detailError);
    window.scroll(0, 0);

    this.tableLoading = false;

    if (this.isUpdateRequest) {
      this.fireSubmitFailed.emit(detailError);
      this.fireSearchFailed.emit(detailError);
    } else {
      this.errorMsg = detailError;
    }
  }


}
