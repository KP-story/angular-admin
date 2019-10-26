import {Component, OnInit, Renderer2, ElementRef, Input, ContentChild, AfterContentChecked, AfterContentInit, AfterViewInit} from '@angular/core';
import {TreeNode} from 'primeng/primeng';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'text-cell-table',
  templateUrl: './text-cell-table.component.html',
  styleUrls: ['./text-cell-table.component.scss']
})
export class TextCellTableComponent implements OnInit {


  @Input() decorations: string;
  @Input() node: TreeNode;
  @Input() cell: any;
  @Input() title;
  @Input() titleMsg: string;
  @Input() fieldCell: string;
  value: string;

  constructor(public renderer: Renderer2, public elementRef: ElementRef) {
  }

  ngOnInit() {

    if (this.fieldCell) {

      const fields: string[] = this.fieldCell.split('.');
      let data = this.cell;
      for (const field of fields) {
        data = data[field];
      }
      this.value = data;
    } else {
      this.value = this.cell;
    }
    const node = this.node;
    const value = this.value;
    const cell = this.cell;
    // tslint:disable-next-line:no-eval
    this.titleMsg = eval(this.title);
    if (!this.titleMsg) {
      this.titleMsg = '';
    }
    // setTimeout(() =>
    {

      this.applyClass();

    }
    // );
  }

  public addClass(ngClass: string): void {
    this.renderer.addClass(this.elementRef.nativeElement, ngClass);

  }

  public removeClass(ngClass: string): void {
    this.renderer.removeClass(this.elementRef.nativeElement, ngClass);

  }

  public removeAllClass(): void {
    // tslint:disable-next-line:no-unused-expression
    this.elementRef.nativeElement.removeAllClass;

  }

  public applyClass(): void {

    if (this.decorations == null) {
      return;
    }
    this.decorations.split(',').forEach((decoration: string) => {
        const entry = decoration.split(':');
        let enable = true;
        if (entry.length > 1) {
          const condition = entry[1];
          try {

            const node = this.node;
            const value = this.value;
            const cell = this.cell;
            // tslint:disable-next-line:no-eval
            enable = eval(condition);

          } catch (error) {
            enable = false;
            console.error(error);
          }

        }
        entry[0].split(' ').forEach((ngClass: string) => {
            if (enable) {
              this.addClass(ngClass);
            } else {
              this.removeClass(ngClass);
            }
          }
        );


      }
    );
  }

}
