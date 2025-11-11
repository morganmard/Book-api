import { TestBed } from '@angular/core/testing';

import { ApiBackend } from './api-backend';

describe('ApiBackend', () => {
  let service: ApiBackend;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiBackend);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
