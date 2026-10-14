import { Component, DestroyRef, inject, signal} from '@angular/core';
import { finalize, map, Observable } from 'rxjs';
import { IWarehouseList } from '../../../core/models/interfaces/warehouse.model';
import { WarehouseService } from '../../../core/services/warehouse/warehouse-service';
import { API_Response } from '../../../core/models/interfaces/common.model';
import { AsyncPipe, NgIf } from '@angular/common';
import { EmployeeModel, EmployeeUpdatePayload } from '../../../core/models/classes/employee.model';
import { applyWhen, form, FormField, maxLength, minLength, required, schema } from '@angular/forms/signals';
import { GLOBAL_CONSTANT } from '../../../core/constants/global.constant';
import { EmployeeService } from '../../../core/services/employee/employee-service';
import { IEmployeeList } from '../../../core/models/interfaces/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { GetValidationErrorPipe } from '../../../shared/pipes/get-validation-error-pipe';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MyButton } from '../../../shared/reusableComponents/my-button/my-button';

@Component({
  imports: [AsyncPipe,FormField,NgIf, GetValidationErrorPipe,MyButton],
  selector: 'app-new-employee',
  styleUrl: './new-employee.css',
  templateUrl: './new-employee.html',
})
export class NewEmployee {
  warehouseList$:Observable<IWarehouseList[]>=new Observable<IWarehouseList[]>()

  employeeObj=signal<EmployeeModel>(new EmployeeModel())

  employeeForm=form(this.employeeObj,(schema)=>{
    required(schema.name),
    minLength(schema.name,4),
    required(schema.userName),
    required(schema.role),
    required(schema.warehouseAssignedId),
    required(schema.mobileNo),
    minLength(schema.mobileNo,10),
    maxLength(schema.mobileNo,10),
    required(
      schema.password,
      {
        message:GLOBAL_CONSTANT.VALIDATION_TEXT.REQUIRED,
        when:(context)=>{
          // console.log('Name is '+context.valueOf(schema.name))
          return this.editEmployee===0
        }
      }),
    applyWhen(
      schema,
      ({valueOf})=>{
        // console.log('Role is '+valueOf(schema.role))
        return this.editEmployee===0
      },
      (schemaPath)=>{
        minLength(schemaPath.password,8),
        maxLength(schemaPath.password,128)
      }
    )
  })

  employeeSrv=inject(EmployeeService)
  router=inject(Router)
  activatedRoute=inject(ActivatedRoute)
  destroyRef=inject(DestroyRef)

  editEmployee:number=0
  isSubmitted:boolean=false
  saveUpdateBtnText:string=GLOBAL_CONSTANT.BUTTON_TEXT.EMPLOYEE

  loading=signal<boolean>(false)

  RoleList:string[]=Object.values(GLOBAL_CONSTANT.ROLES)

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
        this.employeeObj.set({
          name: res.data.name,
          userName: res.data.userName,
          role: res.data.role,
          warehouseAssignedId: String(res.data.warehouseAssignedId),
          mobileNo:res.data.mobileNo||'',
          password:'',
        })
      }
    })
  }

  onReset(){
    this.router.navigate(['/admin/employees'])
  }

  onSaveEmployee(){
    this.isSubmitted=true
    const formValue=this.employeeForm().value()
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
    const formValue=this.employeeForm().value()
    const updatePayload:EmployeeUpdatePayload={
      ...formValue,
      password:null
    }

    if(this.employeeForm().valid()){
      this.loading.set(true)
      this.employeeSrv.updateEmployee(updatePayload,this.editEmployee).pipe(
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
