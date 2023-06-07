import { TestBed } from '@angular/core/testing';

import { HireFreelancerService } from './hire-freelancer.service';

describe('HireFreelancerService', () => {
  let service: HireFreelancerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HireFreelancerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
