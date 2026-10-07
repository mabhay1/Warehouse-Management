import { CanActivateFn, Router } from '@angular/router';
import { GLOBAL_CONSTANT } from '../constants/global.constant';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn=localStorage.getItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY)
  const router=inject(Router)
  if(isLoggedIn!==null){
    return true
  }
  else{
    router.navigateByUrl('/login')
    return false
  }
};
