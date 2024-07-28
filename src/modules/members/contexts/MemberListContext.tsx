import {createContext, Dispatch, PropsWithChildren, SetStateAction, useState} from "react";
import {Member} from "../../common/types/members";
import {PaginatedApiResponse} from "../../common/types/api";

type MemberListContextType = {
  currentPage: PaginatedApiResponse<Member>,
  numberPage: number,
  idDelete: number,
  setCurrentPage: Dispatch<SetStateAction<PaginatedApiResponse<Member>>>,
  setDeleteId: Dispatch<SetStateAction<number>>,
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
  idDelete: 0,
  numberPage: 1,
  setCurrentPage: () => undefined,
  setDeleteId: () => undefined,
  setNumberPage: () => undefined,
}

const MemberListContext = createContext<MemberListContextType>(INITIAL_STATE)
const Provider = MemberListContext.Provider

const MemberListProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PaginatedApiResponse<Member>>(INITIAL_STATE.currentPage)
  const [numberPage, setNumberPage] = useState<number>(INITIAL_STATE.numberPage)
  const [idDelete, setDeleteId] = useState<number>(INITIAL_STATE.idDelete)

  return (
      <Provider
        value={{
          currentPage,
          idDelete,
          numberPage,
          setCurrentPage,
          setDeleteId, 
          setNumberPage
        }}
      >
        {children}
      </Provider>
    )
}

export type { MemberListContextType }
export { MemberListProvider, MemberListContext };