import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { GLOBAL_CONSTANT } from '../../constants/global.constant';
import { API_Response } from '../../models/interfaces/common.model';
import { Observable } from 'rxjs';
import { ICustomerList, ICustomerModel } from '../../models/interfaces/customer.model';
import { ApiService } from '../apiService/api-service';

@Service()
export class CustomerService {
    apiUrl=environment.API_URL
    apiSrv=inject(ApiService)

    getAllCustomers():Observable<API_Response<ICustomerList[]>>{
        return this.apiSrv.get<ICustomerList[]>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.CUSTOMERS.GET_ALL_CUSTOMERS)
    }
    addCustomer(obj:ICustomerModel):Observable<API_Response<ICustomerList>>{
        return this.apiSrv.post<ICustomerList,ICustomerModel>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.CUSTOMERS.ADD_CUSTOMER,obj)
    }
    updateCustomer(obj:ICustomerModel,id:number):Observable<API_Response<ICustomerList>>{
        return this.apiSrv.put<ICustomerList,ICustomerModel>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.CUSTOMERS.UPDATE_CUSTOMER+id,obj)
    }
    deleteCustomer(id:number){
        return this.apiSrv.delete(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.CUSTOMERS.DELETE_CUSTOMER+id)
    }
    getCustomerById(id:number):Observable<API_Response<ICustomerList>>{
        return this.apiSrv.get<ICustomerList>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.CUSTOMERS.GET_CUSTOMER_BY_ID+id)
    }
}
