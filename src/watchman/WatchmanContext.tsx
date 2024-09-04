// src/context/SocketContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSocket } from '../socket/SocketContext';
import { Member } from '../modules/common/types/members';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

interface WatchmanContextType {
    identifiedMember: Member | null
    unknownMember: boolean
    daysDifference: number | null
}

const WatchmanContext = createContext<WatchmanContextType | undefined>(undefined);

export const useWatchman = () => {
  const context = useContext(WatchmanContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

export const WatchmanProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { socket } = useSocket();
  const [member, setMember] = useState<Member | null>(null);
  const [unknownMember, setUnknownMember] = useState<boolean>(false);

  const daysDifference = useMemo<number | null>(() => {
    if (member === null) return null
    if (member.subscriptions === undefined) return null
    if (member.subscriptions.length === 0) return null

    const target = dayjs(member.subscriptions[0].dateTo)
    const today = dayjs()

    const days = target.diff(today, 'day') + 1

    return days
  }, [member])

  useEffect(() => {
    if (socket) {
      console.log("Escuchar");
    
      // Verificar si ya existe un listener
      const listeners = socket.listeners("App:Identify");
      if (listeners.length === 0) {
        socket.on("App:Identify", (data: Member) => {
          setMember(data);
          if (data === null) {
            setUnknownMember(true)
            toast.error(`No se identifico el miembro`, { autoClose: 10000 });
            return null;
          }
          if (data.subscriptions === undefined) return null;
          if (data.subscriptions.length === 0) return null;
    
          setUnknownMember(false)
          
          const target = dayjs(data.subscriptions[0].dateTo);
          const today = dayjs();
    
          const days = target.diff(today, 'day') + 1;
          if (days <= 0 && data?.fullName) {
            toast.error(`${data?.fullName} no se encuentra activo`, { autoClose: 10000 });
          }
        });
      }
    }
  }, [socket])

  useEffect(() => {
    if (member !== null) {
      const timeoutId = setTimeout(() => {
        setMember(null);
      }, 30000);

      // Cleanup timeout if the component unmounts or if member changes
      return () => clearTimeout(timeoutId);
    }
  }, [member]);

  useEffect(() => {
    if (unknownMember) {
      const timeoutId = setTimeout(() => {
        setUnknownMember(false);
      }, 30000);

      // Cleanup timeout if the component unmounts or if member changes
      return () => clearTimeout(timeoutId);
    }
  }, [unknownMember]);

  return (
    <WatchmanContext.Provider value={{ identifiedMember: member, daysDifference, unknownMember }}>
      {children}
    </WatchmanContext.Provider>
  );
};

