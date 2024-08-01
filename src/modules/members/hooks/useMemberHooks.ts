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
  const member = {
    fullName,
    dni,
    phoneNumber,
    setFullName,
    setDni,
    setPhoneNumber,
  };

  const memberLast = {
    fullNameLast,
    dniLast,
    phoneNumberLast,
    setFullNameLast,
    setDniLast,
    setPhoneNumberLast,
  };

  const changeFullName = (fullName: SetStateAction<string>) => {
    member.setFullName(fullName);
  };

  const changeDni = (dniByUser: SetStateAction<string>) => {
    member.setDni(dniByUser);
  };

  const changePhoneNumber = (phoneNumber: SetStateAction<string>) => {
    member.setPhoneNumber(phoneNumber);
  };

  const resetValues = () => {
    member.setFullName(memberLast.fullNameLast);
    member.setDni(memberLast.dniLast);
    member.setPhoneNumber(memberLast.phoneNumberLast);
  };

  const fullLastMember = (
    fullname: string,
    dni: string,
    phoneNumber: string
  ) => {
    memberLast.setFullNameLast(fullname);
    memberLast.setDniLast(dni);
    memberLast.setPhoneNumberLast(phoneNumber);
  };

  const fullMember = (fullname: string, dni: string, phoneNumber: string) => {
    member.setFullName(fullname);
    member.setDni(dni);
    member.setPhoneNumber(phoneNumber);
  }

  const getMemberById = async (id: number) => {
    if (!id) {
      console.log("No se puede obtener el socio");
      return;
    }

    setMemberId(id);

    try {
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
      )
    } catch (error) {
      console.log("Error al obtener el socio");
    }
  };

  const editMember = async () => {
    try {
      await axios.patch(`http://localhost:3000/members/${memberId}`, {
        fullName: member.fullName,
        dni: member.dni,
        phoneNumber: member.phoneNumber,

      });
    } catch (error) {
      console.log("Error al editar el socio");
    }
  }

  return {
    member,
    resetValues,
    getMemberById,
    changeFullName,
    changeDni,
    changePhoneNumber,
    editMember,
  };
};
