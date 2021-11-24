import { TestBed } from '@angular/core/testing';

import { BrowserstateInterceptorService } from './browserstate-interceptor.service';

describe('BrowserstateInterceptorService', () => {
  let service: BrowserstateInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserstateInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
