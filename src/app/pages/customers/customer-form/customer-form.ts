import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ICustomerList, ICustomerModel } from '../../../core/models/interfaces/customer.model';
import { CustomerService } from '../../../core/services/customers/customer-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-customer-form',
  styleUrl: './customer-form.css',
  templateUrl: './customer-form.html',
})
export class CustomerForm {

  customerForm!:FormGroup

  customerService=inject(CustomerService)
  router=inject(Router)
  activatedRoute=inject(ActivatedRoute)
  
  editCustomerId:number=0

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
      name: [''],
      address: [''],
      mobile: [''],
      email: [''],
      gstNo: [''],
    })
  }

  getCustomerById(){
    this.customerService.getCustomerById(this.editCustomerId).subscribe({
      next:(res:API_Response<ICustomerList>)=>{
        this.customerForm.patchValue(res.data)
      }
    })
  }

  onReset(){
    this.router.navigateByUrl('/admin/customer-list')
  }

  onSaveCustomer(){
    const formData=this.customerForm.value as ICustomerModel
    this.customerService.addCustomer(formData).subscribe({
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
  }

  onUpdateCustomer(){
    const formData=this.customerForm.value as ICustomerModel
    this.customerService.updateCustomer(formData,this.editCustomerId).subscribe({
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
  }
}
