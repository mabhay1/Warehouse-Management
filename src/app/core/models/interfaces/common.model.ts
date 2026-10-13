import { IEmployeeList } from "./employee.model";

export interface API_Response<T=any>{
    message:string;
    result:boolean;
    data:T
}

export interface ILoginResponse{
    token: string,
    tokenType: string,
    expiresAtUtc: string,
    employee:IEmployeeList
}