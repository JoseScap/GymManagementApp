import { SetStateAction, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { SingleApiResponse } from "../../common/types/api";
import { Member } from "../../common/types/members";
import { Subscription } from "../../common/types/subscription";

// Interface that should be return by the hook
interface MemberHooks {
  member: {
    fullName: string;
    dni: string;
    phoneNumber: string;
  };
  subscriptions: Subscription[]
  resetValues: () => void;
  changeFullName: (fullName: SetStateAction<string>) => void;
  changeDni: (dni: SetStateAction<string>) => void;
  changePhoneNumber: (phoneNumber: SetStateAction<string>) => void;
  getMemberById: (id: string) => Promise<any>;
  editMember: () => Promise<any>;
}

export const useMember = (): MemberHooks => {
  const [memberId, setMemberId] = useState<string>("");
  const [fullNameLast, setFullNameLast] = useState<string>("");
  const [dniLast, setDniLast] = useState<string>("");
  const [phoneNumberLast, setPhoneNumberLast] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [dni, setDni] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

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

  const setFullLastMember = (
    fullname: string,
    dni: string,
    phoneNumber: string
  ) => {
    setFullNameLast(fullname);
    setDniLast(dni);
    setPhoneNumberLast(phoneNumber);
  };

  const setFullMember = (fullname: string, dni: string, phoneNumber: string) => {
    setFullName(fullname);
    setDni(dni);
    setPhoneNumber(phoneNumber);
  };

  const getMemberById = async (id: string) => {
    if (!id) {
      return;
    }

    setMemberId(id);
    const response: AxiosResponse<SingleApiResponse<Member>> = await axios.get(`http://localhost:3000/members/find-one/${id}?embedSubscriptions=true`);
    setFullLastMember(
      response.data.data.fullName,
      response.data.data.dni,
      response.data.data.phoneNumber
    );
    setFullMember(
      response.data.data.fullName,
      response.data.data.dni,
      response.data.data.phoneNumber
    );
    setSubscriptions(response.data.data.subscriptions ?? [])
  };

  const editMember = async () => {
    await axios.patch(`http://localhost:3000/members/update/${memberId}`, {
      fullName: fullName,
      dni: dni,
      phoneNumber: phoneNumber === '' ? undefined : phoneNumber,
    });
  };

  return {
    member: {
      fullName: fullName,
      dni: dni,
      phoneNumber: phoneNumber,
    },
    subscriptions,
    resetValues,
    getMemberById,
    changeFullName,
    changeDni,
    changePhoneNumber,
    editMember,
  };
};
