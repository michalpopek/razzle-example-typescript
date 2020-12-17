import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";

interface ErrorPageProps extends RouteComponentProps {}

export function NotFoundPage(props: ErrorPageProps) {
  const { staticContext } = props;
  if (typeof window === "undefined" && staticContext) {
    staticContext.statusCode = 404;
  }
  return (
    <div className="w-screen h-screen">
      <main className="container mx-auto mt-8">
        <h1 className="text-xl text-red-700 mb-4">
          The requested page has not been found
        </h1>
        <Link to="/" className="text-blue-500">
          Go to home
        </Link>
      </main>
    </div>
  );
}
