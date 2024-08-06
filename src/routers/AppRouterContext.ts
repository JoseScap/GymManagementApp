import { createContext } from "react"
import { Page, Params } from "./AppRouterTypes"

type AppRouterContextType = {
  page: Page
  params: Params
  navigate: (page: Page, params?: Params) => void
}

export const INITIAL_CONTEXT_VALUE: AppRouterContextType = {
  page: 'Core:Home',
  params: {},
  navigate: () => undefined
}

export const AppRouterContext = createContext<AppRouterContextType>(INITIAL_CONTEXT_VALUE)
export default AppRouterContext