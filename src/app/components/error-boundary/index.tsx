import { ExclamationCircle } from "@styled-icons/heroicons-solid";
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
      return "Sorry, it looks like something went wrong.";
    }

    return "";
  }

  render() {
    if (this.isError) {
      return (
        <div
          css={[
            tw`p-4`,
            this.props.isRoot ? tw`container mx-auto` : tw`w-full h-full`,
          ]}
        >
          <div
            css={[
              tw`flex flex-col space-y-4 items-center bg-red-100 rounded border border-red-200 px-4 py-8 text-red-500 text-center`,
              this.props.isRoot && tw`max-w-md mt-16 mx-auto`,
            ]}
          >
            <h2 tw="font-serif text-xl px-8 pb-4 border-b border-red-400">
              Oops...
            </h2>
            <ExclamationCircle tw="w-24 h-24" />
            <p>{this.errorMessage}</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
