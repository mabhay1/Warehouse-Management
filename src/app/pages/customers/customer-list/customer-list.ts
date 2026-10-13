import { Component, inject, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { ICustomerList } from '../../../core/models/interfaces/customer.model';
import { CustomerService } from '../../../core/services/customers/customer-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { GetInitialsPipe } from '../../../shared/pipes/get-initials-pipe';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  imports: [GetInitialsPipe, NgIf, RouterLink],
  selector: 'app-customer-list',
  styleUrl: './customer-list.css',
  templateUrl: './customer-list.html',
})
export class CustomerList implements OnInit, OnDestroy {

  isTableView: boolean = true

  customerList: WritableSignal<ICustomerList[]> = signal<ICustomerList[]>([])

  router = inject(Router)
  subscriptionArray:Subscription[]=[]

  constructor(private customerSrv: CustomerService) {

  }

  ngOnInit(): void {
    this.getAllCustomers()
  }

  getAllCustomers() {
    const subs=this.customerSrv.getAllCustomers().subscribe({
      next: (res:API_Response<ICustomerList[]>) => {
        this.customerList.set(res.data)
      },
      error: (err: HttpErrorResponse) => {

      }
    })
    this.subscriptionArray.push(subs)
  }
  onEdit(customer: ICustomerList) {
    this.router.navigate(['/admin/customer-form', customer.id])
  }
  onDelete(id: number) {
    const isConfirm = confirm("Are you sure want to delete!!")
    if (isConfirm) {
      const subs =this.customerSrv.deleteCustomer(id).subscribe({
        next: (res:API_Response<any>) => {
          alert(res.message)
          if (res.result) {
            this.getAllCustomers()
          }
        },
        error: (err: HttpErrorResponse) => {
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
