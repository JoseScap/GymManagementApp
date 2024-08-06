import { useContext } from "react"
import AppRouterContext from "./AppRouterContext"

export const useAppRouterContext = () => {
  return useContext(AppRouterContext)
}

export const useNavigate = () => {
  const { navigate } = useAppRouterContext()
  return navigate
}

export const useParams = () => {
  const { params } = useAppRouterContext()
  return params
}