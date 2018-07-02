import { TestBed, inject } from '@angular/core/testing';

import { KrakenApiClientService } from './kraken-api-client.service';

describe('KrakenApiClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KrakenApiClientService]
    });
  });

  it('should be created', inject([KrakenApiClientService], (service: KrakenApiClientService) => {
    expect(service).toBeTruthy();
  }));
});
