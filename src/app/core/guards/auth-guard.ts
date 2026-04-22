import { CanActivateFn, Router } from '@angular/router';
import { GlobalConstant } from '../constant/Constant';
import { inject } from '@angular/core';

//upto 16v this is service
export const authGuard: CanActivateFn = (route, state) => {
  debugger;
  const router = inject(Router);
  const isLocalDataPresent = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_KEY);
  if (isLocalDataPresent == null) {
    router.navigateByUrl("/login");
    return false;
  } else {
    return true;
  }
};

// canActivate vs canDectivate

//before component active we can write some code in authguard
//before component deactive we can write some code in canDeactivate