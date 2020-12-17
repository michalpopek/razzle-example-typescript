import React from "react";
import tw from "twin.macro";

interface Props {
  isRoot?: boolean;
  children?: React.ReactNode;
}

interface State {
  error: Error | string | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  static getStateDerivedFromError(error: Error) {
    return { error };
  }

  state: State = {
    error: null,
  };

  get isError(): boolean {
    return !!this.state.error;
  }

  get errorMessage(): string {
    if (this.isError) {
      const { error } = this.state;
      if (typeof error === "string") {
        return error;
      } else if (error?.message) {
        return error.message;
      }
      return "Oops, something went wrong.";
    }

    return "";
  }

  render() {
    if (this.isError) {
      return (
        <div tw="w-full h-full flex justify-center">
          <p tw="mt-16 text-red-500 text-center bg-red-100 rounded-md border-solid border-2 border-opacity-25 border-red-700 p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              tw="w-12 h-12 mx-auto mb-4"
              css={[this.props.isRoot && tw`w-24 h-24`]}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{this.errorMessage}</span>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
