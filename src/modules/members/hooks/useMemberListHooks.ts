import {MemberListContext} from "../contexts/MemberListContext.tsx";
import {useContext} from "react";
import {Member} from "../../common/types/members";
import axios, {AxiosResponse} from "axios";
import {PaginatedApiResponse} from "../../common/types/api";

// Interface that should be return by the hook
interface MemberListHooks {
  currentPage: PaginatedApiResponse<Member>,
  findAllMembers: (page?: number, perPage?: number) => void
}

export const useMemberList = (): MemberListHooks => {
  const { currentPage, setCurrentPage } = useContext(MemberListContext)

  const findAllMembers = async (page: number = 1, perPage: number = 10) => {
    if (page < 1) page = 1;
    if (perPage < 10) perPage = 10;

    const response: AxiosResponse<PaginatedApiResponse<Member>> = await axios.get(`http://localhost:3000/members?_page=${page}&_per_page=${perPage}`)
    setCurrentPage(response.data)
  }

  return {
    currentPage,
    findAllMembers
  }
}

