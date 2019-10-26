import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {LoadingButtonService} from '../../services/loading-button.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent implements OnInit {
  @Input() disabled;
  @Input() name;
  @Input() icon;
  @Input() styleClass;
  @Input() id;
  isLoading: boolean = false;
  @Output() clickBt: EventEmitter<any> = new EventEmitter();

  loading(isLoading) {
  }

  constructor(private  service: LoadingButtonService, private detector: ChangeDetectorRef) {
    service.isLoading.subscribe(complete => {
        if (this.id === complete.id) {
          this.isLoading = complete.state;
          this.detector.markForCheck();

        }
      }
    );
  }

  ngOnInit() {
  }

}
