import { Member, MemberStatus } from "../../common/types/members";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { Dayjs } from "dayjs";
import { PaymentMethod } from "../../common/types/subscription";

type CreateSubscriptionContextType = {
  amount: number,
  dateFrom: Dayjs | null
  dateTo: Dayjs | null
  members: Member[]
  memberStatus: MemberStatus
  paymentMethod: PaymentMethod
  selectedMember: Member | null
  setAmount: Dispatch<SetStateAction<number>>
  setDateFrom: Dispatch<SetStateAction<Dayjs | null>>
  setDateTo: Dispatch<SetStateAction<Dayjs | null>>
  setMembers: Dispatch<SetStateAction<Member[]>>
  setMemberStatus: Dispatch<SetStateAction<MemberStatus>>
  setPaymentMethod: Dispatch<SetStateAction<PaymentMethod>>
  setSelectedMember: Dispatch<SetStateAction<Member | null>>
}

type CreationStep = 'Member' | 'Subscription'

const INITIAL_STATE: CreateSubscriptionContextType = {
  amount: 0,
  dateFrom: null,
  dateTo: null,
  members: [],
  memberStatus: 'Inactivo',
  paymentMethod: 'Efectivo',
  selectedMember: null,
  setAmount: () => undefined,
  setDateFrom: () => undefined,
  setDateTo: () => undefined,
  setMembers: () => undefined,
  setMemberStatus: () => undefined,
  setPaymentMethod: () => undefined,
  setSelectedMember: () => undefined
}

const CreateSubscriptionContext = createContext<CreateSubscriptionContextType>(INITIAL_STATE)
const Provider = CreateSubscriptionContext.Provider

const CreateSubscriptionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [amount, setAmount] = useState<number>(INITIAL_STATE.amount)
  const [dateFrom, setDateFrom] = useState<Dayjs | null>(INITIAL_STATE.dateFrom)
  const [dateTo, setDateTo] = useState<Dayjs | null>(INITIAL_STATE.dateTo)
  const [members, setMembers] = useState<Member[]>(INITIAL_STATE.members)
  const [memberStatus, setMemberStatus] = useState<MemberStatus>(INITIAL_STATE.memberStatus)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(INITIAL_STATE.paymentMethod)
  const [selectedMember, setSelectedMember] = useState<Member | null>(INITIAL_STATE.selectedMember)

  return <Provider
    value={{
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
    }}
  >
    {children}
  </Provider>
}

export type { CreateSubscriptionContextType, CreationStep }
export { CreateSubscriptionProvider, CreateSubscriptionContext };