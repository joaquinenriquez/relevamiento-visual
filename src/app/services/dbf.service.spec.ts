import { TestBed } from '@angular/core/testing';

import { DbfService } from './dbf.service';

describe('DbfService', () => {
  let service: DbfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DbfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
