import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { GLOBAL_CONSTANT } from '../../constants/global.constant';
import { Observable } from 'rxjs';
import { API_Response } from '../../models/interfaces/common.model';
import { ClientModel } from '../../models/classes/client.model';

@Service()
export class ClientService {
    apiUrl:string=environment.API_URL
    http=inject(HttpClient)

    getAllClients():Observable<API_Response>{
        return this.http.get<API_Response>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.GET_ALL_CLIENTS)
    }

    saveClient(obj:ClientModel):Observable<API_Response>{
        return this.http.post<API_Response>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.SAVE_CLIENT,obj)
    }

    getClientById(id:number):Observable<API_Response>{
        return this.http.get<API_Response>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.GET_CLIENT_BY_ID+id)
    }
    updateClient(obj:ClientModel):Observable<API_Response>{
        return this.http.put<API_Response>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.UPDATE_CLIENT,obj)
    }
    deleteClient(id:number):Observable<API_Response>{
        return this.http.delete<API_Response>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.DELETE_CLIENT+id)
    }
}
