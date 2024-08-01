import { SetStateAction, useState } from "react";
import axios from "axios";

// Interface that should be return by the hook
interface MemberHooks {
  member: {
    fullName: string;
    dni: string;
    phoneNumber: string;
  };
  resetValues: () => void;
  changeFullName: (fullName: SetStateAction<string>) => void;
  changeDni: (dni: SetStateAction<string>) => void;
  changePhoneNumber: (phoneNumber: SetStateAction<string>) => void;
  getMemberById: (id: number) => Promise<any>;
  editMember: () => Promise<any>;
}

export const useMember = (): MemberHooks => {
  const [memberId, setMemberId] = useState<number>(0);
  const [fullNameLast, setFullNameLast] = useState<string>("");
  const [dniLast, setDniLast] = useState<string>("");
  const [phoneNumberLast, setPhoneNumberLast] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [dni, setDni] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const changeFullName = (fullName: SetStateAction<string>) => {
    setFullName(fullName);
  };

  const changeDni = (dni: SetStateAction<string>) => {
    setDni(dni);
  };

  const changePhoneNumber = (phoneNumber: SetStateAction<string>) => {
    setPhoneNumber(phoneNumber);
  };

  const resetValues = () => {
    setFullName(fullNameLast);
    setDni(dniLast);
    setPhoneNumber(phoneNumberLast);
  };

  const fullLastMember = (
    fullname: string,
    dni: string,
    phoneNumber: string
  ) => {
    setFullNameLast(fullname);
    setDniLast(dni);
    setPhoneNumberLast(phoneNumber);
  };

  const fullMember = (fullname: string, dni: string, phoneNumber: string) => {
    setFullName(fullname);
    setDni(dni);
    setPhoneNumber(phoneNumber);
  };

  const getMemberById = async (id: number) => {
    if (!id) {
      return;
    }

    setMemberId(id);
    const response = await axios.get(`http://localhost:3000/members/${id}`);
    fullLastMember(
      response.data.fullName,
      response.data.dni,
      response.data.phoneNumber
    );
    fullMember(
      response.data.fullName,
      response.data.dni,
      response.data.phoneNumber
    );
  };

  const editMember = async () => {
    await axios.patch(`http://localhost:3000/members/${memberId}`, {
      fullName: fullName,
      dni: dni,
      phoneNumber: phoneNumber,
    });
  };

  return {
    member: {
      fullName: fullName,
      dni: dni,
      phoneNumber: phoneNumber,
    },
    resetValues,
    getMemberById,
    changeFullName,
    changeDni,
    changePhoneNumber,
    editMember,
  };
};
