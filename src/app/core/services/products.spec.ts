import { TestBed } from '@angular/core/testing';

import { FarmerProductSrv } from './FarmerProductSrv';

describe('Product', () => {
  let service: FarmerProductSrv;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FarmerProductSrv);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
