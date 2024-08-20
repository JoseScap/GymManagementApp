import { ListSubscriptionContext } from "../contexts/ListSubscriptionContext";
import { useContext } from "react";
import { Subscription } from "../../common/types/subscription";
import axios, { AxiosResponse } from "axios";
import { PaginatedApiResponse } from "../../common/types/api";

// Interface that should be return by the hook
interface MemberListHooks {
  subscriptions: Subscription[]
  findNextPage: () => void
}

export const useListSubscription = (): MemberListHooks => {
  const {
    currentPage,
    subscriptions,
    setCurrentPage,
    setSubscriptions
  } = useContext(ListSubscriptionContext)

  const findNextPage = async () => {
    const nextPage = currentPage + 1
    const response : AxiosResponse<PaginatedApiResponse<Subscription>> = await axios.get(`http://localhost:3000/subscriptions/find-paginated?embedMember=true&page=${nextPage}`)
    setCurrentPage(nextPage)
    setSubscriptions([...subscriptions, ...response.data.data])
  }

  return {
    subscriptions,
    findNextPage
  }
}

