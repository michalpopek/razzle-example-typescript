import "twin.macro";
import { positionRight } from "@reach/popover";
import { ChevronDown, UserCircle } from "@styled-icons/heroicons-solid";
import React from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  MenuPopover,
} from "app/components/reach/menu-button";
import { useAuth } from "app/hooks/use-auth";

interface Props {
  className?: string;
}

export function AppHeader(props: Props) {
  const { className } = props;
  const { profile, isSigningOut, signOut } = useAuth();
  return (
    <header tw="flex justify-between items-center" className={className}>
      <Link to="/" tw="font-serif text-2xl italic">
        My app
      </Link>
      {profile ? (
        <Menu>
          <MenuButton tw="flex items-center py-2 px-4">
            {profile.image ? (
              <img
                tw="w-10 h-10 object-cover rounded-full ring-1 ring-gray-200"
                src={profile.image}
                alt={profile.name || profile.email}
              />
            ) : (
              <div tw="w-10 h-10 flex justify-center items-center rounded-full bg-gray-300">
                <UserCircle tw="w-6 h-6" />
              </div>
            )}
            <ChevronDown tw="ml-2 w-4 h-4" />
          </MenuButton>
          <MenuPopover position={positionRight}>
            <MenuItems as="section" tw="w-64 max-w-sm">
              <header tw="px-4 py-2 text-xs font-semibold tracking-wide uppercase">
                {profile.name || profile.email}
              </header>
              <MenuItem disabled={isSigningOut} onSelect={signOut}>
                Sign out
              </MenuItem>
            </MenuItems>
          </MenuPopover>
        </Menu>
      ) : null}
    </header>
  );
}
