import { TestBed, inject } from '@angular/core/testing';

import { ServiceResolverService } from './service-resolver.service';

describe('ServiceResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServiceResolverService]
    });
  });

  it('should be created', inject([ServiceResolverService], (service: ServiceResolverService) => {
    expect(service).toBeTruthy();
  }));
});
