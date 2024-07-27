import {MemberListContext, MemberListContextType} from "../contexts/MemberListContext.tsx";
import {useContext} from "react";

const useMemberListContext = (): MemberListContextType => {
  if (!MemberListContext) {
    throw new Error("useMemberListContext must be used within a MemberListProvider")
  }

  return useContext(MemberListContext)
}

export default useMemberListContext;