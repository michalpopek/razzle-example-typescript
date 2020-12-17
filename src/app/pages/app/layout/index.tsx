import React from "react";
import { AppHeader } from "../header";
import "twin.macro";

interface Props {
  children?: React.ReactNode;
}

export function AppLayout(props: Props) {
  const { children } = props;
  return (
    <div tw="container mx-auto flex flex-col min-h-screen p-4">
      <AppHeader tw="mb-2 flex-initial" />
      <hr tw="flex-initial my-2 border-gray-400" />
      <main tw="flex-1 flex flex-col">{children}</main>
    </div>
  );
}
