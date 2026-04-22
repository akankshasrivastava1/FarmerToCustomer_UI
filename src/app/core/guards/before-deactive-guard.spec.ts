import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { beforeDeactiveGuard } from './before-deactive-guard';

describe('beforeDeactiveGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) =>
    TestBed.runInInjectionContext(() => beforeDeactiveGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
