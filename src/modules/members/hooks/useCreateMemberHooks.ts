import { SetStateAction, useContext } from "react";
import { MemberCreateContext } from "../contexts/CreateMemberContext";
import axios from "axios";
// import axios, { AxiosResponse } from "axios";

// Interface that should be return by the hook
interface CreateMemberHooks {
  member: {
    fullName: string;
    dni: string;
    status: string;
    phoneNumber: string;
  },
  changeFullName: (fullName: SetStateAction<string>) => void;
  changeDni: (dni: SetStateAction<string>) => void;
  changePhoneNumber: (phoneNumber: SetStateAction<string>) => void;
  createMember: () => Promise<void>
}

export const useCreateMember = (): CreateMemberHooks => {
  const { fullName, dni, phoneNumber, setFullName, setDni, setPhoneNumber } =
    useContext(MemberCreateContext);

  const changeFullName = (fullName: SetStateAction<string>) => {
    setFullName(fullName);
  };

  const changeDni = (dniByUser: SetStateAction<string>) => {
    setDni(dniByUser);
  };

  const changePhoneNumber = (phoneNumber: SetStateAction<string>) => {
    setPhoneNumber(phoneNumber);
  };

  const createMember = async () => {
    if (!fullName && !dni) {
      return;
    }

    await axios.post("http://localhost:3000/members", {
      fullName,
      dni,
      status: "Inactivo",
      phoneNumber,
    })
  };

  return {
    member: {
      fullName,
      dni,
      status: "Inactivo",
      phoneNumber,
    },
    createMember,
    changeFullName,
    changeDni,
    changePhoneNumber,
  };
};
