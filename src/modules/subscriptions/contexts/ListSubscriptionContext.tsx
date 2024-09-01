import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { Subscription } from "../../common/types/subscription";

type ListSubscriptionContextType = {
  currentPage: number
  hasMore: boolean
  idToDelete: string
  subscriptions: Subscription[]  
  setCurrentPage: Dispatch<SetStateAction<number>>
  setHasMore: Dispatch<SetStateAction<boolean>>
  setSubscriptions: Dispatch<SetStateAction<Subscription[]>>
  setIdToDelete: Dispatch<SetStateAction<string>>
}

const INITIAL_STATE: ListSubscriptionContextType = {
  currentPage: 0,
  hasMore: true,
  subscriptions: [],
  idToDelete: '',
  setCurrentPage: () => undefined,
  setHasMore: () => undefined,
  setSubscriptions: () => undefined,
  setIdToDelete: () => undefined
}

const ListSubscriptionContext = createContext<ListSubscriptionContextType>(INITIAL_STATE)
const Provider = ListSubscriptionContext.Provider

const ListSubscriptionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_STATE.currentPage)
  const [hasMore, setHasMore] = useState<boolean>(INITIAL_STATE.hasMore)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_STATE.subscriptions)
  const [idToDelete, setIdToDelete] = useState<string>(INITIAL_STATE.idToDelete)

  return (
    <Provider
      value={{
        currentPage,
        hasMore,
        subscriptions,
        idToDelete,
        setCurrentPage,
        setHasMore,
        setSubscriptions,
        setIdToDelete
      }}
    >
      {children}
    </Provider>
  )
}

export type { ListSubscriptionContextType }
export { ListSubscriptionProvider, ListSubscriptionContext };