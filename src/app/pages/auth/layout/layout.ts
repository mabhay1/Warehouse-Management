import { Component, inject } from '@angular/core';
import { GLOBAL_CONSTANT } from '../../../core/constants/global.constant';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GetInitialsPipe } from '../../../shared/pipes/get-initials-pipe';
import { IEmployeeList } from '../../../core/models/interfaces/employee.model';

@Component({
  imports: [RouterOutlet,RouterLink,RouterLinkActive, GetInitialsPipe],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout {
  loggedUserData!:IEmployeeList
  router=inject(Router)
  constructor(){
    const localData=localStorage.getItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY)
    if(localData){
      this.loggedUserData=JSON.parse(localData)
    }
  }
  onLogOff(){
    localStorage.removeItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY)
    localStorage.removeItem(GLOBAL_CONSTANT.LOCAL_LOGIN_TOKEN_KEY)
    this.router.navigateByUrl('/login')
  }
}
