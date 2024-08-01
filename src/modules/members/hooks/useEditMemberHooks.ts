import { SetStateAction, useContext } from "react";
import axios from "axios";
import { MemberEditContext } from "../contexts/EditMemberContext";

// Interface that should be return by the hook
interface EditMemberHooks {
  member: {
    fullName: string;
    dni: string;
    phoneNumber: string;
  };
  memberLast: {
    fullNameLast: string;
    dniLast: string;
    phoneNumberLast: string;
  };
  updateMemberId: (id: number) => void;
  getMemberBeforeEdit: () => void;
  changeFullName: (fullName: SetStateAction<string>) => void;
  changeDni: (dni: SetStateAction<string>) => void;
  changePhoneNumber: (phoneNumber: SetStateAction<string>) => void;
  getMemberById: (id: number) => Promise<any>;
}

export const useEditMember = (): EditMemberHooks => {
  const { memberId, setMemberId, memberLast, member } =
    useContext(MemberEditContext);

  const changeFullName = (fullName: SetStateAction<string>) => {
    member.setFullName(fullName);
  };

  const changeDni = (dniByUser: SetStateAction<string>) => {
    member.setDni(dniByUser);
  };

  const changePhoneNumber = (phoneNumber: SetStateAction<string>) => {
    member.setPhoneNumber(phoneNumber);
  };

  const updateMemberId = (id: number) => {
    setMemberId(id);
  };

  const getMemberBeforeEdit = () => {
    console.log("memberLast", memberLast);
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

  const getMemberById = async (id: number) => {
    if (!id) {
      console.log("No se puede obtener el socio");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:3000/members/${id}`);
      fullLastMember(
        response.data.fullName,
        response.data.dni,
        response.data.phoneNumber
      );
      member.setFullName(response.data.fullName);
      member.setDni(response.data.dni);
      member.setPhoneNumber(response.data.phoneNumber);
    } catch (error) {
      console.log("Error al obtener el socio");
    }
  };

  return {
    member,
    memberLast,
    updateMemberId,
    getMemberBeforeEdit,
    getMemberById,
    changeFullName,
    changeDni,
    changePhoneNumber,
  };
};
