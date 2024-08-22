import { Member, MemberStatus } from "../../common/types/members";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { Dayjs } from "dayjs";
import { PaymentMethod } from "../../common/types/subscription";

type CreateSubscriptionContextType = {
  amount: number,
  captureStep: number,
  dateFrom: Dayjs | null
  dateTo: Dayjs | null
  fingerTemplate: string | null
  isNewMember: boolean | null,
  members: Member[]
  memberStatus: MemberStatus
  paymentMethod: PaymentMethod
  selectedMember: Member | null
  step: number
  setAmount: Dispatch<SetStateAction<number>>
  setCaptureStep: Dispatch<SetStateAction<number>>
  setDateFrom: Dispatch<SetStateAction<Dayjs | null>>
  setDateTo: Dispatch<SetStateAction<Dayjs | null>>
  setFingerTemplate: Dispatch<SetStateAction<string | null>>
  setIsNewMember: Dispatch<SetStateAction<boolean | null>>
  setMembers: Dispatch<SetStateAction<Member[]>>
  setMemberStatus: Dispatch<SetStateAction<MemberStatus>>
  setPaymentMethod: Dispatch<SetStateAction<PaymentMethod>>
  setSelectedMember: Dispatch<SetStateAction<Member | null>>
  setStep: Dispatch<SetStateAction<number>>
}

type CreationStep = 'Member' | 'Subscription'


const INITIAL_STATE: CreateSubscriptionContextType = {
  amount: 0,
  captureStep: 0,
  dateFrom: null,
  dateTo: null,
  fingerTemplate: null,
  isNewMember: null,
  members: [],
  memberStatus: 'Inactivo',
  paymentMethod: 'Efectivo',
  selectedMember: null,
  step: 1,
  setAmount: () => undefined,
  setCaptureStep: () => undefined,
  setDateFrom: () => undefined,
  setDateTo: () => undefined,
  setFingerTemplate: () => undefined,
  setIsNewMember: () => undefined,
  setMembers: () => undefined,
  setMemberStatus: () => undefined,
  setPaymentMethod: () => undefined,
  setSelectedMember: () => undefined,
  setStep: () => undefined,
}

const CreateSubscriptionContext = createContext<CreateSubscriptionContextType>(INITIAL_STATE)
const Provider = CreateSubscriptionContext.Provider

const CreateSubscriptionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [amount, setAmount] = useState<number>(INITIAL_STATE.amount)
  const [captureStep, setCaptureStep] = useState<number>(INITIAL_STATE.captureStep)
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(INITIAL_STATE.dateFrom)
  const [dateTo, setDateTo] = useState<Dayjs | null>(INITIAL_STATE.dateTo)
  const [fingerTemplate, setFingerTemplate] = useState<string | null>(INITIAL_STATE.fingerTemplate)
  const [isNewMember, setIsNewMember] = useState<boolean | null>(INITIAL_STATE.isNewMember)
  const [members, setMembers] = useState<Member[]>(INITIAL_STATE.members)
  const [memberStatus, setMemberStatus] = useState<MemberStatus>(INITIAL_STATE.memberStatus)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(INITIAL_STATE.paymentMethod)
  const [selectedMember, setSelectedMember] = useState<Member | null>(INITIAL_STATE.selectedMember)
  const [step, setStep] = useState<number>(INITIAL_STATE.step)

  return <Provider
    value={{
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
      setIsNewMember,
      setMembers,
      setMemberStatus,
      setPaymentMethod,
      setSelectedMember,
      setStep
    }}
  >
    {children}
  </Provider>
}

export type { CreateSubscriptionContextType, CreationStep }
export { CreateSubscriptionProvider, CreateSubscriptionContext };