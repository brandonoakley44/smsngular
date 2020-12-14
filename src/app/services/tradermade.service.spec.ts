import { TestBed } from '@angular/core/testing';

import { TradermadeService } from './tradermade.service';

describe('TradermadeService', () => {
  let service: TradermadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TradermadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
