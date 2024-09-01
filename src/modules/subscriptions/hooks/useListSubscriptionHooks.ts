import { ListSubscriptionContext } from "../contexts/ListSubscriptionContext";
import { useContext } from "react";
import { Subscription } from "../../common/types/subscription";
import axios, { AxiosResponse } from "axios";
import { PaginatedApiResponse } from "../../common/types/api";
import { toast } from "react-toastify";

// Interface that should be return by the hook
interface MemberListHooks {
  hasMore: boolean
  subscriptions: Subscription[],
  idToDelete: string,
  findNextPage: () => void
  deleteSubscriptionById: (id: string, isCanceled: boolean) => void
  changeIdToDelete: (id: string) => void
  filterByFullname: (fullName: string) => void
  filterByDni: (dni: string) => void
  filterByDate: (dateFrom: string, dateTo: string) => void
}

export const useListSubscription = (): MemberListHooks => {
  const {
    currentPage,
    hasMore,
    subscriptions,
    idToDelete,
    setCurrentPage,
    setHasMore,
    setSubscriptions,
    setIdToDelete,
  } = useContext(ListSubscriptionContext)

  const findNextPage = async () => {
    const nextPage = currentPage + 1
    const response : AxiosResponse<PaginatedApiResponse<Subscription>> = await axios.get(`http://localhost:3000/subscriptions/find-paginated?embedMember=true&page=${nextPage}`)
    setCurrentPage(nextPage)
    setHasMore(!!response.data.next)
    setSubscriptions([...subscriptions, ...response.data.data])
    if (!response.data.next) toast.success('No hay más suscripciones para cargar')
  }

  const deleteSubscriptionById = async (id: string, isCanceled: boolean) => {
    if(isCanceled) await axios.delete(`http://localhost:3000/subscriptions/restore/${id}`)
    else await axios.delete(`http://localhost:3000/subscriptions/remove/${id}`)
  }

  const changeIdToDelete = async (id: string) => {
    setIdToDelete(id)
  }

  const filterByFullname = async (fullName: string) => {
    const response : AxiosResponse<PaginatedApiResponse<Subscription>> = await axios.get(`http://localhost:3000/subscriptions/find-paginated?embedMember=true&page=1&fullname=${fullName}`)
    setCurrentPage(1)
    setHasMore(!!response.data.next)
    setSubscriptions(response.data.data)
  }

  const filterByDni = async (dni: string) => {
    const response : AxiosResponse<PaginatedApiResponse<Subscription>> = await axios.get(`http://localhost:3000/subscriptions/find-paginated?embedMember=true&page=1&dni=${dni}`)
    setCurrentPage(1)
    setHasMore(!!response.data.next)
    setSubscriptions(response.data.data)
  }

  const filterByDate = async (dateFrom: string, dateTo: string) => {
    const response : AxiosResponse<PaginatedApiResponse<Subscription>> = await axios.get(`http://localhost:3000/subscriptions/find-paginated?embedMember=true&page=1&dateFrom=${dateFrom}&dateTo=${dateTo}`)
    setCurrentPage(1)
    setHasMore(!!response.data.next)
    setSubscriptions(response.data.data)
  }

  return {
    hasMore,
    subscriptions,
    findNextPage,
    deleteSubscriptionById,
    changeIdToDelete,
    idToDelete,
    filterByFullname,
    filterByDni,
    filterByDate
  }
}

