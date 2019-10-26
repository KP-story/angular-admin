import {Component, OnInit, ChangeDetectorRef, EventEmitter, Renderer2, ElementRef} from '@angular/core';
import {TreeNode} from 'primeng/components/common/treenode';
import {MenuEvent} from '../../../../entities/menu-event';
import {OperationMetadata} from './operations.metadata';
import {LoaderService} from '../../../../services/loader.service';
import {Observable, OperatorFunction} from 'rxjs';
import {strict} from 'assert';
import {ConfirmationService, MessageService} from 'primeng/components/common/api';
import {BaseCurdView} from '../../../../customizes/view/curd-view/base-curd-view';
import {OperationService} from '../../../../services/authen/operation.service';
import {UserPermissionService} from '../../../../services/autho/user-permission.service';
import {ErrorTransPipe} from '../../../../customizes/pipes/error-trans.pipe';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.scss']
  , providers: [ConfirmationService, MessageService]

})
export class OperationsComponent extends BaseCurdView {

  currentResources = 'account:operation';

  update(data: any) {
    super.update(data);
    if (data.data.status === 'Active') {
      data.data.status = 1;
    } else {
      data.data.status = 0;

    }
    this.excuteHttpRequest('Update operation', this.operationService.update(data.data.code, data.data), success => {
      this.fireSubmitSuccess.emit('success');
      this.loadOperation();

    });
  }

  create(data: any) {
    super.create(data);
    if (data.data.status === 'Active') {
      data.data.status = 1;
    } else {
      data.data.status = 0;

    }
    this.excuteHttpRequest('Create operation', this.operationService.create(data.data), success => {
      this.fireSubmitSuccess.emit('success');
      this.loadOperation();

    });


  }

  loadOperation() {
    this.isUpdateRequest = false;

    this.tableLoading = true;
    this.excuteHttpRequest(null, this.operationService.listAll(), success => {


      this.data = [];

      for (const operation of success.seOperation) {
        if (operation.status === 1) {
          operation.status = 'Active';
        } else {
          operation.status = 'Inactive';
        }
        const node = {
          data: operation
        };
        this.data.push(node);

      }
      this.tableLoading = false;

      this.errorMsg = null;
    });
  }

  constructor(protected confirmationService: ConfirmationService, protected operationService: OperationService, protected userPermissionService: UserPermissionService, protected messageService: MessageService, protected errorStranslate: ErrorTransPipe
  ) {
    super(confirmationService, messageService, userPermissionService, errorStranslate);
  }


  approveDelete() {
    super.approveDelete();

    const operations: string[] = [];
    for (const entry of this.deleteEntries) {
      operations.push(entry.data.code);
    }

    this.excuteHttpRequest('Delete Operations', this.operationService.deleteMulti(operations), success => {
      this.loadOperation();
    });
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {


    this.supportDelete = 3;
    super.ngOnInit();


    setTimeout(() => {
      this.loadOperation();

    });


    this.cols = [
      {field: 'name', header: 'Name'},
      {field: 'code', header: 'Code'},
      {field: 'createdTime', header: 'Created Time'},

      {field: 'status', header: 'Status', decoration: 'badge-primary:value===\'Active\',badge-danger:value===\'Inactive\',badge badge-pill:true'},
    ];

    this.createFormDescription = OperationMetadata.VIEW_CREATE_FORM;
    this.updateFormDescription = OperationMetadata.VIEW_UPDATE_FORM;
  }

  onRequestSuccess(response) {
  }


}
