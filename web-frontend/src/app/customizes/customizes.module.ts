import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingButtonComponent} from './view/loading-button/loading-button.component';
import {ShowHidePasswordComponent} from './directives/show-hide-password/show-hide-password.component';
import {TextCellTableComponent} from './directives/text-cell-table/text-cell-table.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {GlobalFilterPipe} from './pipes/global-filter.pipe';
import {ErrorTransPipe} from './pipes/error-trans.pipe';
import {KpPermissionsOnlyDirective} from './directives/permission/kp-permissions-only.directive';
import {TableModule} from 'primeng/table';
import {TreeTableModule} from 'primeng/treetable';
import {CollapseModule} from 'ngx-bootstrap/collapse';
import {FormioModule} from 'angular-formio';
import {ContextMenuModule} from 'primeng/contextmenu';
import {MenuModule} from 'primeng/menu';
import {ConfirmDialogModule, SharedModule} from 'primeng/primeng';
import {PE401Component} from './view/pe401/pe401.component';
import {BasicTableViewComponent} from './view/curd-view/basic-table-view/basic-table-view.component';
import {FormioViewComponent} from './view/curd-view/formio-view/formio-view.component';
import {GuardComponent} from './view/curd-view/guard-component/guard-component.component';
import {ObjectsListViewComponent} from './view/curd-view/objects-list-view/objects-list-view.component';
import {TableGroupTabComponent} from './view/curd-view/table-group-tab/table-group-tab.component';
import {DropdownModule} from 'primeng/dropdown';
import {LanguageSelectorComponent} from './language-selector/language-selector.component';
import {LoadingButtonService} from './services/loading-button.service';
import {TranslateModule} from '@ngx-translate/core';
import {AuthGuard} from './services/auth.guard';

@NgModule({
  declarations: [LoadingButtonComponent, KpPermissionsOnlyDirective, ShowHidePasswordComponent
    , TextCellTableComponent, GlobalFilterPipe, ErrorTransPipe, PE401Component, BasicTableViewComponent, FormioViewComponent
    , GuardComponent, ObjectsListViewComponent, TableGroupTabComponent, LanguageSelectorComponent
  ], providers: [LoadingButtonService, AuthGuard],
  imports: [MenuModule, ContextMenuModule, RouterModule, DropdownModule,
    CommonModule, TableModule, ConfirmDialogModule, SharedModule, TreeTableModule, CollapseModule, FormioModule, FormsModule, TranslateModule
  ],
  exports: [LoadingButtonComponent, GlobalFilterPipe, ErrorTransPipe, KpPermissionsOnlyDirective,
    ShowHidePasswordComponent, TextCellTableComponent, LanguageSelectorComponent, PE401Component, BasicTableViewComponent, FormioViewComponent, GuardComponent, ObjectsListViewComponent, TableGroupTabComponent
    ]
})
export class CustomizesModule {
}
