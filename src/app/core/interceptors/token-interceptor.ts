import { HttpInterceptorFn } from '@angular/common/http';
import { GLOBAL_CONSTANT } from '../constants/global.constant';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const url=req.url
  if(url.includes("Login")){
    return next(req);
  }
  const loginToken=localStorage.getItem(GLOBAL_CONSTANT.LOCAL_LOGIN_TOKEN_KEY)
  if(loginToken!=null){
    const newReq=req.clone({
      setHeaders:{
        Authorization:`Bearer ${loginToken}`
      }
    })
    return next(newReq);
  }
  return next(req);
};
