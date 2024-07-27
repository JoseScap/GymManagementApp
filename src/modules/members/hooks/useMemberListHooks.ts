import {MemberListContext} from "../contexts/MemberListContext.tsx";
import {useContext} from "react";
import {Member} from "../../common/types/members";
import axios from "axios";

// Interface that should be return by the hook
interface MemberListHooks {
  members: Member[],
  findAllMembers: () => void
}

export const useMemberList = (): MemberListHooks => {
  const { members, setMembers } = useContext(MemberListContext)

  const findAllMembers = async () => {
    const response = await axios.get<Member[]>(`http://localhost:3000/members`)
    console.log(response.data)
    setMembers(response.data);
  }

  return {
    members,
    findAllMembers
  }
}

