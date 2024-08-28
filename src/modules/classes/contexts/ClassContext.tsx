import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { PaginatedApiResponse } from "../../common/types/api";
import { GymClass } from "../../common/types/gymClass";

type ClassListContextType = {
  currentPage: PaginatedApiResponse<GymClass>
  numberPage: number
  idToDelete: string
  create: boolean
  setNumberPage: Dispatch<SetStateAction<number>>
  setCurrentPage: Dispatch<SetStateAction<PaginatedApiResponse<GymClass>>>
  setIdToDelete: Dispatch<SetStateAction<string>>
  setCreate: Dispatch<SetStateAction<boolean>>
}

const INITIAL_STATE: ClassListContextType = {
  currentPage: {
    data: [],
    items: 0,
    pages: 1,
    first: 1,
    last: 1,
    next: null,
    prev: null,
  },
  numberPage: 1,
  idToDelete: "",
  create: false,
  setNumberPage: () => undefined,
  setCurrentPage: () => undefined,
  setIdToDelete: () => undefined,
  setCreate: () => undefined,
}

const ClassListContext = createContext<ClassListContextType>(INITIAL_STATE)
const Provider = ClassListContext.Provider

const ClassListProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PaginatedApiResponse<GymClass>>(INITIAL_STATE.currentPage)
  const [numberPage, setNumberPage] = useState<number>(INITIAL_STATE.numberPage)
  const [idToDelete, setIdToDelete] = useState<string>(INITIAL_STATE.idToDelete)
  const [create, setCreate] = useState<boolean>(false)

  return (
    <Provider
      value={{
        currentPage,
        numberPage,
        idToDelete,
        create,
        setCurrentPage,
        setNumberPage,
        setIdToDelete,
        setCreate,
      }}
    >
      {children}
    </Provider>
  )
}

export type { ClassListContextType }
export { ClassListProvider, ClassListContext };