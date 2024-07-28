import {createContext, Dispatch, PropsWithChildren, SetStateAction, useState} from "react";
import {Member} from "../../common/types/members";
import {PaginatedApiResponse} from "../../common/types/api";

type MemberListContextType = {
  currentPage: PaginatedApiResponse<Member>,
  setCurrentPage: Dispatch<SetStateAction<PaginatedApiResponse<Member>>>,
}

const INITIAL_STATE: MemberListContextType = {
  currentPage: {
    data: [],
    items: 0,
    pages: 1,
    first: 1,
    last: 1,
    next: null,
    prev: null,
  },
  setCurrentPage: () => undefined
}

const MemberListContext = createContext<MemberListContextType>(INITIAL_STATE)
const Provider = MemberListContext.Provider

const MemberListProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PaginatedApiResponse<Member>>(INITIAL_STATE.currentPage)

  return (
      <Provider
        value={{
          currentPage,
          setCurrentPage
        }}
      >
        {children}
      </Provider>
    )
}

export type { MemberListContextType }
export { MemberListProvider, MemberListContext };