import { SetStateAction, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { SingleApiResponse } from "../../common/types/api";
import { Member } from "../../common/types/members";
import { Subscription } from "../../common/types/subscription";
import { useSocket } from "../../../socket/SocketContext";
import { CreateNewMember } from "../../common/types/responses";
import { toast } from "react-toastify";

// Interface that should be return by the hook
interface MemberHooks {
  member: {
    fullName: string;
    dni: string;
    phoneNumber: string;
    fingerprintId: number;
  };
  subscriptions: Subscription[]
  captureStep: number
  fingerTemplate: string | null
  resetValues: () => void;
  changeCaptureStep: (captureStep: number) => void;
  createNewFingerprint: (memberId: string, fingerTemplate: string, id: number) => void
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
  const [fingerprintId, setFingerprintId] = useState<number>(0);
  const [captureStep, setCaptureStep] = useState<number>(0)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [fingerTemplate, setFingerTemplate] = useState<string | null>(null)
  const { socket } = useSocket()

  const changeCaptureStep = (captureStep: number) => {
    setCaptureStep(captureStep)
    if (socket) socket.emit('App:ChangeAction', { number: captureStep });
  }

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
    phoneNumber: string,
    fingerprintId: number
  ) => {
    setFullNameLast(fullname);
    setDniLast(dni);
    setPhoneNumberLast(phoneNumber);
    setFingerprintId(fingerprintId)
  };

  const setFullMember = (fullname: string, dni: string, phoneNumber: string, fingerprintId: number) => {
    setFullName(fullname);
    setDni(dni);
    setPhoneNumber(phoneNumber);
    setFingerprintId(fingerprintId);
  };

  const getMemberById = async (id: string) => {
    if (!id) {
      return;
    }

    const response: AxiosResponse<SingleApiResponse<Member>> = await axios.get(`http://localhost:3000/members/find-one/${id}?embedSubscriptions=true`);
    setMemberId(response.data.data.id);
    setFullLastMember(
      response.data.data.fullName,
      response.data.data.dni,
      response.data.data.phoneNumber,
      response.data.data.fingerprint?.id ?? 0
    );
    setFullMember(
      response.data.data.fullName,
      response.data.data.dni,
      response.data.data.phoneNumber,
      response.data.data.fingerprint?.id ?? 0
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

  const createNewFingerprint = async (memberId: string, fingerTemplate: string, id: number) => {
    if (id > 0) {
      try {
        const result: AxiosResponse<SingleApiResponse<CreateNewMember>> = await axios.patch(`http://localhost:3000/fingerprints/${fingerprintId}`, {
          fingerTemplate
        })
        await getMemberById(memberId)
        toast.success("Se actualizo la huella, la misma sera valida en 24 horas")
      } catch (error) {
      }
    } else {
      try {
        const result: AxiosResponse<SingleApiResponse<CreateNewMember>> = await axios.post('http://localhost:3000/fingerprints', {
          fingerTemplate,
          memberId
        })
        await getMemberById(memberId)
        if (socket && fingerTemplate != null && fingerTemplate.length > 0) socket.emit("App:AddFingerTemplate", result.data.data)
        toast.success("Nueva huella registrada")
      } catch (error) {
      }
    }
  }

  useEffect(() => {
    if (socket) socket.on('App:Capture', (data: { Number: number, FingerImage: ArrayBuffer, FingerMergedTemplate64: string }) => {
      if (data.Number < 3) changeCaptureStep(data.Number + 1)
      else if (data.Number === 3 && data.FingerMergedTemplate64?.length > 0) setFingerTemplate(data.FingerMergedTemplate64)
    })

    return () => {
      if (socket) socket.emit('App:ChangeAction', { number: 0 });
    }
  }, [])

  return {
    member: {
      fullName: fullName,
      dni: dni,
      phoneNumber: phoneNumber,
      fingerprintId
    },
    captureStep,
    subscriptions,
    fingerTemplate,
    resetValues,
    changeCaptureStep,
    createNewFingerprint,
    getMemberById,
    changeFullName,
    changeDni,
    changePhoneNumber,
    editMember,
  };
};
