import {ModuleWithProviders, NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './views/login/login.component';
import {DefaultLayoutComponent} from './containers/default-layout';
import {AuthGuard} from './customizes/services/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'account',
        loadChildren: './views/admin/account/account.module#AccountModule',
      }
    ],
  },
];
export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {useHash: true});

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
