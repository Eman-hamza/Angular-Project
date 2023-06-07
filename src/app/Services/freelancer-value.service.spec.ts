import { TestBed } from '@angular/core/testing';

import { FreelancerValueService } from './freelancer-value.service';

describe('FreelancerValueService', () => {
  let service: FreelancerValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FreelancerValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
