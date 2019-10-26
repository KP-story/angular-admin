import {TreeNode} from 'primeng/components/common/treenode';
import {TransitiveCompileNgModuleMetadata} from '@angular/compiler';

export class MenuEvent {

  data: TreeNode;
  event: string;

  constructor(
    event: string, data: TreeNode) {
    this.data = data;
    this.event = event;
  }
}
