import { ClassListContext } from "../contexts/ClassContext.tsx";
import { SetStateAction, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { PaginatedApiResponse } from "../../common/types/api";
import { GymClass } from "../../common/types/gymClass";

// Interface that should be return by the hook
interface ClassListHooks {
  currentPage: PaginatedApiResponse<GymClass>,
  numberPage: number,
  idToDelete: string,
  create: boolean,
  changeNumberPage: (numberPage: SetStateAction<number>) => void,
  findAllClass: () => void
  changeIdToDelete: (id: SetStateAction<string>) => void,
  deleteClassById: (id: string, isCanceled: boolean) => Promise<void>
  createClass: (data: any) => Promise<void>
  setCreate: React.Dispatch<React.SetStateAction<boolean>>
  findNextPage: () => void
}

export const useClassListHooks = (): ClassListHooks => {
  const { currentPage, numberPage, setNumberPage, setCurrentPage, idToDelete, setIdToDelete, create, setCreate } = useContext(ClassListContext)

  const findAllClass = async () => {
    const response: AxiosResponse<PaginatedApiResponse<GymClass>> = await axios.get(`http://localhost:3000/classes/find-paginated?page=${numberPage}`)
    setCurrentPage(response.data)
  }

  const changeNumberPage = async (numberPage: SetStateAction<number>) => {
    setNumberPage(numberPage)
  }

  const changeIdToDelete = async (id: SetStateAction<string>) => {
    setIdToDelete(id)
  }

  const deleteClassById = async (id: string, isCanceled: boolean) => {
    if(isCanceled) await axios.delete(`http://localhost:3000/classes/restore/${id}?isCanceled=true`)
    else await axios.delete(`http://localhost:3000/classes/remove/${id}`)
  }

  const createClass = async (data: any) => {
    await axios.post(`http://localhost:3000/classes/create-one`, data)
  }

  const findNextPage = async () => {
    const nextPage = numberPage + 1
    const response: AxiosResponse<PaginatedApiResponse<GymClass>> = await axios.get(`http://localhost:3000/classes/find-paginated?page=${nextPage}`)
    console.log(response.data)
    setCurrentPage(response.data)

    // setCurrentPage(nextPage)
    // setSubscriptions([...subscriptions, ...response.data.data])
  }

  return {
    currentPage,
    numberPage,
    idToDelete,
    changeNumberPage,
    findAllClass,
    changeIdToDelete,
    deleteClassById,
    createClass,
    create,
    setCreate,
    findNextPage,
  }
}

