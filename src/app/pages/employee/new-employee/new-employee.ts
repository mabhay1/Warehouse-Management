import { Component, DestroyRef, inject, signal} from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { IWarehouseList } from '../../../core/models/interfaces/warehouse.model';
import { WarehouseService } from '../../../core/services/warehouse/warehouse-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { EmployeeModel } from '../../../core/models/classes/employee.model';
import { form, FormField, maxLength, minLength, required, schema } from '@angular/forms/signals';
import { GLOBAL_CONSTANT } from '../../../core/constants/global.constant';
import { EmployeeService } from '../../../core/services/employee/employee-service';
import { IEmployeeList } from '../../../core/models/interfaces/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GetValidationErrorPipe } from '../../../shared/pipes/get-validation-error-pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [AsyncPipe,FormField,NgIf, GetValidationErrorPipe],
  selector: 'app-new-employee',
  styleUrl: './new-employee.css',
  templateUrl: './new-employee.html',
})
export class NewEmployee {
  warehouseList$:Observable<IWarehouseList[]>=new Observable<IWarehouseList[]>()

  employeeObj=signal<EmployeeModel>(new EmployeeModel())

  employeeForm=form(this.employeeObj,(schema)=>{
    required(schema.name,{message:GLOBAL_CONSTANT.VALIDATION_TEXT.REQUIRED}),
    minLength(schema.name,4,{message:'Minimum 4 character required'}),
    required(schema.userName,{message:GLOBAL_CONSTANT.VALIDATION_TEXT.REQUIRED}),
    required(schema.role,{message:GLOBAL_CONSTANT.VALIDATION_TEXT.REQUIRED}),
    required(schema.warehouseAssignedId,{message:GLOBAL_CONSTANT.VALIDATION_TEXT.REQUIRED}),
    required(schema.mobileNo,{message:GLOBAL_CONSTANT.VALIDATION_TEXT.REQUIRED}),
    required(schema.password,{message:GLOBAL_CONSTANT.VALIDATION_TEXT.REQUIRED}),
    minLength(schema.password,8,{message:'Minimum 8 characters are allowed'}),
    maxLength(schema.password,128,{message:'Maximum 128 characters are allowed'})
  })

  employeeSrv=inject(EmployeeService)
  router=inject(Router)
  activatedRoute=inject(ActivatedRoute)
  destroyRef=inject(DestroyRef)

  editEmployee:number=0
  isSubmitted:boolean=false

  loading=signal<boolean>(false)

  constructor(private warehouseSrv:WarehouseService){
    this.warehouseList$=this.warehouseSrv.getAllWarehouses().pipe(
      map((res:API_Response<IWarehouseList[]>)=>res.data)
    )
    this.activatedRoute.params.subscribe({
      next:(res:any)=>{
        if(res.empId!=0){
          this.editEmployee=Number(res.empId)
          this.getEmployeeByID()
        }
      }
    })
  }

  getEmployeeByID() {
    this.employeeSrv.getEmployeeById(this.editEmployee).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (res: API_Response<IEmployeeList>) => {
        this.employeeObj.update((oldValue) => ({
          ...oldValue,
          name: res.data.name,
          userName: res.data.userName,
          role: res.data.role,
          warehouseAssignedId: String(res.data.warehouseAssignedId),
          mobileNo: res.data.mobileNo||''
        }))
      }
    })
  }

  onReset(){
    this.router.navigate(['/admin/employees'])
  }

  onSaveEmployee(){
    this.isSubmitted=true
    const formValue=this.employeeForm().value() as EmployeeModel
    if(this.employeeForm().valid()){
      this.loading.set(true)
      this.employeeSrv.addEmployee(formValue).pipe(
        finalize(()=>{
          this.loading.set(false)
        }),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next:(res:API_Response<IEmployeeList>)=>{
          alert(res.message)
          if(res.result){
            this.onReset()
          }
        }
      })
    }
  }

  onUpdateEmployee(){
    this.isSubmitted=true
    const formValue=this.employeeForm().value() as EmployeeModel
    if(this.employeeForm().valid()){
      this.loading.set(true)
      this.employeeSrv.updateEmployee(formValue,this.editEmployee).pipe(
        finalize(()=>{
          this.loading.set(false)
        }),
        takeUntilDestroyed(this.destroyRef)
      ).subscribe({
        next:(res:API_Response<IEmployeeList>)=>{
          alert(res.message)
          if(res.result){
            this.onReset()
          }
        }
      })
    }
  }


}
