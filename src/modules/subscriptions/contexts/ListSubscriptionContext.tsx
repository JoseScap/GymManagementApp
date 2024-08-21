import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { Subscription } from "../../common/types/subscription";

type ListSubscriptionContextType = {
  currentPage: number
  subscriptions: Subscription[]  
  setCurrentPage: Dispatch<SetStateAction<number>>
  setSubscriptions: Dispatch<SetStateAction<Subscription[]>>
}

const INITIAL_STATE: ListSubscriptionContextType = {
  currentPage: 0,
  subscriptions: [],
  setCurrentPage: () => undefined,
  setSubscriptions: () => undefined
}

const ListSubscriptionContext = createContext<ListSubscriptionContextType>(INITIAL_STATE)
const Provider = ListSubscriptionContext.Provider

const ListSubscriptionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_STATE.currentPage)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_STATE.subscriptions)

  return (
    <Provider
      value={{
        currentPage,
        subscriptions,
        setCurrentPage,
        setSubscriptions
      }}
    >
      {children}
    </Provider>
  )
}

export type { ListSubscriptionContextType }
export { ListSubscriptionProvider, ListSubscriptionContext };