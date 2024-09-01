import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { GymClass } from "../../common/types/gymClass";

type ClassListContextType = {
  classes: GymClass[]
  currentPage: number
  hasMore: boolean
  idToDelete: string
  idToUpdate: string
  create: boolean
  setClasses: Dispatch<SetStateAction<GymClass[]>>
  setCurrentPage: Dispatch<SetStateAction<number>>
  setHasMore: Dispatch<SetStateAction<boolean>>
  setIdToDelete: Dispatch<SetStateAction<string>>
  setCreate: Dispatch<SetStateAction<boolean>>
  setIdToUpdate: Dispatch<SetStateAction<string>>
}

const INITIAL_STATE: ClassListContextType = {
  classes: [],
  currentPage: 0,
  hasMore: true,
  idToDelete: "",
  create: false,
  idToUpdate: "",
  setClasses: () => undefined,
  setCurrentPage: () => undefined,
  setHasMore: () => undefined,
  setIdToDelete: () => undefined,
  setCreate: () => undefined,
  setIdToUpdate: () => undefined,
}

const ClassListContext = createContext<ClassListContextType>(INITIAL_STATE)
const Provider = ClassListContext.Provider

const ClassListProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [classes, setClasses] = useState<GymClass[]>(INITIAL_STATE.classes)
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_STATE.currentPage)
  const [hasMore, setHasMore] = useState<boolean>(INITIAL_STATE.hasMore)
  const [idToDelete, setIdToDelete] = useState<string>(INITIAL_STATE.idToDelete)
  const [idToUpdate, setIdToUpdate] = useState<string>(INITIAL_STATE.idToUpdate)
  const [create, setCreate] = useState<boolean>(false)

  return (
    <Provider
      value={{
        classes,
        currentPage,
        hasMore,
        idToDelete,
        create,
        idToUpdate,
        setClasses,
        setCurrentPage,
        setHasMore,
        setIdToDelete,
        setCreate,
        setIdToUpdate,
      }}
    >
      {children}
    </Provider>
  )
}

export type { ClassListContextType }
export { ClassListProvider, ClassListContext };