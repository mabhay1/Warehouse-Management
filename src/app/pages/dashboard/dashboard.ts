import { Component, ElementRef, inject, OnInit, signal, Signal, ViewChild } from '@angular/core';
import { BookingService } from '../../core/services/booking/booking-service';
import { WarehouseService } from '../../core/services/warehouse/warehouse-service';
import { map, Observable, tap } from 'rxjs';
import { IWarehouseList } from '../../core/models/interfaces/warehouse.model';
import { API_Response } from '../../core/models/interfaces/common.model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AsyncPipe, DatePipe, NgIf, UpperCasePipe } from '@angular/common';
import { IBookingCalender, IBookingList, IBookingModel, IBookingsDashboard, ISpacesDasboard } from '../../core/models/interfaces/booking.model';
import { getLoggedEmployeeData } from '../../core/helper/common.helper';
import { IEmployeeList } from '../../core/models/interfaces/employee.model';
import { ICustomerList } from '../../core/models/interfaces/customer.model';
import { CustomerService } from '../../core/services/customers/customer-service';

@Component({
  imports: [ReactiveFormsModule, AsyncPipe, DatePipe, UpperCasePipe, NgIf],
  selector: 'app-dashboard',
  styleUrl: './dashboard.css',
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {

  warehouseService = inject(WarehouseService)
  bookingService = inject(BookingService)
  customerService = inject(CustomerService)

  showBookingCalender=false

  warehouseListObs$:Observable<IWarehouseList[]> = new Observable<IWarehouseList[]>;
  warehouseList=signal<IWarehouseList[]>([])

  bookingCalenderSearchForm!:FormGroup;
  bookingForm!:FormGroup;

  bookingCalenderData = signal<IBookingCalender>({
    warehouseId: 0,
    warehouseName: '',
    city: '',
    fromDate: '',
    tillDate: '',
    dates: [],
    bookingCount: 0,
    spaces: [],
    unassignedBookings: []
  })
  
  spacesList=signal<ISpacesDasboard[]>([])
  datesList=signal<string[]>([])
  customersList = signal<ICustomerList[]>([])

  @ViewChild('newBooking') newBooking!:ElementRef

  selectedDate=''
  selectedSpace?:ISpacesDasboard

  loggedUserData:IEmployeeList|undefined=getLoggedEmployeeData()

  constructor(private fb:FormBuilder) {
    this.initializebookingCalenderSearchForm()
    this.intializeBookingForm()

  }

  initializebookingCalenderSearchForm(){
    this.bookingCalenderSearchForm = new FormGroup({
      warehouseId: new FormControl('',[Validators.required]),
      fromDate: new FormControl('',[Validators.required]),
      tillDate: new FormControl('',Validators.required)
    })
  }
  
  intializeBookingForm(){
    this.bookingForm=this.fb.group({
      customerId:[''],
      warehouseId: [''],
      spaceId: [''],
      bookingFromDate: [''],
      bookingTillDate: [''],
      sqftAreaNeeded: [1],
      totalAmount: [0],
      bookingDoneBy: [this.loggedUserData?.id||0]
    })
  }
  ngOnInit() : void{
    this.warehouseListObs$ = this.warehouseService.getAllWarehouses().pipe(
      tap((res:API_Response<IWarehouseList[]>)=>{
        this.warehouseList.set(res.data)
      }),
      map((res:API_Response<IWarehouseList[]>)=>res.data)
    )
  this.customerService.getAllCustomers().subscribe({
    next:(res:API_Response<ICustomerList[]>)=>{
      this.customersList.set(res.data)
    }
  })
  }

  loadBookings(){
    const formValue=this.bookingCalenderSearchForm.value
    if(this.bookingCalenderSearchForm.valid){
      this.showBookingCalender=true
      this.bookingService.getBookingCalender(formValue.warehouseId,formValue.fromDate,formValue.tillDate).subscribe({
        next:(res:API_Response<IBookingCalender>)=>{
          this.bookingCalenderData.set(res.data)
          this.spacesList.set(res.data.spaces)
          this.datesList.set(res.data.dates)
        },error:(err:HttpErrorResponse)=>{

        }
      })
    }
  }

  getAvailableBooking(space:ISpacesDasboard,dateSelected:string):IBookingsDashboard|undefined{
    const timeOfDateSelected=new Date(dateSelected).getTime()
    if(space.bookings.length>0){
      return space.bookings.find(x=>{
        return timeOfDateSelected >= new Date(x.bookingFromDate.split("T")[0]).getTime() && 
                  timeOfDateSelected <= new Date(x.bookingTillDate.split("T")[0]).getTime()
      })
    }
    else{
      return undefined
    }
  }

  openBookingForm(item:ISpacesDasboard,bookingDate:string){
    this.selectedSpace=item
    this.bookingForm.controls['warehouseId'].setValue(this.bookingCalenderData().warehouseId)
    this.bookingForm.controls['spaceId'].setValue(item.spaceId)
    this.bookingForm.controls['bookingFromDate'].setValue(bookingDate)
    this.selectedDate=bookingDate
    this.newBooking.nativeElement.style.display="block"
  }

  closeBookingForm(){
    this.newBooking.nativeElement.style.display="none"
    this.bookingForm.reset({
      customerId:'',
      warehouseId: '',
      spaceId: '',
      bookingFromDate: '',
      bookingTillDate: '',
      sqftAreaNeeded: 1,
      totalAmount: 0,
      bookingDoneBy: this.loggedUserData?.id||0
    })
  }

  saveBooking(){
    const formValue = this.bookingForm.value as IBookingModel
    this.bookingService.addBooking(formValue).subscribe({
      next:(res:API_Response<IBookingList>)=>{
        if(res.result){
          alert("Booking Done Successfully")
          this.closeBookingForm()
          this.loadBookings()
        }
        else{
          alert(res.message)
        }
      },
      error:(err:HttpErrorResponse)=>{
        alert(err.error.message)
      }
    })
  }
}
