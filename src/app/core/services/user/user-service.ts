import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { LoginUserModel } from '../../models/classes/user.model';
import { GLOBAL_CONSTANT } from '../../constants/global.constant';
import { API_Response, ILoginResponse } from '../../models/interfaces/common.model';
import { Observable } from 'rxjs';
import { ApiService } from '../apiService/api-service';

@Service()
export class UserService {
    apiUrl=environment.API_URL
    apiSrv=inject(ApiService)

    loginUser(obj:LoginUserModel):Observable<API_Response<ILoginResponse>>{
        return this.apiSrv.post<ILoginResponse,LoginUserModel>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.LOGIN_USER,obj)
    }
}
