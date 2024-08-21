import { MemberStatus } from "./members"
import { PaymentMethod } from "./subscription"

export type CreateMemberWithSubRequest = {
  fullName: string
  phoneNumber?: string
  dni: string
  amount: number
  dateFrom: string
  dateTo: string
  paymentMethod: PaymentMethod
  status: MemberStatus
}

export type CreateSubRequest = {
  amount: number
  dateFrom: string
  dateTo: string
  paymentMethod: PaymentMethod
  status: MemberStatus
  memberId: string
}