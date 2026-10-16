import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { API_Response } from '../../models/interfaces/common.model';
import { Observable } from 'rxjs';
import { GLOBAL_CONSTANT } from '../../constants/global.constant';

@Service()
export class ApiService {
    http=inject(HttpClient)

    get<T>(url:string):Observable<API_Response<T>>{
        return this.http.get<API_Response<T>>(url)
    }
    post<T,B>(url:string,body:B):Observable<API_Response<T>>{
        return this.http.post<API_Response<T>>(url,body)
    }
    put<T,B>(url:string,body:B):Observable<API_Response<T>>{
        return this.http.put<API_Response<T>>(url,body)
    }
    delete<T=any>(url:string):Observable<API_Response<T>>|null{
        const isConfirm=confirm(GLOBAL_CONSTANT.DELETE_CONFIRMATION_MESSAGE)
        if(isConfirm){
            return this.http.delete<API_Response<T>>(url)
        }
        return null
    }
}
