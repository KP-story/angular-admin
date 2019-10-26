import {Component, OnInit} from '@angular/core';
import {Router, NavigationEnd, NavigationStart, NavigationCancel, NavigationError} from '@angular/router';
import {LoaderService} from './services/loader.service';
import {Subject} from 'rxjs';
import {MessageService} from 'primeng/api';
import {UserPermissionService} from './services/autho/user-permission.service';
import {AuthService} from './services/autho/auth.service';
import {HttpClient} from '@angular/common/http';
import {Language} from './entities/language/language';
import {LanguageSelectorComponent, supportedLanguages} from './customizes/language-selector/language-selector.component';
import {TranslateService} from '@ngx-translate/core';

@Component({
  // tslint:disable-next-line
  selector: 'body',
  templateUrl: './app.component.html',

})
export class AppComponent implements OnInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;

  constructor(private translate: TranslateService, private httpCtl: HttpClient, private router: Router, private authenService: AuthService, private loaderService: LoaderService, private userPermissionService: UserPermissionService) {
    const currentUser = localStorage.getItem('currentUser');
    let username;
    if (currentUser) {
      const account = JSON.parse(currentUser);
      username = account.username;
    }
    if (username == null) {
      this.authenService.logout();
    } else {
      this.userPermissionService.getSyncPermissionsOfUser(username).then();
    }
  }

  ngOnInit() {

    const selectedLangsKey = localStorage.getItem('language') ? localStorage.getItem('language') : 'us';
    const selectedLangs = supportedLanguages.filter(language => language.key === selectedLangsKey)[0];
    this.translate.setDefaultLang('us');
    this.translate.use(selectedLangs.key);
    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading.next(true);
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading.next(false);
          break;
        }
        default: {
          break;
        }
      }
      window.scrollTo(0, 0);
    });
  }
}
