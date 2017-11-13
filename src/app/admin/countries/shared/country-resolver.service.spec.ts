import { TestBed, inject } from '@angular/core/testing';

import { CountryResolverService } from './country-resolver.service';

describe('CountryResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountryResolverService]
    });
  });

  it('should be created', inject([CountryResolverService], (service: CountryResolverService) => {
    expect(service).toBeTruthy();
  }));
});
