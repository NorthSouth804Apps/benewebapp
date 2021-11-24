import { TestBed } from '@angular/core/testing';

import { ServerstateInterceptorService } from './serverstate-interceptor.service';

describe('ServerstateInterceptorService', () => {
  let service: ServerstateInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerstateInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
