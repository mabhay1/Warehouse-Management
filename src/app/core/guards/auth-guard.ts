import { CanActivateFn, Router } from '@angular/router';
import { GLOBAL_CONSTANT } from '../constants/global.constant';
import { inject } from '@angular/core';
import { getLoggedEmployeeData } from '../helper/common.helper';

export const authGuard: CanActivateFn = (route, state) => {
  const loggedData=getLoggedEmployeeData()
  const router=inject(Router)
  if(loggedData!==undefined){
    return true
  }
  else{
    router.navigateByUrl('/login')
    return false
  }
};
