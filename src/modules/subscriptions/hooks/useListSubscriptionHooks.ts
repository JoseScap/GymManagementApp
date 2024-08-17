import { ListSubscriptionContext } from "../contexts/ListSubscriptionContext";
import { SetStateAction, useContext } from "react";
import { Subscription } from "../../common/types/subscription";
import axios, { AxiosResponse } from "axios";
import { PaginatedApiResponse } from "../../common/types/api";

// Interface that should be return by the hook
interface MemberListHooks {
  currentPage: PaginatedApiResponse<Subscription>,
  numberPage: number,
  changeNumberPage: (numberPage: SetStateAction<number>) => void,
  findAllSubscription: () => void
}

export const useListSubscription = (): MemberListHooks => {
  const { currentPage, setCurrentPage, numberPage, setNumberPage } = useContext(ListSubscriptionContext)

  const findAllSubscription = async () => {
    const response : AxiosResponse<PaginatedApiResponse<Subscription>> = await axios.get(`http://localhost:3000/subscriptions?embedMember=true&page=${numberPage}`)
    setCurrentPage(response.data)
  }

  const changeNumberPage = async (numberPage: SetStateAction<number>) => {
    setNumberPage(numberPage)
  }

  return {
    currentPage,
    numberPage,
    changeNumberPage,
    findAllSubscription
  }
}

