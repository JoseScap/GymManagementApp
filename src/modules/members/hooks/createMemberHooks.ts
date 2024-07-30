import { SetStateAction, useContext } from "react";
import { MemberCreateContext } from "../contexts/CreateMemberContext";
import axios from "axios";
// import axios, { AxiosResponse } from "axios";

// Interface that should be return by the hook
interface CreateMemberHooks {
  changeFullName: (fullName: SetStateAction<string>) => void;
  changeDni: (dni: SetStateAction<string>) => void;
  changePhoneNumber: (phoneNumber: SetStateAction<string>) => void;
  handleCreateMember: () => Promise<void> /* Está será una petición de AXIOS */;
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

  const handleCreateMember = async () => {
    console.log("Test: ", fullName, dni, phoneNumber);
    console.log("Test: ", fullName, dni);
    if(!fullName && !dni) {
      console.log("No se puede crear el socio");
      return;
    }

    await axios.post("http://localhost:3000/members", {
            fullName,
            dni,
            phoneNumber,
    }).finally(() => {
        changeFullName("");
        changeDni("");
        changePhoneNumber("");
    })

  };

  return {
    handleCreateMember,
    changeFullName,
    changeDni,
    changePhoneNumber,
  };
};
