import {createContext, PropsWithChildren, SetStateAction, useState} from "react";
import {Member} from "../../common/types/members";

type MemberListContextType = {
  members: Member[],
  changeMembers: (members: SetStateAction<Member[]>) => void
}

const MemberListContext = createContext<MemberListContextType>({
  members: [],
  changeMembers: () => undefined
})
const Provider = MemberListContext.Provider

const MemberListProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [members, setMembers] = useState<Member[]>([])

  const changeMembers = (members: SetStateAction<Member[]>) => {
    setMembers(members)
  }

  return (
      <Provider
        value={{
          members,
          changeMembers,
        }}
      >
        {children}
      </Provider>
    )
}

export type { MemberListContextType }
export { MemberListProvider, MemberListContext };