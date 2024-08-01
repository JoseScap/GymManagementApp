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
  getMemberBeforeEdit: () => void;
  changeFullName: (fullName: SetStateAction<string>) => void;
  changeDni: (dni: SetStateAction<string>) => void;
  changePhoneNumber: (phoneNumber: SetStateAction<string>) => void;
  getMemberById: (id: number) => Promise<any>;
  editMember: () => Promise<any>;
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

  const getMemberBeforeEdit = () => {
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
    memberLast,
    getMemberBeforeEdit,
    getMemberById,
    changeFullName,
    changeDni,
    changePhoneNumber,
    editMember,
  };
};
