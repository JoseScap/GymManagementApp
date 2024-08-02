import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { Subscription } from "../../common/types/subscription";
import { PaginatedApiResponse } from "../../common/types/api";

type ListSubscriptionContextType = {
  currentPage: PaginatedApiResponse<Subscription>,
  numberPage: number,
  setCurrentPage: Dispatch<SetStateAction<PaginatedApiResponse<Subscription>>>,
  setNumberPage: Dispatch<SetStateAction<number>>,
}

const INITIAL_STATE: ListSubscriptionContextType = {
  currentPage: {
    data: [],
    items: 0,
    pages: 1,
    first: 1,
    last: 1,
    next: null,
    prev: null,
  },
  numberPage: 1,
  setCurrentPage: () => undefined,
  setNumberPage: () => undefined,
}

const ListSubscriptionContext = createContext<ListSubscriptionContextType>(INITIAL_STATE)
const Provider = ListSubscriptionContext.Provider

const ListSubscriptionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PaginatedApiResponse<Subscription>>(INITIAL_STATE.currentPage)
  const [numberPage, setNumberPage] = useState<number>(INITIAL_STATE.numberPage)

  return (
    <Provider
      value={{
        currentPage,
        numberPage,
        setCurrentPage,
        setNumberPage
      }}
    >
      {children}
    </Provider>
  )
}

export type { ListSubscriptionContextType }
export { ListSubscriptionProvider, ListSubscriptionContext };