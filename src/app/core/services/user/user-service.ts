import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { LoginUserModel } from '../../models/classes/user.model';
import { GLOBAL_CONSTANT } from '../../constants/global.constant';
import { API_Response } from '../../models/interfaces/common.model';
import { Observable } from 'rxjs';

@Service()
export class UserService {
    apiUrl=environment.API_URL
    http=inject(HttpClient)

    loginUser(obj:LoginUserModel):Observable<API_Response>{
        return this.http.post<API_Response>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.LOGIN_USER,obj)
    }
}
