export interface API_Response<T=any>{
    message:string;
    result:boolean;
    data:T
}

export interface IUserModel{
    userId: number,
    emailId: string,
    password: string,
    createdDate: string,
    projectName: string,
    fullName: string,
    mobileNo: string,
    extraId: any
}