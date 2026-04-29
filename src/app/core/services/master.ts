import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GlobalConstant } from '../constant/Constant';
import { Observable } from 'rxjs';
import { ApiResponseModel } from '../models/interface/api-response.Model';
import { Category, Role } from '../models/classes/Master.model';

@Injectable({
  providedIn: 'root',
})
export class MasterService {

  http = inject(HttpClient);

  getAllRoles(): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(environment.API_URL + GlobalConstant.API_ENDPOINTS.GET_ALL_ROLES)
  }

  createRole(roleObj: Role): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(environment.API_URL + GlobalConstant.API_ENDPOINTS.CREATE_ROLES, roleObj);
  }

  updateRole(roleObj: Role): Observable<ApiResponseModel> {
    return this.http.put<ApiResponseModel>(environment.API_URL + GlobalConstant.API_ENDPOINTS.UPDATE_ROLE + roleObj.roleId, roleObj);
  }

  deleteRole(id: number): Observable<ApiResponseModel> {
    return this.http.delete<ApiResponseModel>(environment.API_URL + GlobalConstant.API_ENDPOINTS.DELETE_ROLE + id);
  }

 
createCategory(cateObj: Category): Observable<ApiResponseModel>{
  return this.http.post<ApiResponseModel>(
    environment.API_URL + GlobalConstant.API_ENDPOINTS.CREATE_CATEGORY,
    cateObj
  );
}

  updateCategory(cateObj: Category): Observable<ApiResponseModel> {
    return this.http.put<ApiResponseModel>(environment.API_URL + GlobalConstant.API_ENDPOINTS.UPDATE_CATEGORY + cateObj.categoryId, cateObj);
  }

 
getAllCategory(): Observable<ApiResponseModel> {
  return this.http.get<ApiResponseModel>(
    environment.API_URL + GlobalConstant.API_ENDPOINTS.GET_ALL_CATEGORY
  );
}

  deleteCategory(id: number): Observable<ApiResponseModel> {
    return this.http.delete<ApiResponseModel>(environment.API_URL + GlobalConstant.API_ENDPOINTS.DELETE_CATEGORY + id);
  }

}
