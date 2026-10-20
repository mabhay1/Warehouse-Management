import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';
import { IBookingList } from '../../../core/models/interfaces/booking.model';
import { BookingService } from '../../../core/services/booking/booking-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe, DecimalPipe, NgFor } from '@angular/common';

@Component({
  imports: [NgFor, DatePipe, DecimalPipe],
  selector: 'app-booking-list',
  styleUrl: './booking-list.css',
  templateUrl: './booking-list.html',
})
export class BookingList implements OnInit {

  router=inject(Router)
  bookingSrv=inject(BookingService)

  bookingList:WritableSignal<IBookingList[]>=signal<IBookingList[]>([])

  ngOnInit(): void {
    this.getAllBookingList()
  }

  openBookingForm(id:number){
    this.router.navigate(['/admin/booking-form',id])
  }

  getAllBookingList(){
    this.bookingSrv.getAllBookings().subscribe({
      next:(res:API_Response<IBookingList[]>)=>{
        this.bookingList.set(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }

  onDeleteBooking(id:number){
    this.bookingSrv.deleteBooking(id)?.subscribe({
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
  }

}
