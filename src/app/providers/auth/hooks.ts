import { useApolloClient } from "@apollo/client";
import React from "react";
import { useGetProfileQuery, useSignOutMutation } from "app/graphql";
import type { AuthStatus, Profile } from "./types";

export function useProfile(): [AuthStatus, Profile | null] {
  const { loading, data } = useGetProfileQuery({ fetchPolicy: "network-only" });
  const profile = data?.profile || null;
  const status = loading
    ? "undetermined"
    : profile
    ? "authenticated"
    : "anonymous";
  return [status, profile];
}

export function useSignout(status: AuthStatus): [boolean, () => Promise<void>] {
  const apollo = useApolloClient();
  const [performSignout] = useSignOutMutation();
  const [isSigningOut, setSigningOut] = React.useState(false);

  const signOut = React.useCallback(async () => {
    if (status !== "authenticated") {
      throw new Error("Cannot sign out unless authenticated");
    }

    if (isSigningOut) {
      return;
    }

    setSigningOut(true);

    try {
      const result = await performSignout();

      if (!result) {
        throw new Error(`Sign out didn't complete successfully`);
      }

      await apollo.resetStore();
    } finally {
      setSigningOut(false);
    }
  }, [apollo, performSignout, isSigningOut, status]);

  return [isSigningOut, signOut];
}
