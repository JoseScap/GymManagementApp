import { createContext, Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { PaymentMethod } from "../../common/types/subscription";

type SubscriptionPageContextType = {
    id: string;
    fullName: string;
    dni: string;
    dateFrom: string;
    dateTo: string;
    amount: number;
    open: boolean;
    paymentMethod: PaymentMethod;
    isCanceled: boolean;
    lastAmount: number;
    setId: Dispatch<SetStateAction<string>>;
    setFullName: Dispatch<SetStateAction<string>>;
    setDni: Dispatch<SetStateAction<string>>;
    setDateFrom: Dispatch<SetStateAction<string>>;
    setDateTo: Dispatch<SetStateAction<string>>;
    setAmount: Dispatch<SetStateAction<number>>;
    setPaymentMethod: Dispatch<SetStateAction<PaymentMethod>>;
    setIsCanceled: Dispatch<SetStateAction<boolean>>;
    setLastAmount: Dispatch<SetStateAction<number>>;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const INITIAL_STATE: SubscriptionPageContextType = {
    id: '',
    fullName: '',
    dni: '',
    dateFrom: '',
    dateTo: '',
    amount: 0,
    paymentMethod: "Efectivo",
    isCanceled: false,
    lastAmount: 0,
    open: false,
    setId: () => undefined,
    setFullName: () => undefined,
    setDni: () => undefined,
    setDateFrom: () => undefined,
    setDateTo: () => undefined,
    setAmount: () => undefined,
    setPaymentMethod: () => undefined,
    setIsCanceled: () => undefined,
    setLastAmount: () => undefined,
    setOpen: () => undefined,
}

const SubscriptionPageContext = createContext<SubscriptionPageContextType>(INITIAL_STATE)
const Provider = SubscriptionPageContext.Provider

const SubscriptionPageProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const [id, setId] = useState<string>(INITIAL_STATE.id)
    const [fullName, setFullName] = useState<string>(INITIAL_STATE.fullName)
    const [dni, setDni] = useState<string>(INITIAL_STATE.dni)
    const [dateFrom, setDateFrom] = useState<string>(INITIAL_STATE.dateFrom)
    const [dateTo, setDateTo] = useState<string>(INITIAL_STATE.dateTo)
    const [amount, setAmount] = useState<number>(INITIAL_STATE.amount)
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(INITIAL_STATE.paymentMethod)
    const [isCanceled, setIsCanceled] = useState<boolean>(INITIAL_STATE.isCanceled)
    const [lastAmount, setLastAmount] = useState<number>(INITIAL_STATE.lastAmount)
    const [open, setOpen] = useState<boolean>(INITIAL_STATE.open)

    return (
        <Provider
            value={{
                id,
                fullName,
                dni,
                dateFrom,
                dateTo,
                amount,
                paymentMethod,
                isCanceled,
                lastAmount,
                open,
                setId,
                setFullName,
                setDni,
                setDateFrom,
                setDateTo,
                setAmount,
                setPaymentMethod,
                setIsCanceled,
                setLastAmount,
                setOpen,
            }}
        >
            {children}
        </Provider>
    )
}

export type { SubscriptionPageContextType }
export { SubscriptionPageProvider, SubscriptionPageContext };