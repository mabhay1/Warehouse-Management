import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { API_Response } from '../../models/interfaces/common.model';
import { GLOBAL_CONSTANT } from '../../constants/global.constant';
import { ClientModel } from '../../models/classes/client.model';

@Service()
export class ClientService {
    apiUrl=environment.API_URL
    http = inject(HttpClient)

    getAllClients():Observable<API_Response>{
        return this.http.get<API_Response>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.GET_ALL_CLIENTS)
    }

    saveClient(clientObj:ClientModel):Observable<API_Response>{
        return this.http.post<API_Response>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.SAVE_CLIENT,clientObj)
    }
}
