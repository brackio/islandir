import { TestBed, inject } from '@angular/core/testing';

import { KeywordResolverService } from './keyword-resolver.service';

describe('KeywordResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeywordResolverService]
    });
  });

  it('should be created', inject([KeywordResolverService], (service: KeywordResolverService) => {
    expect(service).toBeTruthy();
  }));
});
