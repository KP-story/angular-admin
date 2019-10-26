import {Component, OnInit, EventEmitter} from '@angular/core';
import {TreeNode} from 'primeng/components/common/treenode';
import {MenuEvent} from '../../../../entities/menu-event';
import {LazyLoadEvent, Tree} from 'primeng/primeng';
import {ResourceMetadata} from './resources.metadata';
import {ConfirmationService, MessageService} from 'primeng/components/common/api';
import {BaseCurdView} from '../../../../customizes/view/curd-view/base-curd-view';
import {UserPermissionService} from '../../../../services/autho/user-permission.service';
import {OperationService} from '../../../../services/authen/operation.service';
import {ErrorTransPipe} from '../../../../customizes/pipes/error-trans.pipe';
import {ResourceService} from '../../../../services/authen/resource.service';

@Component({
  selector: 'app-resources-manager',
  templateUrl: './resources-manager.component.html',
  styleUrls: ['./resources-manager.component.scss']
  , providers: [ConfirmationService, MessageService]

})
export class ResourcesManagerComponent extends BaseCurdView implements OnInit {

  constructor(protected confirmationService: ConfirmationService, protected resourceService: ResourceService, protected userPermissionService: UserPermissionService, protected messageService: MessageService, protected errorStranslate: ErrorTransPipe
  ) {
    super(confirmationService, messageService, userPermissionService, errorStranslate);
  }

  showCreateView: EventEmitter<any> = new EventEmitter();


  update(data: any) {
    super.update(data);
    if (data.data.status === 'Active') {
      data.data.status = 1;
    } else {
      data.data.status = 0;

    }
    this.excuteHttpRequest('Update Resource ', this.resourceService.update(data.data.name, data.data), success => {


      this.fireSubmitSuccess.emit('success');
      this.loadData();

    });
  }

  create(data: any) {
    super.create(data);
    if (data.data.status === 'Active') {
      data.data.status = 1;
    } else {
      data.data.status = 0;

    }

    this.excuteHttpRequest('Create resource ', this.resourceService.create(data.data), success => {
      this.fireSubmitSuccess.emit('success');
      this.loadData();

    });


  }

  onMenuItemClick(menuEvent: MenuEvent) {
    super.onMenuItemClick(menuEvent);
    if (menuEvent.event === 'New child') {

      this.showCreateView.emit({data: {seResourceByParent: {name: menuEvent.data.data.name}}, header: 'New resource of ' + menuEvent.data.data.name, isUpdate: false});

    }
  }

  toggleData(resources: any) {
    const map = new Map();

    for (const resource of resources) {

      if (resource.status === 1) {
        resource.status = 'Active';
      } else {
        resource.status = 'Inactive';
      }
      let parent: TreeNode;
      let child: TreeNode;
      child = map.get(resource.name);
      if (child == null) {
        child = {data: resource, children: []};
      }

      if (resource.seResourceByParent) {
        if (resource.seResourceByParent === 1) {
          resource.seResourceByParent.status = 'Active';
        } else {
          resource.seResourceByParent.status = 'Inactive';
        }
        parent = map.get(resource.seResourceByParent.name);

        if (parent == null) {

          parent = {data: resource.seResourceByParent, children: []};
        }
        if (parent.data.status === 'Inactive') {
          child.data.status = 'Inactive';
        }
        parent.children.push(child);
        child.parent = parent;
        map.set(parent.data.name, parent);

      }
      map.set(child.data.name, child);


    }
    map.forEach((value: TreeNode, key: string) => {
      if (value.parent == null) {

        this.data.push(value);
      }
    });


  }

  loadData() {

    this.isUpdateRequest = false;
    this.tableLoading = true;
    this.excuteHttpRequest(null, this.resourceService.listAll(), success => {


      this.data = [];

      // for (let resource of success.resources) {
      //   if (resource.status == '1') {
      //     resource.status = 'Active'
      //   } else {
      //     resource.status = 'Inactive'
      //   }
      //   let node = {
      //     data: resource
      //   }
      //   this.data.push(node);

      // }
      this.toggleData(success.seResource);

      this.tableLoading = false;

      this.errorMsg = null;
    });
  }

  approveDelete() {
    super.approveDelete();

    const resources: string[] = [];
    for (const entry of this.deleteEntries) {
      resources.push(entry.data.name);
    }

    this.excuteHttpRequest('Delete Resources', this.resourceService.deleteMulti(resources), success => {
      this.loadData();
    });
  }

  ngOnInit() {

    this.tableLoading = true;
    this.totalRecords = 20;
    this.data = [];
    this.supportDelete = 3;
    this.currentResources = 'account:resource';
    super.ngOnInit();

    if (this.acceptPermission([this.updatePermission, this.kingPermission])) {
      this.menuItems.push({label: 'New child', icon: 'pi pi-plus-circle'});
    }
    this.cols = [
      {field: 'name', header: 'Name'},
      {field: 'createdTime', header: 'Created Time'},

      {field: 'status', header: 'Status', decoration: 'badge-primary:value===\'Active\',badge-danger:value===\'Inactive\',badge badge-pill:true'},
    ];
    this.createFormDescription = ResourceMetadata.VIEW_CREATE_FORM;
    this.updateFormDescription = ResourceMetadata.VIEW_UPDATE_FORM;
    setTimeout(() => {
      this.loadData();

    });
  }

  onRequestSuccess(response) {
  }


}
