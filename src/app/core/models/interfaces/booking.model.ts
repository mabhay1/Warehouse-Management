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

export interface IBookingsDashboard{
  bookingId: number,
  customerId: number,
  customerName: string,
  spaceId: number,
  bookingFromDate: string,
  bookingTillDate: string,
  visibleFromDate: string,
  visibleTillDate: string,
  sqftAreaNeeded: number
}

export interface ISpacesDasboard{
  spaceId: number,
  name: string,
  areaSqft: number,
  isActive: boolean,
  bookings: IBookingsDashboard[]
}

export interface IBookingCalender {
  warehouseId: number,
  warehouseName: string,
  city: string,
  fromDate: string,
  tillDate: string,
  dates: string[],
  bookingCount: number,
  spaces: ISpacesDasboard[]
  unassignedBookings: []
}