import { TestBed } from '@angular/core/testing';

import { JopServiceService } from './jop-service.service';

describe('JopServiceService', () => {
  let service: JopServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JopServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
