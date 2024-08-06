import { Dispatch, SetStateAction, useContext } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { PaymentMethod } from "../../common/types/subscription";
import { SubscriptionPageContext } from "../contexts/SubscriptionPageContext";

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
  };
  lastAmount: number;
  open: boolean;
  getMemberBySubscriptionId: (id: string | undefined) => Promise<void>;
  resetValues: () => void;
  deleteSubscriptionById: () => Promise<void>;
  changeSubscriptionAmount: (newAmount: number) => void;
  alternateModal: () => void;
}

export const useSubscriptionHooks = (): SubscriptionHooks => {
  const {
    id, fullName, dni, dateFrom, dateTo, amount, paymentMethod, lastAmount,
    setId, setFullName, setDni, setDateFrom, setDateTo, setAmount, setPaymentMethod, setLastAmount,
    open, setOpen
  } = useContext(SubscriptionPageContext);

  const alternateModal = () => {
    setOpen(!open);
  }

  const resetValues = () => {
    setAmount(lastAmount);
  }

  const changeSubscriptionAmount = (newAmount: number) => {
    setAmount(newAmount);
  }

  const getMemberBySubscriptionId = async (id: string | undefined) => {
    if (!id) {
      return;
    }

    setId(id);
    const response = await axios.get(
      `http://localhost:3000/subscriptions/${id}?_embed=member`
    );

    setFullName(response.data.member.fullName);
    setDni(response.data.member.dni);
    setDateFrom(dayjs(response.data.dateFrom).format("DD/MM/YYYY"));
    setDateTo(dayjs(response.data.dateTo).format("DD/MM/YYYY"));
    setAmount(response.data.amount);
    setPaymentMethod(response.data.paymentMethod);
    setLastAmount(response.data.amount);
    
  };

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
    },
    lastAmount,
    open,
    alternateModal,
    changeSubscriptionAmount,
    resetValues,
    getMemberBySubscriptionId,
    deleteSubscriptionById
  };
};
