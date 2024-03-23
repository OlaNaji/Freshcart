import { TestBed } from '@angular/core/testing';

import { EcomDataService } from './ecom-data.service';

describe('EcomDataService', () => {
  let service: EcomDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcomDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
