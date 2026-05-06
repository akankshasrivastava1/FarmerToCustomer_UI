import { UserModel } from "../classes/UserModel";

export interface LoginResponse {
    data: UserModel;
    message: string;
    token: string;
}

export interface ApiResponseModel {
    data: any;
    message: string;
}

export interface IRole {
    roleId: number;
    roleName: string;
}

export interface FarmerProduct {
  farmerProductId: number;
  farmerId: number;
  productId: number;
  pricePerKg: number;
  availableQuantity: number;
  availableDate: string;
  status: string;
  productImage?: string;
  imageUrl?: string;
}
