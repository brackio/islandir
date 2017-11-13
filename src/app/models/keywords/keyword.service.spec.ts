import { TestBed, inject } from '@angular/core/testing';

import { KeywordService } from './keyword.service';

describe('KeywordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeywordService]
    });
  });

  it('should ...', inject([KeywordService], (service: KeywordService) => {
    expect(service).toBeTruthy();
  }));
});
