import {Member} from "../../common/types/members";
import {createContext, Dispatch, PropsWithChildren, SetStateAction, useState} from "react";

type CreateSubscriptionContextType = {
  creationStep: CreationStep
  members: Member[]
  selectedMember: Member | null
  setCreationStep: Dispatch<SetStateAction<CreationStep>>
  setMembers: Dispatch<SetStateAction<Member[]>>
  setSelectedMember: Dispatch<SetStateAction<Member>>
}

type CreationStep = 'Member' | 'Subscription'

const INITIAL_STATE: CreateSubscriptionContextType = {
  creationStep: 'Member',
  members: [],
  selectedMember: null,
  setCreationStep: () => undefined,
  setMembers: () => undefined,
  setSelectedMember: () => undefined
}

const CreateSubscriptionContext = createContext<CreateSubscriptionContextType>(INITIAL_STATE)
const Provider = CreateSubscriptionContext.Provider

const CreateSubscriptionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [creationStep, setCreationStep] = useState<CreationStep>(INITIAL_STATE.creationStep)
  const [members, setMembers] = useState<Member[]>(INITIAL_STATE.members)
  const [selectedMember, setSelectedMember] = useState<Member>(INITIAL_STATE.selectedMember)

  return <Provider
    value={{
      creationStep,
      members,
      selectedMember,
      setCreationStep,
      setMembers,
      setSelectedMember
    }}
  >
    {children}
  </Provider>
}

export type { CreateSubscriptionContextType, CreationStep }
export { CreateSubscriptionProvider, CreateSubscriptionContext };