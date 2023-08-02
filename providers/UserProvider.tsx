"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

interface UserproviderProps {
  children: React.ReactNode;
}

const UserProvider = ({ children }: UserproviderProps) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
