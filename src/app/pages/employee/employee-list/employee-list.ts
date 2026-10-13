import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { IEmployeeList } from '../../../core/models/interfaces/employee.model';
import { EmployeeService } from '../../../core/services/employee/employee-service';
import { AsyncPipe, NgFor } from '@angular/common';
import { GetInitialsPipe } from '../../../shared/pipes/get-initials-pipe';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  imports: [RouterLink,NgFor,GetInitialsPipe],
  selector: 'app-employee-list',
  styleUrl: './employee-list.css',
  templateUrl: './employee-list.html',
})
export class EmployeeList implements OnInit, OnDestroy {
  employeeList=signal<IEmployeeList[]>([])

  takeUntilSubject$:Subject<void>=new Subject<void>()

  constructor(private employeeSrv:EmployeeService){
    
  }

  ngOnInit(): void {
    this.getAllEmployees()
  }

  getAllEmployees(){
    this.employeeSrv.getAllEmployees().pipe(
      takeUntil(this.takeUntilSubject$)
    ).subscribe({
      next:(res)=>{
        this.employeeList.set(res.data)
      },
      error:(err:HttpErrorResponse)=>{

      }
    })
  }

  onDelete(id:number){
    const isConfirm=confirm("Are you sure want to delete")
    if(isConfirm){
      this.employeeSrv.deleteEmployee(id).pipe(
        takeUntil(this.takeUntilSubject$)
      ).subscribe({
        next:(res:API_Response<any>)=>{
          if(res.result){
            alert(res.message)
            this.getAllEmployees()
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
    this.takeUntilSubject$.next()
    this.takeUntilSubject$.unsubscribe()
  }

}
