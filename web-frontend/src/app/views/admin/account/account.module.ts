import {CommonModule} from '@angular/common';

import {AccountRoutingModule} from './account-routing.module';

import {ChangePasswordComponent} from './change-password/change-password.component';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {OperationsComponent} from './operations/operations.component';
import {AccordionModule} from 'primeng/accordion';
import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {PickListModule} from 'primeng/picklist';
import {ConfirmDialogModule, SharedModule, MessageService} from 'primeng/primeng';
import {ToastModule} from 'primeng/toast';
import {CustomizesModule} from '../../../customizes/customizes.module';
import {TranslateModule} from '@ngx-translate/core';
import {ResourcesManagerComponent} from './resources/resources-manager.component';
import {RolebasedComponent} from './rolebased/rolebased.component';
import {RolesPermissionComponent} from './roles-permission/roles-permission.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UsersManagerComponent} from './users-manager/users-manager.component';


@NgModule({
  declarations: [ChangePasswordComponent, OperationsComponent, ResourcesManagerComponent, RolebasedComponent, RolesPermissionComponent, UserDetailComponent, UsersManagerComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule, CollapseModule,

    FormsModule, ConfirmDialogModule, SharedModule, ToastModule,

    HttpClientModule, CustomizesModule, CommonModule,
    TabsModule, TreeTableModule, AccordionModule, TableModule, PickListModule, TranslateModule
  ]
})
export class AccountModule {
}
