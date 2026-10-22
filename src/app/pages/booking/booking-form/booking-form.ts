import { Component, inject, OnDestroy, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GLOBAL_CONSTANT } from '../../../core/constants/global.constant';
import { IEmployeeList } from '../../../core/models/interfaces/employee.model';
import { finalize, map, Observable } from 'rxjs';
import { ICustomerList } from '../../../core/models/interfaces/customer.model';
import { IWarehouseList, IWarehouseSpaceList } from '../../../core/models/interfaces/warehouse.model';
import { CustomerService } from '../../../core/services/customers/customer-service';
import { WarehouseService } from '../../../core/services/warehouse/warehouse-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { MyButton } from '../../../shared/reusableComponents/my-button/my-button';
import { GetValidationErrorPipe } from '../../../shared/pipes/get-validation-error-pipe';
import { ActivatedRoute, Router, ɵEmptyOutletComponent } from '@angular/router';
import { IBookingList, IBookingModel } from '../../../core/models/interfaces/booking.model';
import { BookingService } from '../../../core/services/booking/booking-service';
import { getLoggedEmployeeData } from '../../../core/helper/common.helper';
import { CommonService } from '../../../core/services/common/common-service';

@Component({
  imports: [ReactiveFormsModule, AsyncPipe, MyButton, GetValidationErrorPipe, ɵEmptyOutletComponent, NgTemplateOutlet],
  selector: 'app-booking-form',
  styleUrl: './booking-form.css',
  templateUrl: './booking-form.html',
})
export class BookingForm implements OnDestroy {

  customerSrv=inject(CustomerService)
  warehouseSrv=inject(WarehouseService)
  bookingSrv=inject(BookingService)
  router=inject(Router)
  activatedRoute=inject(ActivatedRoute)
  commonSrv=inject(CommonService)

  customerList$:Observable<ICustomerList[]>=new Observable<ICustomerList[]>()
  warehouseList$:Observable<IWarehouseList[]> =new Observable<IWarehouseList[]>

  warehouseSpaceList=signal<IWarehouseSpaceList[]>([])

  bookingForm!:FormGroup

  currentBookingId:number=0

  isSubmitted:boolean=false

  constructor(private fb:FormBuilder){

    this.intializeForm()

    this.activatedRoute.params.subscribe({
      next:(res:any)=>{
        this.currentBookingId=Number(res.bookingId)
        if(this.currentBookingId!==0){
          this.getBookingById()
        }
      },
      error:(err:any)=>{

      }
    })

    this.customerList$=this.customerSrv.getAllCustomers().pipe(
      map((res:API_Response<ICustomerList[]>)=>res.data)
    )

    this.warehouseList$=this.warehouseSrv.getAllWarehouses().pipe(
      map((res:API_Response<IWarehouseList[]>)=>res.data)
    )

    this.bookingForm.get('warehouseId')?.valueChanges.subscribe({
      next:()=>{
        this.getSpacesByWarehouseId()
        this.bookingForm.get('spaceId')?.enable()
      },
      error:(err:any)=>{

      }
    })

  }
  intializeForm(){
    this.bookingForm=this.fb.group({
      customerId:['',[Validators.required]],
      warehouseId: ['',[Validators.required]],
      spaceId: ['',Validators.required],
      bookingFromDate: ['',[Validators.required]],
      bookingTillDate: ['',Validators.required],
      sqftAreaNeeded: [1],
      totalAmount: [0,[Validators.required,Validators.min(0.01)]],
      bookingDoneBy: [0]
    })
    this.bookingForm.get('spaceId')?.disable()
    const localData=getLoggedEmployeeData()
    if(localData!=undefined){
      this.bookingForm.controls['bookingDoneBy'].setValue(localData.id)
    }
  }

  getBookingById(){
    const subs=this.bookingSrv.getBookingById(this.currentBookingId).subscribe({
      next:(res:API_Response<IBookingList>)=>{
        this.bookingForm.patchValue(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
    this.commonSrv.subscriptionArray.push(subs)
  }

  getSpacesByWarehouseId(){
    const warehouseId=this.bookingForm.controls['warehouseId'].value
    const subs=this.warehouseSrv.getSpaceByWarehouseId(warehouseId).subscribe({
      next:(res:API_Response<IWarehouseSpaceList[]>)=>{
        this.warehouseSpaceList.set(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
    this.commonSrv.subscriptionArray.push(subs)
  }

  onReset(){
    this.router.navigateByUrl('/admin/booking-list')
  }

  onSaveForm(){
    this.isSubmitted=true
    const formValue = this.bookingForm.value as IBookingModel
    if(this.bookingForm.valid){
      this.commonSrv.showLoader$.next(true)
      const subs=this.bookingSrv.addBooking(formValue).pipe(
        finalize(()=>{
          this.commonSrv.showLoader$.next(false)
        })
      ).subscribe({
        next:(res:API_Response<IBookingList>)=>{
          if(res.result){
            alert("Booking added successfully")
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
      this.commonSrv.subscriptionArray.push(subs)
    }
  }

  onUpdateForm(){
    this.isSubmitted=true
    const formValue = this.bookingForm.value as IBookingModel
    if(this.bookingForm.valid){
      this.commonSrv.showLoader$.next(true)
      const subs=this.bookingSrv.updateBooking(formValue,this.currentBookingId).pipe(
        finalize(()=>{
          this.commonSrv.showLoader$.next(false)
        })
      ).subscribe({
        next:(res:API_Response<IBookingList>)=>{
          if(res.result){
            alert("Booking updated successfully")
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
      this.commonSrv.subscriptionArray.push(subs)
    }
  }

  ngOnDestroy(): void {
    this.commonSrv.unsubscribeSubscriptions()
  }
}
