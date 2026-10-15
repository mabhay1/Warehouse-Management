import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { API_Response } from '../../models/interfaces/common.model';
import { IWarehouseList, IWarehouseModel, IWarehouseSpaceList } from '../../models/interfaces/warehouse.model';
import { GLOBAL_CONSTANT } from '../../constants/global.constant';
import { ApiService } from '../apiService/api-service';
import { WarehouseSpaceModel } from '../../models/classes/warehouseSpace.model';

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

    //spaces
    getSpaceByWarehouseId(id:number):Observable<API_Response<IWarehouseSpaceList[]>>{
        return this.apiSrv.get<IWarehouseSpaceList[]>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.WAREHOUSE.SPACE.GET_SPACES_BY_WAREHOUSE_ID+id)
    }

    addSpace(obj:WarehouseSpaceModel):Observable<API_Response<IWarehouseSpaceList>>{
        return this.apiSrv.post<IWarehouseSpaceList,WarehouseSpaceModel>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.WAREHOUSE.SPACE.ADD_SPACE,obj)
    }

    updateSpace(obj:WarehouseSpaceModel,id:number):Observable<API_Response<IWarehouseSpaceList>>{
        return this.apiSrv.put<IWarehouseSpaceList,WarehouseSpaceModel>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.WAREHOUSE.SPACE.UPDATE_SPACE+id,obj)
    }

    deleteSpace(id:number):Observable<API_Response<any>>|null{
        return this.apiSrv.deleteWithConfirmation(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.WAREHOUSE.SPACE.DELETE_SPACE+id)
    }
}
