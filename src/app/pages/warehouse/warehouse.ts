import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { WarehouseService } from '../../core/services/warehouse/warehouse-service';
import { API_Response } from '../../core/models/interfaces/common.model';
import { IWarehouseList, IWarehouseModel } from '../../core/models/interfaces/warehouse.model';
import { DecimalPipe, NgClass, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { GLOBAL_CONSTANT } from '../../core/constants/global.constant';
import { finalize, Subject, takeUntil } from 'rxjs';
import { WarehouseSpace } from './components/warehouse-space/warehouse-space';

@Component({
  imports: [ReactiveFormsModule,NgFor, NgClass,NgIf, DecimalPipe, UpperCasePipe, FormsModule, WarehouseSpace],
  selector: 'app-warehouse',
  styleUrl: './warehouse.css',
  templateUrl: './warehouse.html',
})
export class Warehouse implements OnInit,OnDestroy {

  warehouseService=inject(WarehouseService)

  warehouseList:WritableSignal<IWarehouseList[]>=signal<IWarehouseList[]>([])
  // warehouseSpaceList=signal<IWarehouseSpaceList[]>([])

  editWarehouseId:number|undefined
  totalSQft:number=0
  coldStorageSites:number=0
  // currentSpaceId:number=0

  isSubmitted:boolean=false
  loading=signal<boolean>(false)

  warehouseForm!:FormGroup
  // warehouseSpaceForm:WarehouseSpaceModel=new WarehouseSpaceModel()

  @ViewChild('spaceModel') spaceModel!:ElementRef
  isOpenModel:boolean=false
  selectedWarehouse?:IWarehouseList
  // totalAvailableSpace:number=0

  takeUntilSubject$:Subject<void>=new Subject<void>()

  constructor(){
    this.initializeForm()
  }

  initializeForm() {
    this.warehouseForm = new FormGroup({
      title: new FormControl('',[Validators.required,Validators.minLength(3)]),
      address1: new FormControl('',[Validators.required]),
      address2: new FormControl('',[Validators.required]),
      city: new FormControl('',[Validators.required]),
      totalArea: new FormControl(0,[Validators.required,Validators.min(1),Validators.max(2147483647)]),
      isColdStorageAvailable: new FormControl(false)
    })
  }

  ngOnInit(): void {
    this.getAllWarehouses()
  }

  getAllWarehouses(){
    this.warehouseService.getAllWarehouses().pipe(
      takeUntil(this.takeUntilSubject$)
    ).subscribe({
      next:(res:API_Response<IWarehouseList[]>)=>{
        this.warehouseList.set(res.data)
        this.totalSQft=this.warehouseList().reduce((acc,current)=>acc+current.totalArea,0)
        this.coldStorageSites=this.warehouseList().filter(x=>x.isColdStorageAvailable).length
      },
      error:(err:API_Response)=>{

      }
    })
  }

  onEdit(item:IWarehouseList){
    this.editWarehouseId=item.id
    // this.warehouseForm.patchValue(item)
    const editObj=structuredClone(item)
    delete editObj.id
    this.warehouseForm.setValue(editObj)
  }

  onDelete(id:number|undefined){
    const isConfirm=confirm(GLOBAL_CONSTANT.DELETE_CONFIRMATION_MESSAGE)
    if(isConfirm){
      this.warehouseService.deleteWarehouse(id).pipe(
        takeUntil(this.takeUntilSubject$)
      ).subscribe({
        next:(res:API_Response<any>)=>{
          alert(res.message)
          if(res.result){
            this.getAllWarehouses()
          }
        },
        error:(err:HttpErrorResponse)=>{
          alert(err.message)
        }
      })
    }
  }

  onReset(){
    this.warehouseForm.reset()
    this.editWarehouseId=undefined
    this.isSubmitted=false
  }

  getControlErrorMessge(controlName:string){
    const control=this.warehouseForm.controls[controlName]
    let errorMessage=''
    if(control.touched||control.dirty||this.isSubmitted){
      if(control.errors?.['required']){
        errorMessage= GLOBAL_CONSTANT.VALIDATION_TEXT.REQUIRED
      }
      else if(control.errors?.['minlength']){
        errorMessage= `Minimum ${control.errors?.['minlength'].requiredLength} character required`
      }
      else if(control.errors?.['min'] || control.errors?.['max']){
        errorMessage=`Value should be between 1 and 2147483647`
      }
    }
    return errorMessage

  }

  onAddWarehouse() {
    this.isSubmitted = true
    const formValue = this.warehouseForm.value as IWarehouseModel
    if (this.warehouseForm.valid) {
      this.loading.set(true)
      this.warehouseService.addWarehouse(formValue).pipe(
        finalize(()=>{
          this.loading.set(false)
        }),
        takeUntil(this.takeUntilSubject$)
      ).subscribe({
        next: (res:API_Response<IWarehouseList>) => {
          alert(res.message)
          if (res.result) {
            this.getAllWarehouses()
            this.onReset()
          }
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message)
        }
      })
    }
  }
  onUpdateWarehouse() {
    this.isSubmitted = true
    const formValue: IWarehouseModel = this.warehouseForm.value
    if (this.warehouseForm.valid) {
      this.loading.set(true)
      this.warehouseService.updateWarehouse(formValue, this.editWarehouseId).pipe(
        finalize(()=>{
          this.loading.set(false)
        }),
        takeUntil(this.takeUntilSubject$)
      ).subscribe({
        next: (res: API_Response<IWarehouseList>) => {
          alert(res.message)
          if (res.result) {
            this.getAllWarehouses()
            this.onReset()
          }
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message)
        }
      })
    }
  }

  openSpaceModelPopup(warehouseObj:IWarehouseList){
    console.log("Warehouse space model open")
    this.isOpenModel=true
    this.selectedWarehouse=warehouseObj
  }

  closeSpaceModelPopup(){
    this.isOpenModel=false
  }

  ngOnDestroy(): void {
    this.takeUntilSubject$.next()
    this.takeUntilSubject$.unsubscribe()
  }

}
