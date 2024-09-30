import { useContext } from "react";
import axios, { AxiosResponse } from "axios";
import dayjs from "dayjs";
import { PaymentMethod, Subscription } from "../../common/types/subscription";
import { SubscriptionPageContext } from "../contexts/SubscriptionPageContext";
import { SingleApiResponse } from "../../common/types/api";

// Interface that should be return by the hook
interface SubscriptionHooks {
  subscription: {
    id: string;
    fullName: string;
    dni: string;
    dateFrom: string;
    dateTo: string;
    amount: number;
    paymentMethod: PaymentMethod;
    isCanceled: boolean
  };
  lastAmount: number;
  open: boolean;
  getMemberBySubscriptionId: (id: string) => Promise<void>;
  resetValues: () => void;
  deleteSubscriptionById: () => Promise<void>;
  changeSubscriptionAmount: (amount: number) => void;
  alternateModal: () => void;
  updateSubscriptionById: (id: string, amount: number, paymentMethod: PaymentMethod, dateFrom?: string, dateTo?: string) => Promise<void>
}

export const useSubscriptionHooks = (): SubscriptionHooks => {
  const {
    id, 
    fullName, 
    dni, 
    dateFrom, 
    dateTo, 
    amount, 
    paymentMethod, 
    isCanceled, 
    lastAmount,
    setId, 
    setFullName, 
    setDni, 
    setDateFrom, 
    setDateTo, 
    setAmount, 
    setPaymentMethod, 
    setIsCanceled, 
    setLastAmount,
    open, 
    setOpen
  } = useContext(SubscriptionPageContext);

  const alternateModal = () => {
    setOpen(!open);
  }

  const resetValues = () => {
    setAmount(lastAmount);
  }

  const changeSubscriptionAmount = (amount: number) => {
    setAmount(amount);
  }

  const getMemberBySubscriptionId = async (id: string) => {
    if (!id) {
      return;
    }

    setId(id);
    const response: AxiosResponse<SingleApiResponse<Subscription>> = await axios.get(
      `http://localhost:3000/subscriptions/${id}?embedMember=true`
    );

    if (response.data.data.member) {
      setFullName(response.data.data.member.fullName);
      setDni(response.data.data.member.dni);
      setDateFrom(dayjs(response.data.data.dateFrom).format("DD/MM/YYYY"));
      setDateTo(dayjs(response.data.data.dateTo).format("DD/MM/YYYY"));
      setAmount(response.data.data.amount);
      setPaymentMethod(response.data.data.paymentMethod);
      setIsCanceled(response.data.data.isCanceled);
      setLastAmount(response.data.data.amount);
    }
    
  };

  const updateSubscriptionById = async (id: string, amount: number, paymentMethod: PaymentMethod, dateFrom?: string, dateTo?: string) => {
    if (!id) {
      return;
    }

    await axios.patch(`http://localhost:3000/subscriptions/update/${id}`,
      {
        paymentMethod,
        amount,
        dateFrom,
        dateTo
      }
    );
  }


  const deleteSubscriptionById = async () => {
    if (!id) {
      return;
    }

    await axios.patch(`http://localhost:3000/subscriptions/${id}`,
      {
        isCanceled: true,
      }
    ); 
  }

  return {
    subscription: {
      id,
      fullName,
      dni,
      dateFrom,
      dateTo,
      amount,
      paymentMethod,
      isCanceled,
    },
    lastAmount,
    open,
    alternateModal,
    changeSubscriptionAmount,
    resetValues,
    getMemberBySubscriptionId,
    deleteSubscriptionById,
    updateSubscriptionById,
  };
};
