export interface IBookingModel {
  customerId: string,
  warehouseId: string,
  spaceId: string,
  bookingFromDate: string,
  bookingTillDate: string,
  sqftAreaNeeded: number,
  totalAmount: number,
  bookingDoneBy: number
}

export interface IBookingList extends IBookingModel {
    id: number
    customerName: string,
    customerMobile: string,
    customerEmail: string,
    warehouseName: string,
    warehouseCity: string,
    spaceName: string,
    bookingDate: string,
    bookingDoneByName: string
}