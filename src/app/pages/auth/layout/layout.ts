import { Component, inject, OnDestroy, signal } from '@angular/core';
import { GLOBAL_CONSTANT } from '../../../core/constants/global.constant';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GetInitialsPipe } from '../../../shared/pipes/get-initials-pipe';
import { IEmployeeList } from '../../../core/models/interfaces/employee.model';
import { CommonService } from '../../../core/services/common/common-service';
import { getLoggedEmployeeData } from '../../../core/helper/common.helper';

@Component({
  imports: [RouterOutlet,RouterLink,RouterLinkActive, GetInitialsPipe],
  selector: 'app-layout',
  styleUrl: './layout.css',
  templateUrl: './layout.html',
})
export class Layout implements OnDestroy {
  loggedUserData!:IEmployeeList

  router=inject(Router)
  commonSrv=inject(CommonService)

  isLoading=signal<boolean>(false)
  constructor(){
    const localData=getLoggedEmployeeData()
    if(localData){
      this.loggedUserData=localData
    }
    this.commonSrv.showLoader$.subscribe({
      next:(flag:boolean)=>{
        this.isLoading.set(flag)
      }
    })
  }
  onLogOff(){
    localStorage.removeItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY)
    localStorage.removeItem(GLOBAL_CONSTANT.LOCAL_LOGIN_TOKEN_KEY)
    this.router.navigateByUrl('/login')
  }

  ngOnDestroy(): void {
    this.commonSrv.showLoader$.unsubscribe()
  }
}
