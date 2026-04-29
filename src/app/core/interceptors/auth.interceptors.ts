import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstant } from '../constant/Constant';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const loginData = localStorage.getItem(GlobalConstant.LOCAL_LOGIN_KEY);

  let authReq = req;

  if (loginData) {
    const parsed = JSON.parse(loginData);
    if (parsed?.token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${parsed.token}`
        } 
      });
    }
  }

  return next(authReq);
};

//custom header - use interceptor -- monitor all outgoing(request) an incoming(response) request