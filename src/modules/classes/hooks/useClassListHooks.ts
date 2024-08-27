import { ClassListContext } from "../contexts/ClassContext.tsx";
import { SetStateAction, useContext } from "react";
import axios, { AxiosResponse } from "axios";
import { PaginatedApiResponse } from "../../common/types/api";
import { GymClass } from "../../common/types/gymClass";

// Interface that should be return by the hook
interface ClassListHooks {
  currentPage: PaginatedApiResponse<GymClass>,
  numberPage: number,
  changeNumberPage: (numberPage: SetStateAction<number>) => void,
  findAllClass: () => void
}

export const useClassListHooks = (): ClassListHooks => {
  const { currentPage, numberPage, setNumberPage, setCurrentPage } = useContext(ClassListContext)

  const findAllClass = async () => {
    const response: AxiosResponse<PaginatedApiResponse<GymClass>> = await axios.get(`http://localhost:3000/classes/find-paginated?page=${numberPage}`)
    setCurrentPage(response.data)
  }

  const changeNumberPage = async (numberPage: SetStateAction<number>) => {
    setNumberPage(numberPage)
  }

  return {
    currentPage,
    numberPage,
    changeNumberPage,
    findAllClass
  }
}

