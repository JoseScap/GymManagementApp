import {Member} from "../../common/types/members";
import {useState} from "react";
import axios, {AxiosResponse} from "axios";

interface CreateSubscriptionHooks {
  members: Member[],
  findAllMembers: () => Promise<void>
}

export const useCreateSubscription = (): CreateSubscriptionHooks => {
  const [members, setMembers] = useState<Member[]>([])

  const findAllMembers = async () => {
    const response: AxiosResponse<Member[]> = await axios.get(`http://localhost:3000/members`)
    setMembers(response.data)
  }

  return {
    members,
    findAllMembers
  }
}