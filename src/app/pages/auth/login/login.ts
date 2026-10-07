import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginUserModel } from '../../../core/models/classes/user.model';
import { UserService } from '../../../core/services/user/user-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { GLOBAL_CONSTANT } from '../../../core/constants/global.constant';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  loginObj:LoginUserModel=new LoginUserModel()
  userSrv=inject(UserService)
  router=inject(Router)

  onLogin(){
    this.userSrv.loginUser(this.loginObj).subscribe({
      next:(res:API_Response)=>{
        if(res.result){
          localStorage.setItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY,JSON.stringify(res.data))
          this.router.navigate(['admin/client-list'])
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
