import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { API_Response } from '../../models/interfaces/common.model';
import { IWarehouseList, IWarehouseModel } from '../../models/interfaces/warehouse.model';
import { GLOBAL_CONSTANT } from '../../constants/global.constant';
import { ApiService } from '../apiService/api-service';

@Service()
export class WarehouseService {
    apiUrl = environment.API_URL
    apiSrv = inject(ApiService)

    getAllWarehouses():Observable<API_Response<IWarehouseList[]>> {
        return this.apiSrv.get<IWarehouseList[]>(this.apiUrl + GLOBAL_CONSTANT.API_METHODS.WAREHOUSE.GET_ALL_WAREHOUSES)
    }
    addWarehouse(obj:IWarehouseModel):Observable<API_Response<IWarehouseList>> {
        return this.apiSrv.post<IWarehouseList,IWarehouseModel>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.WAREHOUSE.ADD_WAREHOUSE,obj)
    }
    updateWarehouse(obj:IWarehouseModel,id:number|undefined):Observable<API_Response<IWarehouseList>>{
        return this.apiSrv.put<IWarehouseList,IWarehouseModel>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.WAREHOUSE.UPDATE_WAREHOUSE+id,obj)
    }
    deleteWarehouse(id:number|undefined):Observable<API_Response<any>>{
        return this.apiSrv.delete(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.WAREHOUSE.DELETE_WAREHOUSE+id)
    }
    getWarehouseById(id:number):Observable<API_Response<IWarehouseList>>{
        return this.apiSrv.get<IWarehouseList>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.WAREHOUSE.GET_WAREHOUSE_BY_ID+id)
    }
}
