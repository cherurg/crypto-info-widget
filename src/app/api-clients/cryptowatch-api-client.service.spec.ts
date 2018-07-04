import { TestBed, inject } from '@angular/core/testing';

import { CryptowatchApiClientService } from './cryptowatch-api-client.service';

describe('CryptowatchApiClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CryptowatchApiClientService]
    });
  });

  it('should be created', inject([CryptowatchApiClientService], (service: CryptowatchApiClientService) => {
    expect(service).toBeTruthy();
  }));
});
