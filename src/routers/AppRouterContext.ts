import { createContext } from "react"

type AppRouterContextType = {
    page: Page
    params: Params
    navigate: (page: Page, params?: Params) => void
}

export type Params = Record<string, string | undefined>
export type Page = CorePage | MemberPage | SubscriptionPage
type CorePage = 'Core:Home' | 'Core:Dashboard' | 'Core:Notification'
type MemberPage = 'Member:List' | 'Member:Create' | 'Member:Detail'
type SubscriptionPage = 'Subscription:List' | 'Subscription:Create' | 'Subscription:Detail'

export const INITIAL_CONTEXT_VALUE: AppRouterContextType = {
    page: 'Core:Home',
    params: {},
    navigate: () => undefined
}

export const AppRouterContext = createContext<AppRouterContextType>(INITIAL_CONTEXT_VALUE)
