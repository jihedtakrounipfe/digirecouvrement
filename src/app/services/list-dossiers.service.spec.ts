import { TestBed } from '@angular/core/testing';

import { ListDossiersService } from './list-dossiers.service';

describe('ListDossiersService', () => {
  let service: ListDossiersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListDossiersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
