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