import { TestBed } from '@angular/core/testing';

import { ListDossiersFinancierService } from './list-dossiers-financier.service';

describe('ListDossiersFinancierService', () => {
  let service: ListDossiersFinancierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListDossiersFinancierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
