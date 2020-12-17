import { createGlobalStyle } from "styled-components";
import { theme } from "twin.macro";

export const AppGlobalStyles = createGlobalStyle`
  body {
    background-color: ${theme`colors.gray.50`};
  }
`;
