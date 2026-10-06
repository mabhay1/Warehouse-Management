export class ClientModel {
    clientId: number;
    clientName: string;
    phoneNumber: string;
    emailAddress: string;
    clientAddress: string;
    isActive: boolean;
    createdAt: string;
    createdBy: number;
    updatedAt: string;
    updatedBy: number

    constructor(){
        this.clientId = 0;
        this.clientName = "";
        this.phoneNumber = "";
        this.emailAddress = "";
        this.clientAddress = "";
        this.isActive = false;
        this.createdAt = "";
        this.createdBy = 0;
        this.updatedAt = "";
        this.updatedBy = 0;
    }

}