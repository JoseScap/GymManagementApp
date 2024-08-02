import { Member, MemberCurrentStatus } from "../../common/types/members";
import { SetStateAction, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { CreateSubscriptionContext } from "../contexts/CreateSubscriptionContext.tsx";
import { Dayjs } from "dayjs";
import { PaymentMethod } from "../../common/types/subscription";

interface CreateSubscriptionHooks {
  amount: number,
  dateFrom: Dayjs | null
  dateTo: Dayjs | null
  members: Member[]
  memberStatus: MemberCurrentStatus
  paymentMethod: PaymentMethod
  selectedMember: Member | null
  changeAmount: (amount: SetStateAction<number>) => void
  changeDateFrom: (date: SetStateAction<Dayjs | null>) => void
  changeDateTo: (date: SetStateAction<Dayjs | null>) => void
  changeMemberStatus: (memberStatus: SetStateAction<MemberCurrentStatus>) => void
  changePaymentMethod: (member: SetStateAction<PaymentMethod>) => void
  changeSelectedMember: (member: SetStateAction<Member | null>) => void
  findAllInactiveMembers: () => Promise<void>
  subscribeMember: () => Promise<void>
}

export const useCreateSubscription = (): CreateSubscriptionHooks => {
  const {
    amount,
    dateFrom,
    dateTo,
    members,
    memberStatus,
    paymentMethod,
    selectedMember,
    setAmount,
    setDateFrom,
    setDateTo,
    setMembers,
    setMemberStatus,
    setPaymentMethod,
    setSelectedMember
  } = useContext(CreateSubscriptionContext)

  const changeAmount = (amount: SetStateAction<number>) => {
    setAmount(amount)
  }

  const changeDateFrom = (date: SetStateAction<Dayjs | null>) => {
    setDateFrom(date)
  }

  const changeDateTo = (date: SetStateAction<Dayjs | null>) => {
    setDateTo(date)
  }

  const changeMemberStatus = (memberStatus: SetStateAction<MemberStatus>) => {
    setMemberStatus(memberStatus)
  }

  const changePaymentMethod = (paymentMethod: SetStateAction<PaymentMethod>) => {
    setPaymentMethod(paymentMethod)
  }

  const changeSelectedMember = (member: SetStateAction<Member | null>) => {
    setSelectedMember(member)
  }

  const findAllInactiveMembers = async () => {
    const response: AxiosResponse<Member[]> = await axios.get(`http://localhost:3000/members?currentStatus=Inactivo`)
    setMembers(response.data)
  }

  const subscribeMember = async () => {
    await axios.post("http://localhost:3000/subscriptions", {
      amount: amount,
      dateFrom: dateFrom?.toDate(),
      dateTo: dateTo?.toDate(),
      memberId: selectedMember?.id,
      paymentMethod: paymentMethod,
      isCanceled: false
    })
    await axios.patch(`http://localhost:3000/members/${selectedMember?.id}`, { currentStatus: memberStatus })
  }

  return {
    amount,
    dateFrom,
    dateTo,
    members,
    memberStatus,
    paymentMethod,
    selectedMember,
    changeAmount,
    changeDateFrom,
    changeDateTo,
    changeMemberStatus,
    changePaymentMethod,
    changeSelectedMember,
    findAllInactiveMembers,
    subscribeMember
  }
}