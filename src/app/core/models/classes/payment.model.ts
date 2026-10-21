export class PaymentModel {
  bookingId: number
  paymentDate: string
  amount: number
  mode: string
  narration: string
  status: string
  receivedId: number

  constructor(){
    this.bookingId=0
    this.paymentDate=''
    this.amount=0
    this.mode=''
    this.narration=''
    this.status=''
    this.receivedId=0
  }
}