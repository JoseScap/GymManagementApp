// import { MemberListContext } from "../contexts/MemberListContext.tsx";
// import { SetStateAction, useContext } from "react";
// import { Member } from "../../common/types/members";
// import axios, { AxiosResponse } from "axios";
// import { PaginatedApiResponse } from "../../common/types/api";

import { useContext } from "react";
import { MemberCreateContext } from "../contexts/CreateMemberContext";

// Interface that should be return by the hook
interface CreateMemberHooks {
  changeFullName: (fullName: string) => void;
  changeDni: (dni: string) => void;
  changePhoneNumber: (phoneNumber: string) => void;
  handleCreateMember: () => void /* Está será una petición de AXIOS */;
}

export const useCreateMember = (): CreateMemberHooks => {
  const { fullName, dni, phoneNumber, setFullName, setDni, setPhoneNumber } =
    useContext(MemberCreateContext);

  const handleCreateMember = () => {
    console.log("Test: ", fullName, dni, phoneNumber);
    // await axios.post('http://localhost:3000/members', {
    // fullName: fullName,
    // dni: dni,
    // phoneNumber: phoneNumber
    // })
  };

  const changeFullName = (fullNameByUser: string) => {
    setFullName(fullNameByUser);
  };

  const changeDni = (dniByUser: string) => {
    setDni(dniByUser);
  };

  const changePhoneNumber = (phoneNumberByUser: string) => {
    setPhoneNumber(phoneNumberByUser);
  };

  return {
    handleCreateMember,
    changeFullName,
    changeDni,
    changePhoneNumber,
  };
};
