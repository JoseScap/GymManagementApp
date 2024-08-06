import { SetStateAction, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { PaymentMethod } from "../../common/types/subscription";

// Interface that should be return by the hook
interface SubscriptionHooks {
  subscription: {
    fullName: string;
    dni: string;
    dateFrom: string;
    dateTo: string;
    amount: number;
    paymentMethod: PaymentMethod;
  };
  lastAmount: number;
  getMemberBySubscriptionId: (id: string | undefined) => Promise<any>;
  changeAmount: (amount: SetStateAction<number>) => void;
  resetValues: () => void;
}

export const useSubscriptionHooks = (): SubscriptionHooks => {
  const [subscriptionId, setSubscriptionId] = useState<string | undefined>("");
  const [fullName, setFullName] = useState<string>("");
  const [dni, setDni] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Efectivo");
  const [lastAmount, setLastAmount] = useState<number>(0);

  const changeFullName = (fullName: SetStateAction<string>) => {
    setFullName(fullName);
  };

  const changeDni = (dni: SetStateAction<string>) => {
    setDni(dni);
  };

  const changeStartDate = (startDate: SetStateAction<string>) => {
    setDateFrom(startDate);
  };

  const changeEndDate = (endDate: SetStateAction<string>) => {
    setDateTo(endDate);
  };

  const changeAmount = (amount: SetStateAction<number>) => {
    setAmount(amount);
  };

  const resetValues = () => {
    setAmount(lastAmount);
  };

  const getMemberBySubscriptionId = async (id: string | undefined) => {
    if (!id) {
      return;
    }
    setSubscriptionId(id);
    const response = await axios.get(
      `http://localhost:3000/subscriptions/${id}?_embed=member`
    );

    const startDate = dayjs(response.data.dateFrom).format("DD/MM/YYYY")
    const endDate = dayjs(response.data.dateTo).format("DD/MM/YYYY")

    console.log(response.data);
    console.log(startDate, endDate)

    changeFullName(response.data.member.fullName);
    changeDni(response.data.member.dni);
    changeStartDate(dayjs(response.data.dateFrom).format("DD/MM/YYYY"));
    changeEndDate(dayjs(response.data.dateTo).format("DD/MM/YYYY"));
    setLastAmount(response.data.amount);
    changeAmount(response.data.amount);
    setPaymentMethod(response.data.paymentMethod);
  };

  return {
    subscription: {
      fullName,
      dni,
      dateFrom,
      dateTo,
      amount,
      paymentMethod,
    },
    getMemberBySubscriptionId,
    changeAmount,
    resetValues,
    lastAmount,
  };
};
