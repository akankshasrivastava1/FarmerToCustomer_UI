import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserLogin, UserModel } from '../models/classes/UserModel';
import { environment } from '../../../environments/environment.development';
import { GlobalConstant } from '../constant/Constant';
import { Observable } from 'rxjs';
import { LoginResponse, ApiResponseModel } from '../models/interface/api-response.Model';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  http = inject(HttpClient);
  apiUrl: string = environment.API_URL;

  login(obj: UserLogin): Observable<LoginResponse>{
    debugger;
    return this.http.post<LoginResponse>(this.apiUrl+ GlobalConstant.API_ENDPOINTS.LOGIN,obj)
  }

  register(obj: UserModel): Observable<ApiResponseModel>{
    debugger;
    return this.http.post<ApiResponseModel>(this.apiUrl + GlobalConstant.API_ENDPOINTS.CREATE_USER, obj)
  }

  getUserById(id: number){
    return this.http.get(`${this.apiUrl} ${GlobalConstant.API_ENDPOINTS.GET_USER_BY_ID} ${id}`)
  }

  
}
