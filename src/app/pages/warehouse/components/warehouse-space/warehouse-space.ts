import { Component, DestroyRef, effect, inject, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { IWarehouseList, IWarehouseSpaceList } from '../../../../core/models/interfaces/warehouse.model';
import { DecimalPipe, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { GetValidationErrorPipe } from '../../../../shared/pipes/get-validation-error-pipe';
import { WarehouseSpaceModel } from '../../../../core/models/classes/warehouseSpace.model';
import { WarehouseService } from '../../../../core/services/warehouse/warehouse-service';
import { API_Response } from '../../../../core/models/interfaces/common.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MyButton } from '../../../../shared/reusableComponents/my-button/my-button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [FormsModule,NgIf,DecimalPipe,GetValidationErrorPipe, MyButton],
  selector: 'app-warehouse-space',
  styleUrl: './warehouse-space.css',
  templateUrl: './warehouse-space.html',
})
export class WarehouseSpace implements OnInit,OnChanges {
  @Input() selectedWarehouse:IWarehouseList|undefined

  warehouseService=inject(WarehouseService)
  destRef=inject(DestroyRef)

  warehouseSpaceForm:WarehouseSpaceModel=new WarehouseSpaceModel()

  warehouseSpaceList=signal<IWarehouseSpaceList[]>([])

  currentSpaceId:number=0
  totalAvailableSpace:number=0

  constructor(){
    effect(()=>{
      this.calculateTotalAvailableSpace()
    })
  }

  ngOnInit(): void {
    this.getSpacesByWarehouseId()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.['selectedWarehouse']){
      if(changes?.['selectedWarehouse'].currentValue){
        this.warehouseSpaceForm.warehouseId=this.selectedWarehouse?.id||0
        this.getSpacesByWarehouseId()
      }
    }
  }

  calculateTotalAvailableSpace(){
    let totalOcuppiedSpace=this.warehouseSpaceList().reduce((acc,current)=>acc+current.areaSqft,0)
    if(this.currentSpaceId!=0){
      totalOcuppiedSpace=this.warehouseSpaceList().filter(x=>x.id!==this.currentSpaceId).reduce((acc,curr)=>acc+curr.areaSqft,0)
    }
    if(this.selectedWarehouse){
    this.totalAvailableSpace= this.selectedWarehouse.totalArea-totalOcuppiedSpace
    }
  }

  getSpacesByWarehouseId(){
    this.warehouseService.getSpaceByWarehouseId(this.selectedWarehouse?.id||0).pipe(
      takeUntilDestroyed(this.destRef)
    ).subscribe({
      next:(res:API_Response<IWarehouseSpaceList[]>)=>{
        this.warehouseSpaceList.set(res.data)
      },
      error:(err:HttpErrorResponse)=>{
      }
    })
  }

  onEditSpace(spaceObj:IWarehouseSpaceList){
    this.currentSpaceId=spaceObj.id
    this.warehouseSpaceForm=structuredClone(spaceObj)
    this.calculateTotalAvailableSpace()
  }

  onDeleteSpace(id:number){
    this.warehouseService.deleteSpace(id)?.pipe(
      takeUntilDestroyed(this.destRef)
    ).subscribe({
      next:(res:API_Response<any>)=>{
        if(res.result){
          alert('Space Removed successfully')
          this.warehouseSpaceList.update(oldValue=>oldValue.filter(x=>x.id!==id))
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

  onResetSpaceForm(form:NgForm){
    this.currentSpaceId=0
    form.reset()
    this.warehouseSpaceForm =new WarehouseSpaceModel()
    this.warehouseSpaceForm.warehouseId=this.selectedWarehouse?.id||0
  }

  onSaveSpace(form:NgForm){
    this.warehouseService.addSpace(this.warehouseSpaceForm).pipe(
      takeUntilDestroyed(this.destRef)
    ).subscribe({
      next:(res:API_Response<IWarehouseSpaceList>)=>{
        if(res.result){
          alert('Space added successfully')
          this.warehouseSpaceList.update((oldValue)=>[...oldValue,res.data])
          this.onResetSpaceForm(form)
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
  onUpdateSpace(form:NgForm){
    this.warehouseService.updateSpace(this.warehouseSpaceForm,this.currentSpaceId).pipe(
      takeUntilDestroyed(this.destRef)
    ).subscribe({
      next:(res:API_Response<IWarehouseSpaceList>)=>{
        if(res.result){
          alert('Space updated successfully')
          this.warehouseSpaceList.update(oldValue=>oldValue.map(x=>x.id===this.currentSpaceId?res.data:x))
          this.onResetSpaceForm(form)
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
