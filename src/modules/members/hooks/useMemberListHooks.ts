import {MemberListContext} from "../contexts/MemberListContext.tsx";
import {SetStateAction, useContext} from "react";
import {Member} from "../../common/types/members";
import axios, {AxiosResponse} from "axios";
import {PaginatedApiResponse} from "../../common/types/api";

// Interface that should be return by the hook
interface MemberListHooks {
  currentPage: PaginatedApiResponse<Member>,
  numberPage: number,
  changeNumberPage: (numberPage: SetStateAction<number>) => void,
  findAllMembers: () => void
}

export const useMemberList = (): MemberListHooks => {
  const { currentPage, setCurrentPage, numberPage, setNumberPage} = useContext(MemberListContext)

  const findAllMembers = async () => {
    const response: AxiosResponse<PaginatedApiResponse<Member>> = await axios.get(`http://localhost:3000/members?_page=${numberPage}&_per_page=10`)
    setCurrentPage(response.data)
  }

  const changeNumberPage = async (numberPage: SetStateAction<number>) => {
    setNumberPage(numberPage)
  }

  return {
    currentPage,
    numberPage,
    changeNumberPage,
    findAllMembers
  }
}

