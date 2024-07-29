import { Member, MemberStatus } from "../../common/types/members";
import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";

type CreateSubscriptionContextType = {
  creationStep: CreationStep
  members: Member[]
  memberStatus: MemberStatus
  selectedMember: Member | null
  setCreationStep: Dispatch<SetStateAction<CreationStep>>
  setMembers: Dispatch<SetStateAction<Member[]>>
  setMemberStatus: Dispatch<SetStateAction<MemberStatus>>
  setSelectedMember: Dispatch<SetStateAction<Member | null>>
}

type CreationStep = 'Member' | 'Subscription'

const INITIAL_STATE: CreateSubscriptionContextType = {
  creationStep: 'Member',
  members: [],
  memberStatus: 'Inactivo',
  selectedMember: null,
  setCreationStep: () => undefined,
  setMembers: () => undefined,
  setMemberStatus: () => undefined,
  setSelectedMember: () => undefined
}

const CreateSubscriptionContext = createContext<CreateSubscriptionContextType>(INITIAL_STATE)
const Provider = CreateSubscriptionContext.Provider

const CreateSubscriptionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [creationStep, setCreationStep] = useState<CreationStep>(INITIAL_STATE.creationStep)
  const [members, setMembers] = useState<Member[]>(INITIAL_STATE.members)
  const [memberStatus, setMemberStatus] = useState<MemberStatus>(INITIAL_STATE.memberStatus)
  const [selectedMember, setSelectedMember] = useState<Member | null>(INITIAL_STATE.selectedMember)

  return <Provider
    value={{
      creationStep,
      members,
      memberStatus,
      selectedMember,
      setCreationStep,
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