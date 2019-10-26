import {TestBed} from '@angular/core/testing';

import {PasswordEncryptService} from './password-encrypt.service';

describe('PasswordEncryptService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PasswordEncryptService = TestBed.get(PasswordEncryptService);
    expect(service).toBeTruthy();
  });
});
