import {Component, OnInit, Input, EventEmitter, Output, TemplateRef} from '@angular/core';

import {TreeNode} from 'primeng/components/common/treenode';
import {MenuEvent} from '../../../../entities/menu-event';
import {LazyLoadEvent} from 'primeng/primeng';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'basic-table-view',
  templateUrl: './basic-table-view.component.html',
  styleUrls: ['./basic-table-view.component.scss']
})
export class BasicTableViewComponent implements OnInit {
  @Input() maxRowInPage: number;
  @Input() multiRemove;

  @Input() data: TreeNode[];
  @Input() header: string;
  @Input() colsdesc: any;
  @Input() createFormDescription;
  @Input() updateFormDescription;

  @Input() dataKey: any;
  @Input() submission;
  @Input() searchSubmission;
  @Input() cuView: TemplateRef<any>;
  @Output() menuClick: EventEmitter<MenuEvent> = new EventEmitter();
  @Input() extendMenuItems: any[];
  @Input() selectionMode;
  @Input() isTreeTable;
  @Input() searchFormDescription;
  @Input() hasSearch: boolean = true;
  @Output() applyUpdate: EventEmitter<any> = new EventEmitter();
  @Output() applySearch: EventEmitter<any> = new EventEmitter();
  @Output() applyCreate: EventEmitter<any> = new EventEmitter();
  isUpdate: boolean = false;
  headerCu;
  isCollapsed: boolean = true;
  selectedNodes: TreeNode[];
  @Output() loadPageLazy: EventEmitter<LazyLoadEvent> = new EventEmitter();
  @Input() tableLoading: boolean = false;
  @Input() lazyTable: boolean = false;
  @Input() tablePaginator: boolean = false;
  @Output() selectedNodesChange: EventEmitter<any> = new EventEmitter();
  @Output() dataChange: EventEmitter<TreeNode[]> = new EventEmitter();
  @Input() fireSubmitSuccess;
  @Input() fireSubmitFailed;
  @Input() fireSearchSuccess;
  @Input() fireSearchFailed;
  @Input() showCreateView?: EventEmitter<any> = new EventEmitter();
  @Output() viewItemClick: EventEmitter<TreeNode> = new EventEmitter();
  @Output() newButtonClick: EventEmitter<string> = new EventEmitter();
  @Output() removeButtonClick: EventEmitter<TreeNode[]> = new EventEmitter();
  @Input() totalRecords: number;
  @Input() canUpdate: boolean;
  @Input() removePermission: string;
  @Input() updatePermission: string;
  @Input() viewPermission: string;
  @Input() addPermission: string;
  @Input() kingPermission: string;

  viewItem(event: TreeNode) {
    console.log('trigger');
    if (this.cuView) {
      this.headerCu = 'header.update';
      this.isCollapsed = false;
      window.scroll(0, 0);
      this.viewItemClick.emit(event);

    } else {
      this.reInitFormIo();
      this.isCollapsed = false;
      window.scroll(0, 0);
      this.submission = {data: event.data};
      this.headerCu = 'header.update';
      this.isUpdate = true;
    }

  }

  reInitFormIo() {
    this.createFormDescription = {...this.createFormDescription};
    this.updateFormDescription = {...this.updateFormDescription};
  }

  onMenuClickEvent(event: MenuEvent) {
    if (event.event === 'View') {
      this.viewItem(event.data);
    }

  }

  constructor() {
  }


  ngOnInit() {
    if (this.extendMenuItems == null) {
      this.extendMenuItems = [];
    }

    if (this.canUpdate) {
      this.extendMenuItems[this.extendMenuItems.length] = {label: 'View', icon: 'pi pi-search'};
    }
    this.showCreateView.subscribe(event => {
      this.isCollapsed = false;
      this.reInitFormIo();
      window.scroll(0, 0);
      this.submission = {data: event.data};
      this.headerCu = event.header;
      this.isUpdate = event.isUpdate;
    });
  }


}
