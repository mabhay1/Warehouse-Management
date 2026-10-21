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

export interface IPaymentList {
  id: number
  bookingId: number
  bookingDate: string
  bookingFromDate: string
  bookingTillDate: string
  bookingTotalAmount: number
  customerId: number
  customerName: string
  customerMobile: string
  customerEmail: string
  warehouseId: number
  warehouseName: string
  warehouseCity: string
  spaceId: number
  spaceName: string
  bookingDoneBy: number
  bookingDoneByName: string
  paymentDate: string
  amount: number
  mode: string
  narration: string
  status: string
  receivedId: number
  receivedByName: string
  receivedByMobile: string
}