import { Github } from "@styled-icons/fa-brands";
import React from "react";
import tw from "twin.macro";

const LoginButton = tw.a`inline-flex justify-between items-center space-x-2 bg-gray-700 text-center text-white py-2 px-4 rounded hover:opacity-50 transition-opacity my-2`;

export function LoginPage() {
  return (
    <section tw="flex flex-col items-center space-y-4 rounded px-4 py-8 mt-12 bg-gray-50 border border-gray-200 w-full max-w-md mx-auto">
      <header>
        <h2 tw="font-serif text-center text-xl px-8 pb-4 mb-2 border-b border-gray-400">
          Welcome
        </h2>
      </header>
      <p>Use one of the following services to log in.</p>
      <div tw="flex space-y-2">
        <LoginButton href="/api/auth/github">
          <span>Github</span>
          <Github tw="w-4 h-4" />
        </LoginButton>
      </div>
    </section>
  );
}
