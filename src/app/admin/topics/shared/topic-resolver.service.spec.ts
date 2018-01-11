import { TestBed, inject } from '@angular/core/testing';

import { TopicResolverService } from './topic-resolver.service';

describe('TopicResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicResolverService]
    });
  });

  it('should be created', inject([TopicResolverService], (service: TopicResolverService) => {
    expect(service).toBeTruthy();
  }));
});
