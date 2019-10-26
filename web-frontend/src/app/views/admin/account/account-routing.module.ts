import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {OperationsComponent} from './operations/operations.component';
import {ResourcesManagerComponent} from './resources/resources-manager.component';
import {RolebasedComponent} from './rolebased/rolebased.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {UsersManagerComponent} from './users-manager/users-manager.component';
import {AuthGuard} from '../../../customizes/services/auth.guard';


const routes: Routes = [

  {
    path: '', redirectTo: 'changepassword'

  },


  {

    path: 'changepassword',
    component: ChangePasswordComponent,
    data: {
      title: 'Change password',
      icon: 'icon-layers',
      caption: 'KP Pro',
      status: true,
    }
  },


  {    canActivate: [AuthGuard],

    path: 'operation',
    component: OperationsComponent,
    data: {
      title: 'Operations',
      icon: 'icon-layers',
      caption: 'KP Pro',
      resource: 'account:operation',
      status: true,
    }
  },


  {
    path: 'resource',
    component: ResourcesManagerComponent,
    data: {
      title: 'Resources',
      icon: 'icon-layers',
      resource: 'account:resource',

      caption: 'KP Pro',
      status: true,
    }
  }

  ,
  {
    path: 'profile',
    component: UserDetailComponent,

    data: {
      title: 'Profile'
    }
  },

  {
    path: 'role',
    component: RolebasedComponent,
    data: {
      title: 'Roles',
      icon: 'icon-layers',
      caption: 'KP Pro',
      status: true,
    }
  },

  {
    path: 'users',
    component: UsersManagerComponent

    ,

    data: {
      resource: 'account:user',

      title: 'Users manager'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
