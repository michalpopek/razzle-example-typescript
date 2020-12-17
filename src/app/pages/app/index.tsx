import React from "react";
import { GlobalStyles } from "twin.macro";
import { ErrorBoundary } from "app/components/error-boundary";
import { AuthProvider } from "app/providers/auth";
import { AppContent } from "./content";
import { AppLayout } from "./layout";
import { AppGlobalStyles } from "./styles";

export function App() {
  return (
    <>
      <GlobalStyles />
      <AppGlobalStyles />
      <ErrorBoundary isRoot={true}>
        <AuthProvider>
          <AppLayout>
            <AppContent />
          </AppLayout>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}
