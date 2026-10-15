export class WarehouseSpaceModel{
  warehouseId: number
  name: string
  areaSqft: number
  description: string
  isActive: boolean

  constructor(){
    this.warehouseId=0;
    this.name=''
    this.areaSqft=0
    this.description=''
    this.isActive=false
  }
  
}