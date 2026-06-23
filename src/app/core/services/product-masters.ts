import { inject, Injectable } from '@angular/core';
import { ApiResponseModel } from '../models/interface/api-response.Model';
import { Observable } from 'rxjs';
import { GlobalConstant } from '../constant/Constant';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { ProductMasterItem } from '../models/classes/ProductMaster.model';

@Injectable({
  providedIn: 'root',
})
export class ProductMasterService {
  http = inject(HttpClient);

  // getAllProductMasters(): Observable<ApiResponseModel> {
  //   return this.http.get<ApiResponseModel>(
  //     environment.API_URL + GlobalConstant.API_ENDPOINTS.GET_ALL_PRODUCTS_MASTER
  //   );
  // }

  createProductMaster(productObj: ProductMasterItem): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(
      environment.API_URL + GlobalConstant.API_ENDPOINTS.CREATE_PRODUCT_MASTER,
      productObj
    );
  }

  updateProductMaster(productObj: ProductMasterItem): Observable<ApiResponseModel> {
    return this.http.put<ApiResponseModel>(
      environment.API_URL +
        GlobalConstant.API_ENDPOINTS.UPDATE_PRODUCT_MASTER +
        productObj.productId,
      productObj
    );
  }

  getAllProductMaster(): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(
      environment.API_URL + GlobalConstant.API_ENDPOINTS.GET_ALL_PRODUCTS_MASTER
    );
  }

  deleteProductMaster(productId: number): Observable<ApiResponseModel> {
    return this.http.delete<ApiResponseModel>(
      environment.API_URL + GlobalConstant.API_ENDPOINTS.DELETE_PRODUCT_MASTER + productId
    );
  }
}
