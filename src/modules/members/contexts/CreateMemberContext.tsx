import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";

type MemberCreateContextType = {
    fullName: string,
    dni: string,
    phoneNumber: string,
    setFullName: Dispatch<SetStateAction<string>>,
    setDni: Dispatch<SetStateAction<string>>,
    setPhoneNumber: Dispatch<SetStateAction<string>>,
}

const INITIAL_STATE: MemberCreateContextType = {
    fullName: '',
    dni: '',
    phoneNumber: '',
    setFullName: () => undefined,
    setDni: () => undefined,
    setPhoneNumber: () => undefined,
}

const MemberCreateContext = createContext<MemberCreateContextType>(INITIAL_STATE)
const Provider = MemberCreateContext.Provider

const CreateMemberProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [fullName, setFullName] = useState<string>(INITIAL_STATE.fullName)
    const [dni, setDni] = useState<string>(INITIAL_STATE.dni)
    const [phoneNumber, setPhoneNumber] = useState<string>(INITIAL_STATE.phoneNumber)

    return (
        <Provider
            value={{
                fullName,
                dni,
                phoneNumber,
                setFullName,
                setDni,
                setPhoneNumber,
            }}
        >
            {children}
        </Provider>
    )
}

export type { MemberCreateContextType }
export { CreateMemberProvider, MemberCreateContext };