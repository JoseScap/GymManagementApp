import { Member, MemberField, MemberFieldValue, MemberStatus } from "../../common/types/members";
import { SetStateAction, useContext, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { CreateSubscriptionContext } from "../contexts/CreateSubscriptionContext.tsx";
import { Dayjs } from "dayjs";
import { PaymentMethod } from "../../common/types/subscription";
import { PaginatedApiResponse, SingleApiResponse } from "../../common/types/api";
import { CreateMemberWithSubRequest, CreateSubRequest } from "../../common/types/requests.ts";
import { useSocket } from "../../../socket/SocketContext.tsx";
import { CreateNewMember } from "../../common/types/responses.ts";

// TODO: Seguir la convención de nombres de carpetas que tomamos en cuenta.
interface CreateSubscriptionHooks {
  amount: number,
  captureStep: number,
  dateFrom: Dayjs | null
  dateTo: Dayjs | null
  fingerTemplate: string | null
  isNewMember: boolean | null
  members: Member[]
  memberStatus: MemberStatus
  paymentMethod: PaymentMethod
  selectedMember: Member | null
  step: number
  changeAmount: (amount: SetStateAction<number>) => void
  changeCaptureStep: (captureStep: number) => void,
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
    captureStep,
    dateFrom,
    dateTo,
    fingerTemplate,
    isNewMember,
    members,
    memberStatus,
    paymentMethod,
    selectedMember,
    step,
    setAmount,
    setCaptureStep,
    setDateFrom,
    setDateTo,
    setFingerTemplate,
    setMembers,
    setMemberStatus,
    setIsNewMember,
    setPaymentMethod,
    setSelectedMember,
    setStep
  } = useContext(CreateSubscriptionContext)
  const { socket } = useSocket()

  const changeAmount = (amount: SetStateAction<number>) => {
    setAmount(amount)
  }

  const changeCaptureStep = (captureStep: number) => {
    setCaptureStep(captureStep)
    if (socket) socket.emit('App:ChangeAction', { number: captureStep });
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
      if(fingerTemplate != null && fingerTemplate.length > 0) body.fingerTemplate = fingerTemplate
      const result: AxiosResponse<SingleApiResponse<CreateNewMember>> = await axios.post("http://localhost:3000/members/create-one-with-sub", body)
      if (socket && fingerTemplate != null && fingerTemplate.length > 0) socket.emit("App:AddFingerTemplate", result.data.data)
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

  useEffect(() => {
    if (socket) socket.on('App:Capture', (data: { Number: number, FingerImage: ArrayBuffer, FingerMergedTemplate64: string }) => {
      if (data.Number < 3) changeCaptureStep(data.Number + 1)
      else if (data.Number === 3 && data.FingerMergedTemplate64?.length > 0) setFingerTemplate(data.FingerMergedTemplate64)
    })

    return () => {
      if (socket) socket.emit('App:ChangeAction', { number: 0 });
    }
  }, [])

  return {
    amount,
    captureStep,
    dateFrom,
    dateTo,
    fingerTemplate,
    isNewMember,
    members,
    memberStatus,
    paymentMethod,
    selectedMember,
    step,
    changeAmount,
    changeCaptureStep,
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