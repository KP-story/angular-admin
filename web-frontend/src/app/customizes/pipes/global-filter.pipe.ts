import {Pipe, PipeTransform} from '@angular/core';
import {TreeNode} from 'primeng/api';


@Pipe({
  name: 'globalFilter'
})
export class GlobalFilterPipe implements PipeTransform {

  transform(data: TreeNode[], sample: any, columns: any[]): any {
    if (data && sample && columns) {
      return data.filter(entry => {
          return this.filterMatchedRecursive(entry, sample, columns);
        }
      );
    }
    return data;
  }


  filterMatchedRecursive(node: TreeNode, sample: string, cols: any[]): boolean {

    if (this.constainValue(node.data, sample, cols)) {
      console.log('push');

      return true;
    } else {
      if (node.children) {
        node.children.forEach(element => {
          if (this.filterMatchedRecursive(element, sample, cols)) {
            return true;
          }
        });
      }
    }

    return false;
  }

  constainValue(entry: any, sample: string, cols: any[]) {

    for (const col of cols) {
      const value = entry[col.field];

      if (value && (value.indexOf(sample.toLowerCase()) >= 0 || value.indexOf(sample.toUpperCase()) >= 0)) {
        return true;
      }
    }

    return false;
  }
}
