import { ClassListContext } from "../contexts/ClassContext.tsx";
import { SetStateAction, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { PaginatedApiResponse } from "../../common/types/api";
import { GymClass } from "../../common/types/gymClass";
import { toast } from "react-toastify";

// Interface that should be return by the hook
interface ClassListHooks {
  classes: GymClass[]
  hasMore: boolean
  idToDelete: string,
  create: boolean,
  changeIdToDelete: (id: SetStateAction<string>) => void,
  deleteClassById: (id: string, isCanceled: boolean) => Promise<void>
  createClass: (data: any) => Promise<void>
  setCreate: React.Dispatch<React.SetStateAction<boolean>>
  findNextPage: () => void
}

export const useClassListHooks = (): ClassListHooks => {
  const { currentPage, classes, setClasses, setCurrentPage, idToDelete, setIdToDelete, create, setCreate, hasMore, setHasMore } = useContext(ClassListContext)

  const findNextPage = async () => {
    const nextPage = currentPage + 1
    const response: AxiosResponse<PaginatedApiResponse<GymClass>> = await axios.get(`http://localhost:3000/classes/find-paginated?page=${nextPage}`)
    setClasses([...classes, ...response.data.data])
    setCurrentPage(nextPage)
    setHasMore(!!response.data.next)
    if (!response.data.next) toast.success('No hay más clases para cargar')
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

  return {
    classes,
    hasMore,
    idToDelete,
    create,
    changeIdToDelete,
    deleteClassById,
    createClass,
    setCreate,
    findNextPage,
  }
}

