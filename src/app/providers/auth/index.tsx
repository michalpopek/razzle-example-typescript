import React from "react";
import { useProfile, useSignout } from "./hooks";
import type { AuthInfo } from "./types";

export const AuthContext = React.createContext<AuthInfo>({
  status: "undetermined",
  profile: null,
  isUndetermined: true,
  isAuthenticated: false,
  isAnonymous: false,
  isSigningOut: false,
  signOut: async () => {},
});

interface Props {
  children?: React.ReactNode;
}

export function AuthProvider(props: Props) {
  const { children } = props;
  const [status, profile] = useProfile();
  const [isSigningOut, signOut] = useSignout(status);

  const auth: AuthInfo = {
    isUndetermined: status === "undetermined",
    isAuthenticated: status === "authenticated",
    isAnonymous: status === "anonymous",
    isSigningOut,
    status,
    profile,
    signOut,
  };

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
