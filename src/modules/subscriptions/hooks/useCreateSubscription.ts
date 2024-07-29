import {Member} from "../../common/types/members";
import {SetStateAction, useContext} from "react";
import axios, {AxiosResponse} from "axios";
import {CreateSubscriptionContext, CreationStep} from "../contexts/CreateSubscriptionContext.tsx";

interface CreateSubscriptionHooks {
  creationStep: CreationStep
  members: Member[]
  selectedMember: Member | null
  changeCreationStep: (step: SetStateAction<CreationStep>) => void
  changeSelectedMember: (member: Member) => void
  findAllMembers: () => Promise<void>
}

export const useCreateSubscription = (): CreateSubscriptionHooks => {
  const {
    creationStep,
    members,
    selectedMember,
    setCreationStep,
    setMembers,
    setSelectedMember
  } = useContext(CreateSubscriptionContext)

  const findAllMembers = async () => {
    const response: AxiosResponse<Member[]> = await axios.get(`http://localhost:3000/members`)
    setMembers(response.data)
  }

  const changeCreationStep = (step: SetStateAction<CreationStep>) => {
    setCreationStep(step)
  }

  const changeSelectedMember = (member: Member): void => {
    setSelectedMember(member)
  }

  return {
    creationStep,
    members,
    selectedMember,
    changeCreationStep,
    changeSelectedMember,
    findAllMembers
  }
}