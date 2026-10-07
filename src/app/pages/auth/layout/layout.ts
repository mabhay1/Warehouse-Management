import { Component, inject } from '@angular/core';
import { IUserModel } from '../../../core/models/interfaces/common.model';
import { GLOBAL_CONSTANT } from '../../../core/constants/global.constant';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  imports: [RouterOutlet],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {
  loggedUserData!:IUserModel
  router=inject(Router)
  constructor(){
    const localData=localStorage.getItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY)
    if(localData){
      this.loggedUserData=JSON.parse(localData)
    }
  }
  onLogOff(){
    localStorage.removeItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY)
    this.router.navigateByUrl('/login')
  }
}
