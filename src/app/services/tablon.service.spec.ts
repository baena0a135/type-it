import { TestBed } from '@angular/core/testing';

import { TablonService } from './tablon.service';

describe('TablonService', () => {
  let service: TablonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
