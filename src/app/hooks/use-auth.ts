import React from "react";
import { AuthContext } from "app/providers/auth";

export function useAuth() {
  return React.useContext(AuthContext);
}
