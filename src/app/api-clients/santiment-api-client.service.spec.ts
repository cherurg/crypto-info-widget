import { TestBed, inject } from '@angular/core/testing';

import { SantimentApiClientService } from './santiment-api-client.service';

describe('SantimentApiClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SantimentApiClientService]
    });
  });

  it('should be created', inject([SantimentApiClientService], (service: SantimentApiClientService) => {
    expect(service).toBeTruthy();
  }));
});
