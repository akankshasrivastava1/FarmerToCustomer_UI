import { CanDeactivateFn } from '@angular/router';

export const beforeDeactiveGuard: CanDeactivateFn<unknown> = (
  component,
  currentRoute,
  currentState,
  nextState,
) => {
  return true;
};
