import { PropsWithChildren, useState } from "react"
import AppRouterContext, { INITIAL_CONTEXT_VALUE } from "./AppRouterContext"
import { Page, Params } from "./AppRouterTypes"

const AppRouterProvider: React.FC<PropsWithChildren> = ({ children }) => {
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

export default AppRouterProvider