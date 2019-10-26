import {Injectable} from '@angular/core';
import * as jsSHA from 'jssha';

@Injectable({
  providedIn: 'root'
})

export class PasswordEncryptService {

  static encrypt(data) {
    if (data) {
      const shaObj = new jsSHA('SHA-1', 'TEXT');
      shaObj.update(data);
      return shaObj.getHash('B64');
    }
    return data;
  }

  constructor() {
  }
}
