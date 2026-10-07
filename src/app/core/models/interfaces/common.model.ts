export interface API_Response{
    message:string;
    result:boolean;
    data:any
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