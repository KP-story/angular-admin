import {Component, ElementRef, Input, OnInit, Renderer2, ChangeDetectionStrategy, OnDestroy} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'show-hide-password',
  templateUrl: './show-hide-password.component.html',
  styleUrls: ['./show-hide-password.component.scss']
})
// khanhlv

export class ShowHidePasswordComponent implements OnInit {
  isHide = false;
  public input: any;

  @Input() hideTitle;
  @Input() showTitle;

  constructor(private renderer: Renderer2, private elem: ElementRef) {
  }

  ngOnInit() {
    this.input = this.elem.nativeElement.querySelector('input');
    if (!this.input) {
      throw new Error(`No input element found. Please read the docs!`);
    }
    this.renderer.setAttribute(this.input, 'type', this.isHide ? 'text' : 'password');

  }

  onClick() {
    this.isHide = !this.isHide;
    this.renderer.setAttribute(this.input, 'type', this.isHide ? 'text' : 'password');
  }

}
