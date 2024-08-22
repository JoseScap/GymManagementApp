// src/context/SocketContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSocket } from '../socket/SocketContext';
import { Member } from '../modules/common/types/members';

interface WatchmanContextType {
    identifiedMember: Member | null
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

  useEffect(() => {
    if (socket) {
        console.log("Escuchar App:Identify")
        socket.on("App:Identify", (data: Member) => {
            setMember(data)
        })
    }
  }, [socket])

  return (
    <WatchmanContext.Provider value={{ identifiedMember: member }}>
      {children}
    </WatchmanContext.Provider>
  );
};
