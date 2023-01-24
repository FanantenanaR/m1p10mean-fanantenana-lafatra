import { TestBed } from '@angular/core/testing';

import { DepotserviceService } from './depotservice.service';

describe('DepotserviceService', () => {
  let service: DepotserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DepotserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
