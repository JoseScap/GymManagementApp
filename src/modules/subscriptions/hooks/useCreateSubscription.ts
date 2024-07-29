import { Member, MemberStatus } from "../../common/types/members";
import { SetStateAction, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { CreateSubscriptionContext, CreationStep } from "../contexts/CreateSubscriptionContext.tsx";

interface CreateSubscriptionHooks {
  creationStep: CreationStep
  members: Member[]
  memberStatus: MemberStatus,
  selectedMember: Member | null
  changeCreationStep: (step: SetStateAction<CreationStep>) => void
  changeMemberStatus: (memberStatus: MemberStatus) => void
  changeSelectedMember: (member: Member) => void
  findAllMembers: () => Promise<void>
}

export const useCreateSubscription = (): CreateSubscriptionHooks => {
  const {
    creationStep,
    members,
    memberStatus,
    selectedMember,
    setCreationStep,
    setMembers,
    setMemberStatus,
    setSelectedMember
  } = useContext(CreateSubscriptionContext)

  const findAllMembers = async () => {
    const response: AxiosResponse<Member[]> = await axios.get(`http://localhost:3000/members`)
    setMembers(response.data)
  }

  const changeCreationStep = (step: SetStateAction<CreationStep>) => {
    setCreationStep(step)
  }

  const changeMemberStatus = (memberStatus: MemberStatus) => {
    setMemberStatus(memberStatus)
  }

  const changeSelectedMember = (member: Member) => {
    setSelectedMember(member)
  }

  return {
    creationStep,
    members,
    memberStatus,
    selectedMember,
    changeCreationStep,
    changeMemberStatus,
    changeSelectedMember,
    findAllMembers
  }
}