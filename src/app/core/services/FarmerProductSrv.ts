import { inject, Injectable } from '@angular/core';
import { ApiResponseModel} from '../models/interface/api-response.Model';
import { IFarmerProductList } from '../models/interface/FarmerProduct.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { GlobalConstant } from '../constant/Constant';
import { FarmerProductsClass } from '../models/classes/Product.model';

@Injectable({
  providedIn: 'root',
})
export class FarmerProductSrv {
  http = inject(HttpClient);

  getAllProducts(): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(
      environment.API_URL + GlobalConstant.API_ENDPOINTS.GET_ALL_PRODUCTS
    );
  }

   getAllFarmerProductsByCatId(id: Number): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(
      environment.API_URL + GlobalConstant.API_ENDPOINTS.GET_ALL_FARMER_PRODUCTS_BY_CAT + id
    );
  }
   getAllProductsByLoggedFarmer(id: Number): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(
      environment.API_URL + GlobalConstant.API_ENDPOINTS.GET_ALL_PRODUCTS_BY_FARMER + id
    );
  }

  createProduct(productObj: FarmerProductsClass): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(
      environment.API_URL + GlobalConstant.API_ENDPOINTS.CREATE_PRODUCT,
      productObj
    );
  }

  updateProduct(productObj: FarmerProductsClass): Observable<ApiResponseModel> {
    return this.http.put<ApiResponseModel>(
      environment.API_URL +
        GlobalConstant.API_ENDPOINTS.UPDATE_PRODUCT +
        productObj.farmerProductId,
      productObj
    );
  }

  deleteProduct(farmerProductId: number): Observable<ApiResponseModel> {
    return this.http.delete<ApiResponseModel>(
      environment.API_URL +
        GlobalConstant.API_ENDPOINTS.DELETE_PRODUCT +
        farmerProductId
    );
  }
}
