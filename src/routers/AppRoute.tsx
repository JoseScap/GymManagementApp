import { ReactNode } from "react"
import { Page } from "./AppRouterTypes"
import { useAppRouterContext } from "./useRouterHooks"

interface Props {
  page: Page
  element: ReactNode
}

const AppRoute: React.FC<Props> = ({ page, element }) => {
  const { page: value } = useAppRouterContext()

  if (page === value) return element
  return <></>
}

export { AppRoute }