import { inject, Service } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { ApiService } from '../apiService/api-service';
import { GLOBAL_CONSTANT } from '../../constants/global.constant';
import { IEmployeeList } from '../../models/interfaces/employee.model';
import { Observable } from 'rxjs';
import { API_Response } from '../../models/interfaces/common.model';
import { EmployeeModel, EmployeeUpdatePayload } from '../../models/classes/employee.model';

@Service()
export class EmployeeService {
    apiUrl=environment.API_URL
    apiSrv=inject(ApiService)

    getAllEmployees():Observable<API_Response<IEmployeeList[]>>{
        return this.apiSrv.get<IEmployeeList[]>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.EMPLOYEE.GET_ALL_EMPLOYEES)
    }
    addEmployee(obj:EmployeeModel):Observable<API_Response<IEmployeeList>>{
        return this.apiSrv.post<IEmployeeList,EmployeeModel>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.EMPLOYEE.ADD_EMPLOYEE,obj)
    }
    updateEmployee(obj:EmployeeUpdatePayload,id:number):Observable<API_Response<IEmployeeList>>{
        return this.apiSrv.put<IEmployeeList,EmployeeUpdatePayload>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.EMPLOYEE.UPDATE_EMPLOYEE+id,obj)
    }
    deleteEmployee(id:number):Observable<API_Response<any>>{
        return this.apiSrv.delete(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.EMPLOYEE.DELETE_EMPLOYEE+id)
    }
    getEmployeeById(id:number):Observable<API_Response<IEmployeeList>>{
        return this.apiSrv.get<IEmployeeList>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.EMPLOYEE.GET_EMPLOYEE_BY_ID+id)
    }
}
