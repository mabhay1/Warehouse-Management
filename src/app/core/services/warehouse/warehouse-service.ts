import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_Response } from '../../models/interfaces/common.model';
import { IWarehouseModel } from '../../models/interfaces/warehouse.model';
import { GLOBAL_CONSTANT } from '../../constants/global.constant';

@Service()
export class WarehouseService {
    apiUrl = environment.API_URL
    http = inject(HttpClient)

    getAllWarehouses(): Observable<API_Response> {
        return this.http.get<API_Response>(this.apiUrl + GLOBAL_CONSTANT.API_METHODS.WAREHOUSE.GET_ALL_WAREHOUSES)
    }
    addWarehouse(obj:IWarehouseModel):Observable<API_Response> {
        return this.http.post<API_Response>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.WAREHOUSE.ADD_WAREHOUSE,obj)
    }
    updateWarehouse(obj:IWarehouseModel,id:number|undefined):Observable<API_Response>{
        return this.http.put<API_Response>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.WAREHOUSE.UPDATE_WAREHOUSE+id,obj)
    }
    deleteWarehouse(id:number|undefined):Observable<API_Response>{
        return this.http.delete<API_Response>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.WAREHOUSE.DELETE_WAREHOUSE+id)
    }
    getWarehouseById(id:number):Observable<API_Response>{
        return this.http.get<API_Response>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.WAREHOUSE.GET_WAREHOUSE_BY_ID+id)
    }
}
