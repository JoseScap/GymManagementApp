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
  idToUpdate: string,
  changeIdToDelete: (id: SetStateAction<string>) => void,
  deleteClassById: (id: string, isCanceled: boolean) => Promise<void>
  createClass: (data: any) => Promise<void>
  setCreate: React.Dispatch<React.SetStateAction<boolean>>
  findNextPage: () => void
  changeIdToUpdate: (id: string) => void
  updateClassById: (className: string, professor: string, total: number, countAssistant: number) => Promise<void>
  filterByClassname: (className: string) => Promise<void>
  filterByProfessor: (professor: string) => Promise<void>
  filterByDate: (date: string) => Promise<void>
}

export const useClassListHooks = (): ClassListHooks => {
  const { currentPage, classes, setClasses, setCurrentPage, idToDelete, setIdToDelete, create, setCreate, hasMore, setHasMore, idToUpdate, setIdToUpdate } = useContext(ClassListContext)

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

  const changeIdToUpdate = (id: string) => {
    setIdToUpdate(id)
  }

  const updateClassById = async (className: string, professor: string, total: number, countAssistant: number) => {
    await axios.patch(`http://localhost:3000/classes/update/${idToUpdate}`, {
      className,
      professor,
      total,
      countAssistant
    })
  }

  const filterByClassname = async (className: string) => {
    const response: AxiosResponse<PaginatedApiResponse<GymClass>> = await axios.get(`http://localhost:3000/classes/find-paginated/?className=${className}`)
    setClasses(response.data.data)
    setHasMore(!!response.data.next)

  }

  const filterByProfessor = async (professor: string) => {
    const response: AxiosResponse<PaginatedApiResponse<GymClass>> = await axios.get(`http://localhost:3000/classes/find-paginated/?professor=${professor}`)
    setClasses(response.data.data)
    setHasMore(!!response.data.next)
  }

  const filterByDate = async (date: string) => {
    const response: AxiosResponse<PaginatedApiResponse<GymClass>> = await axios.get(`http://localhost:3000/classes/find-paginated/?date=${date}`)
    setClasses(response.data.data)
    setHasMore(!!response.data.next)
  }

  return {
    classes,
    hasMore,
    idToDelete,
    idToUpdate,
    create,
    changeIdToDelete,
    deleteClassById,
    createClass,
    setCreate,
    findNextPage,
    changeIdToUpdate,
    updateClassById,
    filterByClassname,
    filterByProfessor,
    filterByDate,
  }
}

