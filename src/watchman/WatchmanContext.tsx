// src/context/SocketContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSocket } from '../socket/SocketContext';
import { Member } from '../modules/common/types/members';
import dayjs from 'dayjs';

interface WatchmanContextType {
    identifiedMember: Member | null
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
  const { socket } = useSocket()
  const [member, setMember] = useState<Member | null>(null)
  const daysDifference = useMemo<number | null>(() => {
    if (member === null) return null
    if (member.subscriptions === undefined) return null
    if (member.subscriptions.length === 0) return null

    const target = dayjs(member.subscriptions[0].dateTo)
    const today = dayjs()

    return target.diff(today, 'day') + 1
  }, [member])

  useEffect(() => {
    if (socket) {
        console.log("Escuchar App:Identify")
        socket.on("App:Identify", (data: Member) => {
            setMember(data)
        })
    }
  }, [socket])

  return (
    <WatchmanContext.Provider value={{ identifiedMember: member, daysDifference }}>
      {children}
    </WatchmanContext.Provider>
  );
};