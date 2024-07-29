import { Member, MemberStatus } from "../../common/types/members";
import { SetStateAction, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { CreateSubscriptionContext, CreationStep } from "../contexts/CreateSubscriptionContext.tsx";
import {Dayjs} from "dayjs";

interface CreateSubscriptionHooks {
  creationStep: CreationStep
  dateFrom: Dayjs
  members: Member[]
  memberStatus: MemberStatus,
  selectedMember: Member | null
  changeCreationStep: (step: SetStateAction<CreationStep>) => void
  changeDateFrom: (date: Dayjs) => void
  changeMemberStatus: (memberStatus: MemberStatus) => void
  changeSelectedMember: (member: Member) => void
  findAllMembers: () => Promise<void>
}

export const useCreateSubscription = (): CreateSubscriptionHooks => {
  const {
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
  } = useContext(CreateSubscriptionContext)

  const findAllMembers = async () => {
    const response: AxiosResponse<Member[]> = await axios.get(`http://localhost:3000/members`)
    setMembers(response.data)
  }

  const changeCreationStep = (step: SetStateAction<CreationStep>) => {
    setCreationStep(step)
  }

  const changeDateFrom = (date: Dayjs) => {
    setDateFrom(date)
  }

  const changeMemberStatus = (memberStatus: MemberStatus) => {
    setMemberStatus(memberStatus)
  }

  const changeSelectedMember = (member: Member) => {
    setSelectedMember(member)
  }

  return {
    creationStep,
    dateFrom,
    members,
    memberStatus,
    selectedMember,
    changeCreationStep,
    changeDateFrom,
    changeMemberStatus,
    changeSelectedMember,
    findAllMembers
  }
}