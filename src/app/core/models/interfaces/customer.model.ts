export interface ICustomerModel {
    name: string
    address: string
    mobile: string
    email: string
    gstNo: string
}

export interface ICustomerList extends ICustomerModel{
    id:number
}