import type { User } from "app/graphql";

export interface Profile {
  id: User["id"];
  email: User["email"];
  name?: User["name"];
  image?: User["image"];
  createdAt: User["createdAt"];
}

export type AuthStatus = "undetermined" | "authenticated" | "anonymous";

export interface AuthInfo {
  status: AuthStatus;
  profile: Profile | null;
  isUndetermined: boolean;
  isAuthenticated: boolean;
  isAnonymous: boolean;
  isSigningOut: boolean;
  signOut(): Promise<void>;
}
