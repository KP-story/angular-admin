import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TreeNode} from 'primeng/components/common/treenode';
import {MenuItem} from 'primeng/components/common/menuitem';
import {MenuEvent} from '../../../../entities/menu-event';
import {LazyLoadEvent} from 'primeng/primeng';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'objects-list-view',
  templateUrl: './objects-list-view.component.html',
  styleUrls: ['./objects-list-view.component.scss']
})
export class ObjectsListViewComponent implements OnInit {
  @Input() data: TreeNode[];
  @Input() header: string;
  @Input() colsdesc: any;
  @Input() maxRowInPage: number;

  @Input() dataKey: any;
  @Input() selectedNodes: any;
  @Output() menuClick: EventEmitter<MenuEvent> = new EventEmitter();
  @Input() extendMenuItems: any[];
  @Input() isTreeTable: boolean;
  @Input() selectionModeTable: string;
  @Output() selectedNodesChange: EventEmitter<any> = new EventEmitter();
  menuItems: MenuItem[];
  menuSelectedNode: TreeNode;
  @Output() loadPageLazy: EventEmitter<LazyLoadEvent> = new EventEmitter();
  @Input() loading: boolean;
  @Input() lazy: boolean;
  @Input() paginator: boolean;
  @Input() totalRecords: number;
  @Output() dataChange: EventEmitter<TreeNode[]> = new EventEmitter();
  @Input() isFilter: boolean = true;
  @Input() showCaption: boolean = true;
  @Input() showHeader: boolean = true;
  @Input() sortMode: string = 'multiple';
  @Output() nodeSelect: EventEmitter<any> = new EventEmitter();
  @Output() nodeUnselect: EventEmitter<any> = new EventEmitter();


  selectAll() {
    this.selectedNodes = [];
    this.selectAllRecursive(this.data);
    this.selectedNodesChange.emit(this.selectedNodes);

  }

  isArray(a: any): boolean {
    return a instanceof Array;
  }


  toggle(node) {
    node.expanded = !node.expanded;
    this.data = [...this.data];
  }

  private selectAllRecursive(tree: TreeNode[]) {
    for (const node of tree) {
      this.selectedNodes.push(node);

      if (node.children) {
        this.selectAllRecursive(node.children);
      }
    }
  }


  public deselectAll() {
    this.selectedNodes = [];
    this.selectedNodesChange.emit(this.selectedNodes);

  }

  constructor() {
  }

  onRowSelectionChange(event: any) {
    this.selectedNodesChange.emit(this.selectedNodes);
    console.log(this.selectedNodes);
  }


  ngOnInit() {


    this.menuItems = [];

    if (this.extendMenuItems) {
      const currentLength = this.menuItems.length;
      for (let i = 0; i < this.extendMenuItems.length; i++) {
        const label = this.extendMenuItems[i].label;

        // tslint:disable-next-line:max-line-length
        this.menuItems[currentLength + i] = {
          label: label, icon: this.extendMenuItems[i].icon, command: (event) => {
            this.menuClick.emit(new MenuEvent(label, (this.menuSelectedNode)));
          }
        };

      }

    }

    if (this.isTreeTable === true) {
      this.menuItems[this.menuItems.length] = {label: 'Toggle', icon: 'pi pi-sort', command: (event) => this.toggle((this.menuSelectedNode))};

    }
  }

}
