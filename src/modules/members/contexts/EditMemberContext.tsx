import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";

type MemberEditContextType = {
    memberId: number,
    memberLast: {
        fullNameLast: string,
        dniLast: string,
        phoneNumberLast: string,
        setFullNameLast: Dispatch<SetStateAction<string>>,
        setDniLast: Dispatch<SetStateAction<string>>,
        setPhoneNumberLast: Dispatch<SetStateAction<string>>,
    },
    member: {
        fullName: string,
        dni: string,
        phoneNumber: string,
        setFullName: Dispatch<SetStateAction<string>>,
        setDni: Dispatch<SetStateAction<string>>,
        setPhoneNumber: Dispatch<SetStateAction<string>>,
    },
    setMemberId: Dispatch<SetStateAction<number>>,
}

const INITIAL_STATE: MemberEditContextType = {
    memberId: 0,
    memberLast: {
        fullNameLast: '',
        dniLast: '',
        phoneNumberLast: '',
        setFullNameLast: () => undefined,
        setDniLast: () => undefined,
        setPhoneNumberLast: () => undefined,
    },
    member: {
        fullName: '',
        dni: '',
        phoneNumber: '',
        setFullName: () => undefined,
        setDni: () => undefined,
        setPhoneNumber: () => undefined,
    },
    setMemberId: () => undefined,
}

const MemberEditContext = createContext<MemberEditContextType>(INITIAL_STATE)
const Provider = MemberEditContext.Provider

const EditMemberProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [memberId, setMemberId] = useState<number>(INITIAL_STATE.memberId)
    const [fullNameLast, setFullNameLast] = useState<string>(INITIAL_STATE.memberLast.fullNameLast)
    const [dniLast, setDniLast] = useState<string>(INITIAL_STATE.memberLast.dniLast)
    const [phoneNumberLast, setPhoneNumberLast] = useState<string>(INITIAL_STATE.memberLast.phoneNumberLast)

    const [fullName, setFullName] = useState<string>(INITIAL_STATE.member.fullName)
    const [dni, setDni] = useState<string>(INITIAL_STATE.member.dni)
    const [phoneNumber, setPhoneNumber] = useState<string>(INITIAL_STATE.member.phoneNumber)

    return (
        <Provider
            value={{
                memberId,
                memberLast:{
                    fullNameLast,
                    dniLast,
                    phoneNumberLast,
                    setFullNameLast,
                    setDniLast,
                    setPhoneNumberLast,
                },
                member: {
                    fullName,
                    dni,
                    phoneNumber,
                    setFullName,
                    setDni,
                    setPhoneNumber,
                },
                setMemberId
            }}
        >
            {children}
        </Provider>
    )
}

export type { MemberEditContextType }
export { EditMemberProvider, MemberEditContext };