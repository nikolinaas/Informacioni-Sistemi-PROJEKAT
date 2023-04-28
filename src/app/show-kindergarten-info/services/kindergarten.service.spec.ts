import { TestBed } from '@angular/core/testing';

import { KindergartenService } from './kindergarten.service';

describe('KindergartenService', () => {
  let service: KindergartenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KindergartenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
