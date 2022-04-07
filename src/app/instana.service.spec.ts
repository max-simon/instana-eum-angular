import { TestBed } from '@angular/core/testing';

import { InstanaService } from './instana.service';

describe('InstanaService', () => {
  let service: InstanaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstanaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
