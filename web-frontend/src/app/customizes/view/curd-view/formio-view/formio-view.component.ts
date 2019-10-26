import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'formio-view',
  templateUrl: './formio-view.component.html',
  styleUrls: ['./formio-view.component.scss']
})

export class FormioViewComponent implements OnInit {

  @Input() formDescription;
  @Input() submission: any;
  @Input() fireSubmitSuccess;
  @Input() fireSubmitFailed;

  @Output() submit: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

}
