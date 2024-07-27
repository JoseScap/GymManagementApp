import {createContext, Dispatch, PropsWithChildren, SetStateAction, useState} from "react";
import {Member} from "../../common/types/members";

type MemberListContextType = {
  members: Member[],
  setMembers: Dispatch<SetStateAction<Member[]>>,
}

const MemberListContext = createContext<MemberListContextType>({
  members: [],
  setMembers: () => undefined
})
const Provider = MemberListContext.Provider

const MemberListProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>([])

  return (
      <Provider
        value={{
          members,
          setMembers,
        }}
      >
        {children}
      </Provider>
    )
}

export type { MemberListContextType }
export { MemberListProvider, MemberListContext };