import { inject, Service } from '@angular/core';
import { ApiService } from '../apiService/api-service';
import { environment } from '../../../../environments/environment.development';
import { GLOBAL_CONSTANT } from '../../constants/global.constant';
import { IBookingModel, IBookingList, IPaymentList } from '../../models/interfaces/booking.model';
import { Observable } from 'rxjs';
import { API_Response } from '../../models/interfaces/common.model';
import { PaymentModel } from '../../models/classes/payment.model';

@Service()
export class BookingService {

    apiSrv=inject(ApiService)

    apiUrl=environment.API_URL

    // Booking Model
    
    getAllBookings():Observable<API_Response<IBookingList[]>>{
        return this.apiSrv.get<IBookingList[]>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.BOOKING.GET_ALL_BOOKING)
    }

    addBooking(obj:IBookingModel):Observable<API_Response<IBookingList>>{
        return this.apiSrv.post<IBookingList,IBookingModel>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.BOOKING.ADD_BOOKING,obj)
    }
    
    updateBooking(obj:IBookingModel,id:number):Observable<API_Response<IBookingList>>{
        return this.apiSrv.put<IBookingList,IBookingModel>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.BOOKING.UPDATE_BOOKING+id,obj)
    }

    deleteBooking(id:number):Observable<API_Response<any>>|null{
        return this.apiSrv.delete(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.BOOKING.DELETE_BOOKING+id)
    }

    getBookingById(id:number):Observable<API_Response<IBookingList>>{
        return this.apiSrv.get<IBookingList>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.BOOKING.GET_BOOKING_BY_ID+id)
    }

    // Payment Model

    getPaymentsByBookingId(id:number):Observable<API_Response<IPaymentList[]>>{
        return this.apiSrv.get<IPaymentList[]>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.BOOKING.PAYMENT.GET_PAYMENTS_BY_BOOKING_ID+id)
    }

    addPayment(obj:PaymentModel):Observable<API_Response<IPaymentList>>{
        return this.apiSrv.post<IPaymentList,PaymentModel>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.BOOKING.PAYMENT.ADD_PAYMENT,obj)
    }

    updatePayment(obj:PaymentModel,id:number):Observable<API_Response<IPaymentList>>{
        return this.apiSrv.put<IPaymentList,PaymentModel>(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.BOOKING.PAYMENT.UPDATE_PAYMENT+id,obj)
    }

    deletePayment(id:number):Observable<API_Response<any>>|null{
        return this.apiSrv.delete(this.apiUrl+GLOBAL_CONSTANT.API_METHODS.BOOKING.PAYMENT.DELETE_PAYMENT+id)
    }
}
