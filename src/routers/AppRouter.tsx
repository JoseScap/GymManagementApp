import PageLayout from "../modules/common/layouts/PageLayout.tsx";
import { createContext, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from "react";
import HomePage from "../modules/core/pages/HomePage.tsx";
import WipPage from "../modules/core/pages/WipPage.tsx";
import MemberListPage from "../modules/members/pages/MemberListPage.tsx";
import CreateMemberPage from "../modules/members/pages/CreateMemberPage.tsx";
import { MemberListProvider } from "../modules/members/contexts/MemberListContext.tsx";
import { CreateMemberProvider } from "../modules/members/contexts/CreateMemberContext.tsx";
import MemberPage from "../modules/members/pages/MemberPage.tsx";
import { CreateSubscriptionProvider } from "../modules/subscriptions/contexts/CreateSubscriptionContext.tsx";
import CreateSubscriptionPage from "../modules/subscriptions/pages/CreateSubscriptionPage.tsx";
import { ListSubscriptionProvider } from "../modules/subscriptions/contexts/ListSubscriptionContext.tsx";
import ListSubscriptionPage from "../modules/subscriptions/pages/ListSubscriptionPage.tsx";

type AppRouterContextType = {
  page: Page
  params: Params
  navigate: (page: Page, params?: Params) => void
}

type Params = Record<string, string | undefined>
type Page = CorePage | MemberPage | SubscriptionPage
type CorePage = 'Core:Home' | 'Core:Dashboard' | 'Core:Notification'
type MemberPage = 'Member:List' | 'Member:Create' | 'Member:Detail'
type SubscriptionPage = 'Subscription:List' | 'Subscription:Create' | 'Subscription:Detail'

const INITIAL_CONTEXT_VALUE: AppRouterContextType = {
  page: 'Core:Home',
  params: {},
  navigate: () => undefined
}

export const AppRouterContext = createContext<AppRouterContextType>(INITIAL_CONTEXT_VALUE)
export const AppRouterProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [page, setPage] = useState<Page>(INITIAL_CONTEXT_VALUE.page)
  const [params, setParams] = useState<Params>(INITIAL_CONTEXT_VALUE.params)

  const navigate = (page: Page, params: Params = {}) => {
    setPage(page)
    setParams(params)
  }

  return (
    <AppRouterContext.Provider
      value={{
        page,
        params,
        navigate
      }}
    >
      {children}
    </AppRouterContext.Provider>
  )
}

export const useNavigate = () => {
  const { navigate } = useContext(AppRouterContext)
  return navigate
}

export const useParams = () => {
  const { params } = useContext(AppRouterContext)
  return params
}

export const AppRouter: React.FC = () => {
  const { page } = useContext(AppRouterContext)

  return <PageLayout>
    {page === 'Core:Home' && <HomePage />}
    {page === 'Core:Dashboard' && <WipPage />}
    {page === 'Core:Notification' && <WipPage />}
    {page === 'Member:List' && <MemberListProvider><MemberListPage /></MemberListProvider>}
    {page === 'Member:Create' && <CreateMemberProvider><CreateMemberPage /></CreateMemberProvider>}
    {page === 'Member:Detail' && <MemberPage />}
    {page === 'Subscription:Create' && <CreateSubscriptionProvider><CreateSubscriptionPage /></CreateSubscriptionProvider>}
    {page === 'Subscription:List' && <ListSubscriptionProvider><ListSubscriptionPage /></ListSubscriptionProvider>}
  </PageLayout>
}