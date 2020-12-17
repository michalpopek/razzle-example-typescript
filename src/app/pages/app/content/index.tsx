import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth } from "app/hooks/use-auth";
import { NotFoundPage } from "app/pages/error";
import { HomePage } from "app/pages/home";
import { LoginPage } from "app/pages/login";

export function AppContent() {
  const { isUndetermined, isAuthenticated, isAnonymous } = useAuth();

  if (isUndetermined) {
    return <p>Loading...</p>;
  } else if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" component={HomePage} />
        <Route default component={NotFoundPage} />
      </Switch>
    );
  } else if (isAnonymous) {
    return (
      <Switch>
        <Route default component={LoginPage} />
      </Switch>
    );
  }

  throw new Error("Unrecognized content state.");
}
