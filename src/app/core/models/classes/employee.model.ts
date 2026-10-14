export class EmployeeModel{
    name: string;
    userName: string;
    role: string;
    warehouseAssignedId: string;
    mobileNo:string;
    password:string;

    constructor(){
        this.name=''
        this.userName=''
        this.role=''
        this.warehouseAssignedId=''
        this.mobileNo=''
        this.password=''
    }
}

export type EmployeeUpdatePayload=Omit<EmployeeModel,"password">&{
    password:null
}