import {Member} from "../../common/types/members";
import {useState} from "react";
import axios, {AxiosResponse} from "axios";

interface CreateSubscriptionHooks {
  members: Member[],
  selectedMember: Member | null
  changeSelectedMember: (member: Member) => void
  findAllMembers: () => Promise<void>
}

export const useCreateSubscription = (): CreateSubscriptionHooks => {
  const [members, setMembers] = useState<Member[]>([])
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)

  const findAllMembers = async () => {
    const response: AxiosResponse<Member[]> = await axios.get(`http://localhost:3000/members`)
    setMembers(response.data)
  }

  const changeSelectedMember = (member: Member): void => {
    setSelectedMember(member)
  }

  return {
    members,
    selectedMember,
    changeSelectedMember,
    findAllMembers
  }
}