import { MemberListContext } from "../contexts/MemberListContext.tsx";
import { SetStateAction, useContext } from "react";
import { Member } from "../../common/types/members";
import axios, { AxiosResponse } from "axios";
import { PaginatedApiResponse } from "../../common/types/api";

// Interface that should be return by the hook
interface MemberListHooks {
  currentPage: PaginatedApiResponse<Member>,
  idToDelete: string | null,
  numberPage: number,
  changeNumberPage: (numberPage: SetStateAction<number>) => void,
  changeIdToDelete: (id: SetStateAction<string | null>) => void,
  deleteMemberById: (id: string) => Promise<void>,
  findAllMembers: () => void
}

export const useMemberList = (): MemberListHooks => {
  const { currentPage, setCurrentPage, numberPage, setNumberPage, setIdToDelete, idToDelete } = useContext(MemberListContext)

  const findAllMembers = async () => {
    const response: AxiosResponse<PaginatedApiResponse<Member>> = await axios.get(`http://localhost:3000/members?_page=${numberPage}&_per_page=10`)
    setCurrentPage(response.data)
  }

  const changeNumberPage = async (numberPage: SetStateAction<number>) => {
    setNumberPage(numberPage)
  }

  const changeIdToDelete = async (id: SetStateAction<string | null>) => {
    setIdToDelete(id)
  }

  const deleteMemberById = async (id: string) => {
    await axios.delete(`http://localhost:3000/members/${id}`)
  }

  return {
    currentPage,
    idToDelete,
    numberPage,
    changeIdToDelete,
    changeNumberPage,
    deleteMemberById,
    findAllMembers
  }
}

