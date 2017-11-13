import { TestBed, inject } from '@angular/core/testing';

import { BusinessGuardService } from './business-guard.service';

describe('BusinessGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BusinessGuardService]
    });
  });

  it('should be created', inject([BusinessGuardService], (service: BusinessGuardService) => {
    expect(service).toBeTruthy();
  }));
});
