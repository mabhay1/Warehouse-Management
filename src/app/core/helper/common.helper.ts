import { GLOBAL_CONSTANT } from "../constants/global.constant";
import { IEmployeeList } from "../models/interfaces/employee.model";

function getLoggedEmployeeData():IEmployeeList|undefined{
    const loggedData=localStorage.getItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY)
    if(loggedData!=null){
        const loggedEmployee=JSON.parse(loggedData) as IEmployeeList
        return loggedEmployee
    }
    else{
        return undefined
    }
}

export {getLoggedEmployeeData}