import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserPermissionService} from '../../../services/autho/user-permission.service';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: `[kpPermissionsOnly]`
})
export class KpPermissionsOnlyDirective {

  constructor(private userPermissionService: UserPermissionService, private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) {
  }

  @Input()
  set kpPermissionsOnly(requirePermission: string[]) {
    this.requirePermission = requirePermission;
    this.updateView();

  }

  requirePermission: string[];
  rejectTemplate: TemplateRef<any>;

  @Input() set kpPermissionsOnlyReject(rejectTemplate: TemplateRef<any>) {
    this.rejectTemplate = rejectTemplate;
    this.updateView();
  }

  updateView() {
    this.viewContainer.clear();
    if (this.userPermissionService.hasPermission(this.requirePermission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      if (this.rejectTemplate) {
        this.viewContainer.createEmbeddedView(this.rejectTemplate);
      } else {
        this.viewContainer.clear();
      }
    }
  }

}
