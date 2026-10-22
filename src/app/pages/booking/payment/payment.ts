import { Component, inject, Input, OnChanges, OnDestroy, OnInit, signal, SimpleChanges, WritableSignal } from '@angular/core';
import { BookingService } from '../../../core/services/booking/booking-service';
import { IPaymentList } from '../../../core/models/interfaces/booking.model';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe, DecimalPipe, NgTemplateOutlet } from '@angular/common';
import { PaymentModel } from '../../../core/models/classes/payment.model';
import { form, FormField, required, schema } from '@angular/forms/signals';
import { IEmployeeList } from '../../../core/models/interfaces/employee.model';
import { MyButton } from '../../../shared/reusableComponents/my-button/my-button';
import { GetValidationErrorPipe } from '../../../shared/pipes/get-validation-error-pipe';
import { ɵEmptyOutletComponent } from '@angular/router';
import { finalize } from 'rxjs';
import { getLoggedEmployeeData } from '../../../core/helper/common.helper';
import { CommonService } from '../../../core/services/common/common-service';

@Component({
  imports: [DatePipe, DecimalPipe, FormField, MyButton, GetValidationErrorPipe, ɵEmptyOutletComponent, NgTemplateOutlet],
  selector: 'app-payment',
  styleUrl: './payment.css',
  templateUrl: './payment.html',
})
export class Payment implements OnChanges, OnInit, OnDestroy{
  @Input() bookingId:number=0
  @Input() isOpen:boolean=false
  paymentList=signal<IPaymentList[]>([])

  bookingSrv=inject(BookingService)
  commonSrv=inject(CommonService)

  paymentObj:WritableSignal<PaymentModel>=signal<PaymentModel>(new PaymentModel())

  paymentForm=form(this.paymentObj,(schema)=>{
    required(schema.paymentDate),
    required(schema.amount),
    required(schema.mode),
    required(schema.narration),
    required(schema.status)
  })

  currentPaymentId:number=0
  loggedUser!:IEmployeeList

  isSubmitted:boolean=false
  isLoading=signal<boolean>(false)

  ngOnInit(): void {
    const localData=getLoggedEmployeeData()
    if(localData!==undefined){
      this.loggedUser=localData
    }
    this.paymentObj.update(x=>({
      ...x,
      receivedId:this.loggedUser.id
    }))
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.['bookingId']){
      if(changes?.['bookingId'].currentValue!==0){
        this.bookingId=changes?.['bookingId'].currentValue
        this.paymentObj.update(x=>({
          ...x,
          bookingId:this.bookingId
        }))
        this.getAllPaymentsByBookingId()
      }
    }
    if(changes?.['isOpen']){
      if(changes?.['isOpen'].currentValue==true){
        this.onReset()
      }
    }
  }

  getAllPaymentsByBookingId(){
    this.bookingSrv.getPaymentsByBookingId(this.bookingId).subscribe({
      next:(res:API_Response<IPaymentList[]>)=>{
        this.paymentList.set(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }

  onEdit(obj: IPaymentList) {
    this.currentPaymentId=obj.id
    this.paymentObj.set({
      bookingId: obj.bookingId,
      paymentDate: obj.paymentDate.split('T')[0],
      amount: obj.amount,
      mode: obj.mode,
      narration: obj.narration,
      status: obj.status,
      receivedId: obj.receivedId
    })
  }

  onDelete(id:number){

    this.bookingSrv.deletePayment(id)?.subscribe({
      next:(res:API_Response<any>)=>{
        if(res.result){
          alert("Payment Deleted Successfully")
          this.getAllPaymentsByBookingId()
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

  onReset(){
    this.currentPaymentId=0
    this.paymentForm().reset({
      bookingId: this.bookingId,
      paymentDate: '',
      amount: 0,
      mode: '',
      narration: '',
      status: '',
      receivedId: this.loggedUser.id
    })
    this.isSubmitted=false
  }

  onSavePayment(){
    this.isSubmitted=true
    const formValue=this.paymentForm().value()
    if(this.paymentForm().valid()){
      this.isLoading.set(true)
      this.bookingSrv.addPayment(formValue).pipe(
        finalize(()=>{
          this.isLoading.set(false)
        })
      ).subscribe({
        next:(res:API_Response<IPaymentList>)=>{
          if(res.result){
            alert('Payment Added Successfully')
            this.getAllPaymentsByBookingId()
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

  onUpdatePayment(){
    this.isSubmitted=true
    const formValue=this.paymentForm().value()
    if(this.paymentForm().valid()){
      this.isLoading.set(true)
      this.bookingSrv.updatePayment(formValue,this.currentPaymentId).pipe(
        finalize(()=>{
          this.isLoading.set(false)
        })
      ).subscribe({
        next:(res:API_Response<IPaymentList>)=>{
          if(res.result){
            alert('Payment Updated Successfully')
            this.getAllPaymentsByBookingId()
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

  ngOnDestroy(): void {
    this.commonSrv.takeUntilSubject$.next()
  }

}
