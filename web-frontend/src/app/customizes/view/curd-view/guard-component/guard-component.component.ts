import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {MessageService} from 'primeng/api';
import {UserPermissionService} from '../../../../services/autho/user-permission.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'guard-component',
  templateUrl: './guard-component.component.html',
  styleUrls: ['./guard-component.component.scss']
})
export class GuardComponent implements OnInit {

  constructor(protected userPermissionService: UserPermissionService) {
  }

  @Input() removePermission: string;
  @Input() updatePermission: string;
  @Input() viewPermission: string;
  @Input() addPermission: string;
  @Input() kingPermission: string;

  ngOnInit(): void {


  }


}
