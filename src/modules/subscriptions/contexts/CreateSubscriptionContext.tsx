import { Member, MemberStatus } from "../../common/types/members";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import dayjs, {Dayjs} from "dayjs";

type CreateSubscriptionContextType = {
  creationStep: CreationStep
  dateFrom: Dayjs
  members: Member[]
  memberStatus: MemberStatus
  selectedMember: Member | null
  setCreationStep: Dispatch<SetStateAction<CreationStep>>
  setDateFrom: Dispatch<SetStateAction<Dayjs>>
  setMembers: Dispatch<SetStateAction<Member[]>>
  setMemberStatus: Dispatch<SetStateAction<MemberStatus>>
  setSelectedMember: Dispatch<SetStateAction<Member | null>>
}

type CreationStep = 'Member' | 'Subscription'

const INITIAL_STATE: CreateSubscriptionContextType = {
  creationStep: 'Member',
  dateFrom: new dayjs(),
  members: [],
  memberStatus: 'Inactivo',
  selectedMember: null,
  setCreationStep: () => undefined,
  setDateFrom: () => undefined,
  setMembers: () => undefined,
  setMemberStatus: () => undefined,
  setSelectedMember: () => undefined
}

const CreateSubscriptionContext = createContext<CreateSubscriptionContextType>(INITIAL_STATE)
const Provider = CreateSubscriptionContext.Provider

const CreateSubscriptionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [creationStep, setCreationStep] = useState<CreationStep>(INITIAL_STATE.creationStep)
  const [dateFrom, setDateFrom] = useState<Dayjs>(INITIAL_STATE.dateFrom)
  const [members, setMembers] = useState<Member[]>(INITIAL_STATE.members)
  const [memberStatus, setMemberStatus] = useState<MemberStatus>(INITIAL_STATE.memberStatus)
  const [selectedMember, setSelectedMember] = useState<Member | null>(INITIAL_STATE.selectedMember)

  return <Provider
    value={{
      creationStep,
      dateFrom,
      members,
      memberStatus,
      selectedMember,
      setCreationStep,
      setDateFrom,
      setMembers,
      setMemberStatus,
      setSelectedMember
    }}
  >
    {children}
  </Provider>
}

export type { CreateSubscriptionContextType, CreationStep }
export { CreateSubscriptionProvider, CreateSubscriptionContext };