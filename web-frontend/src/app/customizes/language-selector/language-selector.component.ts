import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/api';
import {Language} from '../../entities/language/language';
import {TranslateService} from '@ngx-translate/core';

export const supportedLanguages: Language[] = [
  new Language('us', 'United States', 'English (US)'),
  new Language('vn', 'Tiếng Việt', 'Tiếng Việt')
];

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})

export class LanguageSelectorComponent implements OnInit {
  constructor(private translate: TranslateService) {
    this.languages = supportedLanguages;
  }

  languages: Language[];


  selectedLangs: Language;

  change() {
    this.translate.use(this.selectedLangs.key);
    localStorage.setItem('language', this.selectedLangs.key);
  }

  ngOnInit(): void {
    const selectedLangsKey = localStorage.getItem('language') ? localStorage.getItem('language') : 'us';
    this.selectedLangs = this.languages.filter(language => language.key === selectedLangsKey)[0];
    this.translate.setDefaultLang('us');
    this.translate.use(this.selectedLangs.key);
  }

}
