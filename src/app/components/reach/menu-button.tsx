import {
  MenuButton as ReachMenuButton,
  MenuItems as ReachMenuItems,
  MenuItem as ReachMenuItem,
} from "@reach/menu-button";
import tw, { styled } from "twin.macro";

import "@reach/menu-button/styles.css";

export const MenuButton = styled(ReachMenuButton)`
  &[data-reach-menu-button] {
    ${tw`rounded transition-colors focus:ring-1`}

    &:hover, &[aria-expanded="true"] {
      ${tw`bg-gray-200 text-gray-700`}
    }

    &[aria-expanded="true"] {
      ${tw`opacity-80`}
    }
  }
`;

export const MenuItems = styled(ReachMenuItems)`
  ${tw`bg-white border border-gray-200 rounded-md p-0 mt-1 py-2 shadow-md`}
`;

export const MenuItem = styled(ReachMenuItem)`
  &[data-reach-menu-item] {
    ${tw`px-4 py-2 truncate`}

    &[data-selected] {
      ${tw`bg-blue-600 text-white`}
    }
  }
`;

export { Menu, MenuPopover } from "@reach/menu-button";
