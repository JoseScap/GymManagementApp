import {MemberListContext} from "../contexts/MemberListContext.tsx";
import {useContext} from "react";
import {Member} from "../../common/types/members";
import axios, {AxiosResponse} from "axios";
import {PaginatedApiResponse} from "../../common/types/api";

// Interface that should be return by the hook
interface MemberListHooks {
  currentPage: PaginatedApiResponse<Member>,
  numberPage: number,
  findAllMembers: (page?: number) => void
}

export const useMemberList = (): MemberListHooks => {
  const { currentPage, setCurrentPage, numberPage, setNumberPage } = useContext(MemberListContext)

  const findAllMembers = async (page: number = 1) => {
    if (page < 1) page = 1;

    const response: AxiosResponse<PaginatedApiResponse<Member>> = await axios.get(`http://localhost:3000/members?_page=${page}&_per_page=10`)
    setCurrentPage(response.data)
    setNumberPage(page)
  }

  return {
    currentPage,
    numberPage,
    findAllMembers
  }
}

