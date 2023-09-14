import { TestBed } from '@angular/core/testing';

import { ListTiersService } from './list-tiers.service';

describe('ListTiersService', () => {
  let service: ListTiersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListTiersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
