import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICustomerList, ICustomerModel } from '../../../core/models/interfaces/customer.model';
import { CustomerService } from '../../../core/services/customers/customer-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { GLOBAL_CONSTANT } from '../../../core/constants/global.constant';
import { GetValidationErrorPipe } from '../../../shared/pipes/get-validation-error-pipe';
import { finalize, Subscription } from 'rxjs';
import { CommonService } from '../../../core/services/common/common-service';

@Component({
  imports: [ReactiveFormsModule, GetValidationErrorPipe],
  selector: 'app-customer-form',
  styleUrl: './customer-form.css',
  templateUrl: './customer-form.html',
})
export class CustomerForm implements OnDestroy {

  customerForm!:FormGroup

  customerService=inject(CustomerService)
  router=inject(Router)
  activatedRoute=inject(ActivatedRoute)
  commonSrv=inject(CommonService)
  
  editCustomerId:number=0
  isSubmitted:boolean=false

  loading=signal<boolean>(false)

  subscriptionArray:Subscription[]=[]

  constructor(private fb:FormBuilder){
    this.initializeForm()
    this.activatedRoute.params.subscribe({
      next:(res:any)=>{
        if(res.id!=0){
          this.editCustomerId=Number(res.id)
          this.getCustomerById()
        }
      }
    })
  }

  initializeForm() {
    this.customerForm = this.fb.group({
      name: ['',[Validators.required,Validators.minLength(3)]],
      address: [''],
      mobile: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
      email: ['',[Validators.required,Validators.pattern(GLOBAL_CONSTANT.REGEX.EMAIL)]],
      gstNo: [''],
    })
  }

  getCustomerById(){
    const subs=this.customerService.getCustomerById(this.editCustomerId).subscribe({
      next:(res:API_Response<ICustomerList>)=>{
        this.customerForm.patchValue(res.data)
      }
    })
    this.subscriptionArray.push(subs)
  }

  onReset(){
    this.router.navigateByUrl('/admin/customer-list')
    this.isSubmitted=false
  }

  onSaveCustomer(){
    this.isSubmitted=true
    const formData=this.customerForm.value as ICustomerModel
    if(this.customerForm.valid){
      this.commonSrv.showLoader$.next(true)
      const subs=this.customerService.addCustomer(formData).pipe(
        finalize(()=>{
          this.commonSrv.showLoader$.next(false)
        })
      ).subscribe({
        next:(res:API_Response<ICustomerList>)=>{
          alert(res.message)
          if(res.result){
            this.onReset()
          }
        },
        error:(err:HttpErrorResponse)=>{
          alert(err.message)
        }
      })
      this.subscriptionArray.push(subs)
    }
  }

  onUpdateCustomer(){
    this.isSubmitted=true
    const formData=this.customerForm.value as ICustomerModel
    if(this.customerForm.valid){
      // this.loading.set(true)
      this.commonSrv.showLoader$.next(true)
      const subs=this.customerService.updateCustomer(formData,this.editCustomerId).pipe(
        finalize(()=>{
          // this.loading.set(false)
          this.commonSrv.showLoader$.next(false)
        })
      ).subscribe({
        next:(res:API_Response<ICustomerList>)=>{
          alert(res.message)
          if(res.result){
            this.onReset()
          }
        },
        error:(err:HttpErrorResponse)=>{
          alert(err.message)
        }
      })
      this.subscriptionArray.push(subs)
    }
  }

  ngOnDestroy(): void {
    this.subscriptionArray.forEach((subs)=>{
      subs.unsubscribe()
    })
  }
}
