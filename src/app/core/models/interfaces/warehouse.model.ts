import { WarehouseSpaceModel } from "../classes/warehouseSpace.model"

export interface IWarehouseModel {
    title: string,
    address1: string,
    address2: string,
    city: string,
    totalArea: number,
    isColdStorageAvailable: boolean
}

export interface IWarehouseList extends IWarehouseModel{
    id?:number
}

export interface IWarehouseSpaceList extends WarehouseSpaceModel{
    id:number
}