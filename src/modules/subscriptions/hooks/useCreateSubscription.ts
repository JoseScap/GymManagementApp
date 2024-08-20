import { Member, MemberField, MemberFieldValue, MemberStatus } from "../../common/types/members";
import { SetStateAction, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { CreateSubscriptionContext } from "../contexts/CreateSubscriptionContext.tsx";
import { Dayjs } from "dayjs";
import { PaymentMethod } from "../../common/types/subscription";
import { PaginatedApiResponse } from "../../common/types/api";
import { CreateMemberWithSubRequest, CreateSubRequest } from "../../common/types/requests.ts";

// TODO: Seguir la convención de nombres de carpetas que tomamos en cuenta.
interface CreateSubscriptionHooks {
  amount: number,
  dateFrom: Dayjs | null
  dateTo: Dayjs | null
  isNewMember: boolean | null
  members: Member[]
  memberStatus: MemberStatus
  paymentMethod: PaymentMethod
  selectedMember: Member | null
  step: number
  changeAmount: (amount: SetStateAction<number>) => void
  changeDateFrom: (date: SetStateAction<Dayjs | null>) => void
  changeDateTo: (date: SetStateAction<Dayjs | null>) => void
  changeIsNewMember: (isNewMember: SetStateAction<boolean | null>) => void,
  changeMemberStatus: (memberStatus: SetStateAction<MemberStatus>) => void
  changePaymentMethod: (member: SetStateAction<PaymentMethod>) => void
  changeSelectedMember: (member: SetStateAction<Member | null>) => void
  changeSelectedMemberProp: <K extends MemberField>(field: K, value: MemberFieldValue<K>) => void
  changeStep: (step: SetStateAction<number>) => void
  findAllInactiveMembers: () => Promise<void>
  subscribeMember: () => Promise<void>
}

export const useCreateSubscription = (): CreateSubscriptionHooks => {
  const {
    amount,
    dateFrom,
    dateTo,
    isNewMember,
    members,
    memberStatus,
    paymentMethod,
    selectedMember,
    step,
    setAmount,
    setDateFrom,
    setDateTo,
    setMembers,
    setMemberStatus,
    setIsNewMember,
    setPaymentMethod,
    setSelectedMember,
    setStep
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

  const changeIsNewMember = (isNewMember: SetStateAction<boolean | null>) => {
    setIsNewMember(isNewMember)
  }

  const changePaymentMethod = (paymentMethod: SetStateAction<PaymentMethod>) => {
    setPaymentMethod(paymentMethod)
  }

  const changeSelectedMember = (member: SetStateAction<Member | null>) => {
    setSelectedMember(member)
  }

  const changeSelectedMemberProp = <K extends MemberField>(field: K, value: MemberFieldValue<K>) => {
    const newMember: Member = {
      ...selectedMember!
    }
    newMember[field] = value
    changeSelectedMember(newMember)
  }

  const changeStep = (step: SetStateAction<number>) => {
    setStep(step)
  }

  const findAllInactiveMembers = async () => {
    const response: AxiosResponse<PaginatedApiResponse<Member>> = await axios.get(`http://localhost:3000/members/find-paginated?embedSubscriptions=false`)
    setMembers(response.data.data)
  }

  const subscribeMember = async () => {
    if (isNewMember) {
      const body: CreateMemberWithSubRequest = {
        fullName: selectedMember?.fullName!,
        phoneNumber: selectedMember?.phoneNumber === "" ? undefined : selectedMember?.phoneNumber,
        dni: selectedMember?.dni!,
        amount: amount,
        dateFrom: dateFrom?.toISOString()!,
        dateTo: dateTo?.toISOString()!,
        paymentMethod: paymentMethod,
        status: memberStatus
      }
      await axios.post("http://localhost:3000/members/create-one-with-sub", body)
    } else {
      const body: CreateSubRequest = {
        amount: amount,
        dateFrom: dateFrom?.toISOString()!,
        dateTo: dateTo?.toISOString()!,
        paymentMethod: paymentMethod,
        status: memberStatus,
        memberId: selectedMember?.id!
      }
      await axios.post("http://localhost:3000/subscriptions/create-one", body)
    }
  }

  return {
    amount,
    dateFrom,
    dateTo,
    isNewMember,
    members,
    memberStatus,
    paymentMethod,
    selectedMember,
    step,
    changeAmount,
    changeDateFrom,
    changeDateTo,
    changeIsNewMember,
    changeMemberStatus,
    changePaymentMethod,
    changeSelectedMember,
    changeSelectedMemberProp,
    changeStep,
    findAllInactiveMembers,
    subscribeMember
  }
}