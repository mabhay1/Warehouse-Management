import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GLOBAL_CONSTANT } from '../../../core/constants/global.constant';
import { API_Response, IUserModel } from '../../../core/models/interfaces/common.model';
import { ClientService } from '../../../core/services/client/client-service';
import { ClientModel } from '../../../core/models/classes/client.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-client-form',
  styleUrl: './client-form.css',
  templateUrl: './client-form.html',
})
export class ClientForm {

  clientForm!:FormGroup

  loggedUser!:IUserModel

  currentClientId:number=0

  clientSrv=inject(ClientService)
  router=inject(Router)
  activatedRoute=inject(ActivatedRoute)

  constructor(private fb:FormBuilder){
    const localData=localStorage.getItem(GLOBAL_CONSTANT.LOCAL_LOGIN_KEY)
    if(localData!==null){
      this.loggedUser=JSON.parse(localData)
    }
    this.initializeForm()
    this.activatedRoute.params.subscribe({
      next:(res:any)=>{
        this.currentClientId=res.id
        if(this.currentClientId!=0){
          this.getClientByID()
        }
      }
    })

  }

  initializeForm() {
    this.clientForm = this.fb.group({
      clientId: [0],
      clientName: ['',[Validators.required]],
      phoneNumber: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      emailAddress: ['',[Validators.required]],
      clientAddress: [''],
      isActive: [false],
      createdAt: [new Date()],
      createdBy: [this.loggedUser.userId],
      updatedAt: [new Date()],
      updatedBy: [this.loggedUser.userId],
    })
  }

  getClientByID(){
    this.clientSrv.getClientById(this.currentClientId).subscribe({
      next:(res:API_Response)=>{
        this.clientForm.setValue(res.data)
      }
    })
  }

  onReset(){
    this.router.navigateByUrl('/admin/client-list')

  }

  onSaveClient(){
    const formValue:ClientModel=this.clientForm.value
    this.clientSrv.saveClient(formValue).subscribe({
      next:(res:API_Response)=>{
        if(res.result){
          alert(res.message)
          this.onReset()
        }
        else{
          alert(res.message)
        }
      },
      error:(err:HttpErrorResponse)=>{
        alert(err.message)
      }
    })
  }

  onUpdateClient(){
    const formObj:ClientModel= this.clientForm.value
    formObj.updatedBy=this.loggedUser.userId
    formObj.updatedAt=new Date().toISOString()
    this.clientSrv.updateClient(formObj).subscribe({
      next:(res:API_Response)=>{
        if(res.result){
          alert(res.message)
          this.onReset()
        }
        else{
          alert(res.message)
        }
      },
      error:(err:HttpErrorResponse)=>{
        alert(err.message)
      }
    })
  }

}
