import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { Member } from "../../common/types/members";
import { PaginatedApiResponse } from "../../common/types/api";

type MemberListContextType = {
  currentPage: PaginatedApiResponse<Member>,
  numberPage: number,
  idToDelete: string | null,
  setCurrentPage: Dispatch<SetStateAction<PaginatedApiResponse<Member>>>,
  setIdToDelete: Dispatch<SetStateAction<string | null>>,
  setNumberPage: Dispatch<SetStateAction<number>>,
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
  idToDelete: null,
  numberPage: 1,
  setCurrentPage: () => undefined,
  setIdToDelete: () => undefined,
  setNumberPage: () => undefined,
}

const MemberListContext = createContext<MemberListContextType>(INITIAL_STATE)
const Provider = MemberListContext.Provider

const MemberListProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PaginatedApiResponse<Member>>(INITIAL_STATE.currentPage)
  const [numberPage, setNumberPage] = useState<number>(INITIAL_STATE.numberPage)
  const [idToDelete, setIdToDelete] = useState<string | null>(INITIAL_STATE.idToDelete)

  return (
    <Provider
      value={{
        currentPage,
        idToDelete,
        numberPage,
        setCurrentPage,
        setIdToDelete,
        setNumberPage
      }}
    >
      {children}
    </Provider>
  )
}

export type { MemberListContextType }
export { MemberListProvider, MemberListContext };