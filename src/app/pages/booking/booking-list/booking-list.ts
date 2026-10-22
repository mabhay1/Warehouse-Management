import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { IBookingList } from '../../../core/models/interfaces/booking.model';
import { BookingService } from '../../../core/services/booking/booking-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe, DecimalPipe, NgFor, UpperCasePipe } from '@angular/common';
import { MyModelPopup } from '../../../shared/reusableComponents/my-model-popup/my-model-popup';
import { Payment } from '../payment/payment';
import { Subscription } from 'rxjs';
import { CommonService } from '../../../core/services/common/common-service';

@Component({
  imports: [NgFor, DatePipe, DecimalPipe, MyModelPopup, Payment, UpperCasePipe],
  selector: 'app-booking-list',
  styleUrl: './booking-list.css',
  templateUrl: './booking-list.html',
})
export class BookingList implements OnInit,OnDestroy {

  router=inject(Router)
  bookingSrv=inject(BookingService)
  commonSrv=inject(CommonService)

  bookingList:WritableSignal<IBookingList[]>=signal<IBookingList[]>([])

  isOpenModel:boolean=false

  selectedBooking!:IBookingList

  ngOnInit(): void {
    this.getAllBookingList()
  }

  openBookingForm(id:number){
    this.router.navigate(['/admin/booking-form',id])
  }

  getAllBookingList(){
    const subs=this.bookingSrv.getAllBookings().subscribe({
      next:(res:API_Response<IBookingList[]>)=>{
        this.bookingList.set(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
    this.commonSrv.subscriptionArray.push(subs)
  }

  onDeleteBooking(id:number){
    const subs=this.bookingSrv.deleteBooking(id)?.subscribe({
      next:(res:API_Response<any>)=>{
        if(res.result){
          alert("Booking Deleted Success")
          this.getAllBookingList()
        }
        else{
          alert(res.message)
        }
      },
      error:(err:HttpErrorResponse)=>{
        alert(err.message)
      }
    })
    if(subs!=null){
      this.commonSrv.subscriptionArray.push(subs)
    }
  }

  openModel(obj:IBookingList){
    this.isOpenModel=true
    this.selectedBooking=obj
  }

  ngOnDestroy(): void {
    this.commonSrv.unsubscribeSubscriptions()
  }

}
