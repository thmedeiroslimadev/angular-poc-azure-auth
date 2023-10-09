import { TestBed } from '@angular/core/testing';

import { AzureAdServiceService } from './azure-ad-service.service';

describe('AzureAdServiceService', () => {
  let service: AzureAdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureAdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
