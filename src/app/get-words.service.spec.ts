import { TestBed } from '@angular/core/testing';

import { GetWordsService } from './get-words.service';

describe('GetWordsService', () => {
  let service: GetWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
