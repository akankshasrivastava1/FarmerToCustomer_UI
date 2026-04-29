import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { GlobalConstant } from '../constant/Constant';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  
  return next(req).pipe(
      catchError((err) => {
        if (err.status === 401) {
          alert("Token Required");
          return throwError (()=> err);
          // localStorage.removeItem(GlobalConstant.TOKEN_KEY);
          // router.navigate(['/login']);
        } else if (err.status === 500){
          alert("API Error");
          return throwError (()=> err);
        } else if (err.status === 400){
          alert("Check Payload");
          return throwError (()=> err);
        } else {
           return throwError (()=> err);
        }
        //throw err;
      })
    );
};
