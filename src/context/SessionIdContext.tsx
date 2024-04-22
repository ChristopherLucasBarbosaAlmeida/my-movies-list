import { ReactNode, createContext, useState } from "react";

type SessionIdContextProps = {
  sessionId: string;
  storeSessionId: (sessionId: string) => void;
  deleteSessionId: () => void;
};

type SessionIdContextProviderProps = {
  children: ReactNode;
};

export const SessionIdContext = createContext<SessionIdContextProps>({} as SessionIdContextProps);

const storedSessionId = localStorage.getItem("sessionId") ?? "";

export function SessionIdContextProvider({ children }: SessionIdContextProviderProps) {
  const [sessionId, setSessionId] = useState(storedSessionId);

  function storeSessionId(sessionId: string) {
    localStorage.setItem("sessionId", sessionId);
    setSessionId(sessionId);
  }

  function deleteSessionId() {
    localStorage.removeItem("sessionId");
  }

  return (
    <SessionIdContext.Provider value={{ sessionId, storeSessionId, deleteSessionId }}>
      {children}
    </SessionIdContext.Provider>
  );
}
