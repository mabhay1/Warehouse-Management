import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { LoginUserModel } from '../../../core/models/classes/user.model';
import { UserService } from '../../../core/services/user/user-service';
import { API_Response, ILoginResponse } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { GLOBAL_CONSTANT } from '../../../core/constants/global.constant';
import { Router } from '@angular/router';
import { GetValidationErrorPipe } from '../../../shared/pipes/get-validation-error-pipe';
import { NgClass, NgIf } from '@angular/common';
import { finalize, Subscription } from 'rxjs';

@Component({
  imports: [FormsModule,GetValidationErrorPipe,NgClass, NgIf],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login implements OnDestroy{
  loginObj:LoginUserModel=new LoginUserModel()

  userSrv=inject(UserService)
  router=inject(Router)

  isSubmitted:boolean=false
  showHidePassword:boolean=false

  loading=signal<boolean>(false)

  subscription!:Subscription

  onLogin(form:NgForm){
    this.isSubmitted=true
    if(form.valid){
      this.loading.set(true)
      this.subscription=this.userSrv.loginUser(this.loginObj).pipe(
        finalize(()=>{
          this.loading.set(false)
        })
      ).subscribe({
        next:(res:API_Response<ILoginResponse>)=>{
          if(res.result){
            localStorage.setItem(GLOBAL_CONSTANT.LOCAL_LOGIN_TOKEN_KEY,res.data.token)
            localStorage.setItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY,JSON.stringify(res.data.employee))
            this.router.navigate(['admin/customer-list'])
          }
          else{
            alert(res.message)
          }
        },
        error:(err:HttpErrorResponse)=>{
          alert("API Error")
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
