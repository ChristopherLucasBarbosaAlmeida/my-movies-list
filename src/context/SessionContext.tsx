import { ReactNode, createContext, useState } from "react";

type SessionContextProps = {
  session: string | null;
  handleLogin: (data: string) => void;
  handleLogout: () => void;
};

type SessionContextProviderProps = {
  children: ReactNode;
};

export const SessionContext = createContext<SessionContextProps>({} as SessionContextProps);

const storageSession = localStorage.getItem("session");

export function SessionContextProvider(props: SessionContextProviderProps) {
  const { children } = props;

  const [session, setSession] = useState<string | null>(storageSession);

  function handleLogin(data: string) {
    localStorage.setItem("session", data);
    setSession(data);
  }

  function handleLogout() {
    localStorage.clear();
    setSession(null);
  }

  return (
    <SessionContext.Provider value={{ session, handleLogin, handleLogout }}>
      {children}
    </SessionContext.Provider>
  );
}
