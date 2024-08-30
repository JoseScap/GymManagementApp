import { ListSubscriptionContext } from "../contexts/ListSubscriptionContext";
import { useContext } from "react";
import { Subscription } from "../../common/types/subscription";
import axios, { AxiosResponse } from "axios";
import { PaginatedApiResponse } from "../../common/types/api";

// Interface that should be return by the hook
interface MemberListHooks {
  hasMore: boolean
  subscriptions: Subscription[]
  findNextPage: () => void
  deleteSubscriptionById: (id: string, isCanceled: boolean) => void
}

export const useListSubscription = (): MemberListHooks => {
  const {
    currentPage,
    hasMore,
    subscriptions,
    setCurrentPage,
    setHasMore,
    setSubscriptions
  } = useContext(ListSubscriptionContext)

  const findNextPage = async () => {
    const nextPage = currentPage + 1
    const response : AxiosResponse<PaginatedApiResponse<Subscription>> = await axios.get(`http://localhost:3000/subscriptions/find-paginated?embedMember=true&page=${nextPage}`)
    setCurrentPage(nextPage)
    setHasMore(!!response.data.next)
    setSubscriptions([...subscriptions, ...response.data.data])
  }

  const deleteSubscriptionById = async (id: string, isCanceled: boolean) => {
    if(isCanceled) await axios.delete(`http://localhost:3000/subscriptions/restore/${id}`)
    else await axios.delete(`http://localhost:3000/subscriptions/remove/${id}`)
  }

  return {
    hasMore,
    subscriptions,
    findNextPage,
    deleteSubscriptionById
  }
}

